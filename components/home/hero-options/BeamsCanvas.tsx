"use client";

import { useEffect, useRef } from "react";

// The moving beams behind option H, a small WebGL2 shader (no library). It is built the way the
// Raycast home page builds its hero, which was read off that page:
//   1. a "plasma": three cosine waves (one across, one diagonal, one in rings) added together and
//      mapped through a three-colour ramp, here dark navy, brand blue and pale blue. It flows slowly.
//   2. glass slats: the screen is cut into steep diagonal strips of uneven width. Each strip acts as
//      a lens, so it shows the plasma bent sideways, with the red, green and blue read at slightly
//      different offsets (chromatic aberration). Between the strips the black page shows through.
//   3. each strip is dark at its top-left end and brightens toward its bottom-right end, its edges
//      are eaten by grain, and the whole picture fades out toward the screen edges.
//   4. for the first ~2.6s the strips grow in, the front of the light running from the top left to
//      the bottom right, then they keep drifting slowly.
// It draws only while on screen, and once as a still picture for reduced motion. If WebGL2 is not
// there the page stays plain black and the words are still all in the HTML.

const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uIntro;
out vec4 outColor;

float hash11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float hash21(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

// the plasma: a cross wave, a diagonal wave and rings, averaged, 0..1
float plasma(vec2 xy, float t) {
  float h = cos(3.0 * xy.x + t);
  float d = cos(xy.x * cos(t) + 5.0 * xy.y * sin(t) + t);
  float x = 0.3 * xy.x - 0.5 + cos(t);
  float y = 0.3 * xy.y - 0.5 + sin(t * 0.5);
  float r = sin(20.0 * sqrt(x * x + y * y + 1.0) + t);
  return (h + d + r) / 3.0 * 0.5 + 0.5;
}

// dark navy -> brand blue -> pale blue
vec3 ramp(float nv) {
  nv = smoothstep(0.10, 0.90, nv);
  vec3 c1 = vec3(0.62, 0.84, 1.00);
  vec3 c2 = vec3(0.00, 0.38, 1.00);
  vec3 c3 = vec3(0.01, 0.06, 0.28);
  vec3 c = nv < 0.55 ? mix(c3, c2, nv / 0.55) : mix(c2, c1, smoothstep(0.55, 1.0, nv) * 0.8);
  return pow(c, vec3(1.25));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;

  // the strips run steeply from the top left down to the bottom right
  float a = radians(52.0);
  vec2 along = vec2(cos(a), -sin(a));
  vec2 across = vec2(sin(a), cos(a));
  float u = dot(p, across);
  float v = dot(p, along);

  float t = uTime * 0.10 + 10.0;

  // strips of uneven width, drifting slowly sideways
  float k = u * 4.3 + 0.35 * sin(u * 2.3 + 1.1) + 0.2 * sin(u * 7.1) + uTime * 0.014;
  float id = floor(k);
  float s = fract(k) * 2.0 - 1.0;
  float hv = hash11(id);
  float grain = hash21(gl_FragCoord.xy + fract(uTime) * 91.0);

  // the intro: each strip grows in, the front running along the strips
  float stagger = clamp(hash11(id + 3.7) * 0.45 + (u * 0.25 + 0.5) * 0.35, 0.0, 1.0);
  float grow = smoothstep(0.0, 0.55, uIntro * 1.35 - stagger);
  float front = mix(-1.3, 1.5, uIntro);
  float reveal = grow * smoothstep(0.0, 0.5, front - v);

  // how wide the strip is, and its grainy edge
  float w = mix(0.50, 0.98, hv) * (0.25 + 0.75 * grow);
  float e = abs(s) / w + (grain - 0.5) * 0.22;
  float body = 1.0 - smoothstep(0.76, 1.0, e);

  // the strip is a lens: read the plasma bent sideways, each colour a little differently
  float lens = s * 0.26 * (0.6 + hv);
  vec2 inv = vec2(1.0 / asp, 1.0);
  float ca = 0.03;
  float nR = plasma(uv + across * lens * (1.0 + ca) * inv, t);
  float nG = plasma(uv + across * lens * inv, t);
  float nB = plasma(uv + across * lens * (1.0 - ca) * inv, t);
  vec3 col = vec3(ramp(nR).r, ramp(nG).g, ramp(nB).b);

  // dark at the top-left end of the strip, bright at the bottom-right end
  float lenFall = smoothstep(-0.50, 0.55, v + 0.22 * sin(u * 1.7 + uTime * 0.15));
  float shade = 0.55 + 0.45 * (1.0 - abs(s));
  float rim = smoothstep(0.55, 0.9, abs(s)) * (1.0 - smoothstep(0.9, 1.0, abs(s)));
  col += rim * 0.22 * vec3(0.45, 0.70, 1.0);

  vec3 rgb = col * 1.3 * body * lenFall * shade * reveal;

  // fade out toward the edges of the screen
  vec2 q = uv - 0.5;
  rgb *= 1.0 - smoothstep(0.18, 0.82, length(q * vec2(1.0, 1.2)));

  rgb += (grain - 0.5) * 0.03 * (body * 0.8 + 0.2) * reveal;
  outColor = vec4(max(rgb, 0.0), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function BeamsCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl || gl.isContextLost()) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uIntro = gl.getUniformLocation(prog, "uIntro");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    // the intro clock starts at the first frame drawn on screen, not when the page loads
    let start = -1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
    };

    const draw = (now: number) => {
      if (start < 0) start = now;
      const elapsed = reduce ? 99 : (now - start) / 1000;
      const x = Math.min(elapsed / 2.6, 1);
      const intro = 1 - Math.pow(1 - x, 3);
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduce ? 12 : elapsed + 12);
      gl.uniform1f(uIntro, intro);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };

    const kick = () => {
      if (reduce) {
        draw(performance.now());
        return;
      }
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      kick();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => draw(performance.now()));
    ro.observe(canvas);
    document.addEventListener("visibilitychange", kick);
    kick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", kick);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
