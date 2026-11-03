"use client";

import { useEffect, useRef } from "react";

// The hero's background: a soft field of blue and pink light on white, drawn by a small WebGL shader.
// It drifts on its own, and a bright blob follows the pointer a little behind it, so the colour
// seems to gather wherever you point. Under it sits a plain CSS gradient, which is all you see if
// WebGL is missing or motion is reduced.

const VERT = `#version 300 es
in vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uOn;
out vec4 o;

// one soft round light: its position, size and colour
vec3 blob(vec2 p, vec2 c, float r, vec3 col, inout float w) {
  float d = length(p - c);
  float k = exp(-(d * d) / (r * r));
  w += k;
  return col * k;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = uTime * 0.12;

  // a slow warp, so the edges of the lights ripple instead of staying perfectly round
  p += 0.035 * vec2(sin(p.y * 4.0 + t * 5.0), cos(p.x * 3.5 - t * 4.0));

  vec3 blue = vec3(0.30, 0.58, 1.00);
  vec3 sky = vec3(0.62, 0.84, 1.00);
  vec3 pink = vec3(1.00, 0.55, 0.82);
  vec3 lilac = vec3(0.78, 0.70, 1.00);

  float w = 0.0;
  vec3 c = vec3(0.0);
  c += blob(p, vec2(0.10 * asp + 0.10 * sin(t * 2.1), 0.80 + 0.08 * cos(t * 1.7)), 0.40, blue, w);
  c += blob(p, vec2(0.92 * asp + 0.10 * cos(t * 1.9), 0.76 + 0.10 * sin(t * 2.3)), 0.27, pink * 0.85, w);
  c += blob(p, vec2(0.52 * asp + 0.16 * sin(t * 1.3), 0.30 + 0.08 * cos(t * 2.0)), 0.40, sky, w);
  c += blob(p, vec2(0.34 * asp + 0.12 * cos(t * 1.1), 0.58 + 0.10 * sin(t * 1.6)), 0.26, lilac, w);
  c += blob(p, vec2(0.80 * asp + 0.10 * sin(t * 1.4), 0.34 + 0.08 * cos(t * 1.8)), 0.30, blue, w);

  // the light that follows the pointer: blue at its heart, pink at its edge
  vec2 m = vec2(uMouse.x * asp, uMouse.y);
  float dm = length(p - m);
  float core = exp(-(dm * dm) / 0.045) * uOn;
  float halo = exp(-(dm * dm) / 0.16) * uOn;
  vec3 follow = mix(pink, blue, smoothstep(0.0, 0.7, core));
  c += follow * (core * 1.25 + halo * 0.5);
  w += core * 1.25 + halo * 0.5;

  vec3 tint = c / max(w, 0.0001);
  // strongest at the top, thinning to white towards the bottom edge
  float fade = smoothstep(0.0, 0.85, uv.y);
  float amount = clamp(w, 0.0, 1.0) * mix(0.38, 0.8, fade);
  vec3 col = mix(vec3(1.0), tint, amount);
  o = vec4(col, 1.0);
}`;

export default function HeroGradient({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uOn = gl.getUniformLocation(prog, "uOn");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // the glow is soft, so half resolution is plenty and keeps it cheap
    const scale = 0.5;
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, on: 0, ton: 0 };
    let raf = 0;
    let visible = true;
    const start = performance.now();

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(r.width * scale));
      canvas.height = Math.max(2, Math.round(r.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      pointer.ton = inside ? 1 : 0;
      pointer.tx = (e.clientX - r.left) / r.width;
      pointer.ty = 1 - (e.clientY - r.top) / r.height;
    };
    const onLeave = () => {
      pointer.ton = 0;
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      // the light trails the pointer, and fades in and out as it enters and leaves
      pointer.x += (pointer.tx - pointer.x) * 0.07;
      pointer.y += (pointer.ty - pointer.y) * 0.07;
      pointer.on += (pointer.ton - pointer.on) * 0.06;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, pointer.x, pointer.y);
      gl.uniform1f(uOn, pointer.on);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    if (reduce) {
      frame(start);
      cancelAnimationFrame(raf);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      {/* what shows without WebGL */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_55%_at_8%_18%,rgba(77,148,255,0.35),transparent_70%),radial-gradient(ellipse_45%_55%_at_94%_22%,rgba(255,133,204,0.2),transparent_70%),radial-gradient(ellipse_55%_45%_at_50%_95%,rgba(158,214,255,0.4),transparent_70%)]" />
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
