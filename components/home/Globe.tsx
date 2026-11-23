"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";
import { LAND_B64, LAND_H, LAND_W } from "./landMask";

// A restrained globe in the brand blue: a deep blue ocean, the continents drawn as fine light
// dots (from real land outlines), a faint graticule and a thin rim of light. It turns slowly on
// its own and a little further as the page scrolls.

function decodeMask() {
  const bin = atob(LAND_B64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return (lat: number, lon: number) => {
    const col = Math.min(LAND_W - 1, Math.max(0, Math.floor(((lon + 180) / 360) * LAND_W)));
    const row = Math.min(LAND_H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * LAND_H)));
    const n = row * LAND_W + col;
    return (bytes[n >> 3] >> (n & 7)) & 1;
  };
}

const LIGHT = new THREE.Vector3(-0.55, 0.45, 0.7).normalize();

export default function Globe() {
  const reduce = useReducedMotion();
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pixelRatio);

    const scene = new THREE.Scene();
    const FOV = 30;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.set(0, 0, 5.2);

    const tilt = new THREE.Group();
    tilt.rotation.set(0.28, 0, 0.18);
    scene.add(tilt);
    const spinner = new THREE.Group();
    tilt.add(spinner);

    // ocean
    const oceanGeom = new THREE.SphereGeometry(0.995, 96, 96);
    const oceanMat = new THREE.ShaderMaterial({
      uniforms: { uLight: { value: LIGHT } },
      vertexShader: `
        varying vec3 vN;
        void main() {
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vN;
        uniform vec3 uLight;
        void main() {
          vec3 n = normalize(vN);
          float diff = clamp(dot(n, uLight) * 0.5 + 0.5, 0.0, 1.0);
          vec3 deep = vec3(0.012, 0.075, 0.33);
          vec3 lit = vec3(0.0, 0.34, 0.98);
          vec3 col = mix(deep, lit, pow(diff, 1.4));
          float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 3.0);
          col += rim * vec3(0.20, 0.50, 1.0) * 0.55;
          float blush = pow(max(dot(n, normalize(vec3(0.9, -0.25, 0.35))), 0.0), 5.0);
          col += blush * vec3(1.0, 0.18, 0.55) * 0.14;
          gl_FragColor = vec4(col, 1.0);
        }`,
    });
    spinner.add(new THREE.Mesh(oceanGeom, oceanMat));

    // land: a fibonacci lattice over the sphere, keeping only the points that fall on land
    const isLand = decodeMask();
    const N = 26000;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pos: number[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(1 - y * y);
      const phi = i * golden;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(x, z) * 180) / Math.PI;
      if (isLand(lat, lon)) pos.push(x * 1.004, y * 1.004, z * 1.004);
    }
    const dotGeom = new THREE.BufferGeometry();
    dotGeom.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const dotMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uSize: { value: 1 }, uLight: { value: LIGHT } },
      vertexShader: `
        uniform float uSize;
        uniform vec3 uLight;
        varying float vLit;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uSize / -mv.z;
          vec3 n = normalize(mat3(modelMatrix) * position);
          vLit = clamp(dot(n, uLight) * 0.65 + 0.5, 0.25, 1.0);
        }`,
      fragmentShader: `
        varying float vLit;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.34, d);
          vec3 col = mix(vec3(0.42, 0.62, 1.0), vec3(0.94, 0.97, 1.0), vLit);
          gl_FragColor = vec4(col, a);
        }`,
    });
    spinner.add(new THREE.Points(dotGeom, dotMat));

    // graticule: faint latitude and longitude lines
    const grat: number[] = [];
    const ring = (fn: (t: number) => [number, number, number]) => {
      const steps = 96;
      for (let i = 0; i < steps; i++) {
        const a = fn((i / steps) * Math.PI * 2);
        const b = fn(((i + 1) / steps) * Math.PI * 2);
        grat.push(...a, ...b);
      }
    };
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = (lat * Math.PI) / 180;
      ring((t) => [Math.cos(phi) * Math.sin(t) * 1.001, Math.sin(phi) * 1.001, Math.cos(phi) * Math.cos(t) * 1.001]);
    }
    for (let lon = 0; lon < 180; lon += 30) {
      const th = (lon * Math.PI) / 180;
      ring((t) => [Math.cos(t) * Math.sin(th) * 1.001, Math.sin(t) * 1.001, Math.cos(t) * Math.cos(th) * 1.001]);
    }
    const gratGeom = new THREE.BufferGeometry();
    gratGeom.setAttribute("position", new THREE.Float32BufferAttribute(grat, 3));
    const gratMat = new THREE.LineBasicMaterial({ color: 0xbcd3ff, transparent: true, opacity: 0.1, depthWrite: false });
    spinner.add(new THREE.LineSegments(gratGeom, gratMat));

    // atmosphere: a thin glow around the limb
    const atmoGeom = new THREE.SphereGeometry(1.07, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: `
        varying vec3 vN;
        void main() {
          vN = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vN;
        void main() {
          float g = pow(max(0.72 - dot(vN, vec3(0.0, 0.0, 1.0)), 0.0), 3.4);
          vec3 blue = vec3(0.12, 0.45, 1.0);
          vec3 pink = vec3(1.0, 0.22, 0.60);
          float side = pow(clamp(vN.x * 0.5 + 0.5, 0.0, 1.0), 3.0) * 0.45;
          gl_FragColor = vec4(mix(blue, pink, side), clamp(g * 0.75, 0.0, 0.6));
        }`,
    });
    scene.add(new THREE.Mesh(atmoGeom, atmoMat));

    // size: the host decides, the canvas follows it
    const resize = () => {
      const w = Math.max(host.clientWidth, 1);
      const h = Math.max(host.clientHeight, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // in a column narrower than it is tall, pull back so the globe is never clipped
      camera.position.z = 5.2 * Math.max(1, 0.82 / camera.aspect);
      camera.updateProjectionMatrix();
      // point size in pixels for a given world size, so dots stay proportionate at any size
      dotMat.uniforms.uSize.value = 0.0155 * ((h * pixelRatio) / (2 * Math.tan((FOV * Math.PI) / 360)));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(host);

    let frame = 0;
    let last = performance.now();
    let idle = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!visible) return;
      if (!reduce) idle += dt * 0.12;
      spinner.rotation.y = idle;
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      oceanGeom.dispose();
      oceanMat.dispose();
      dotGeom.dispose();
      dotMat.dispose();
      gratGeom.dispose();
      gratMat.dispose();
      atmoGeom.dispose();
      atmoMat.dispose();
      renderer.dispose();
    };
  }, [reduce]);

  return (
    <div ref={hostRef} aria-hidden className="pointer-events-none h-full w-full">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
