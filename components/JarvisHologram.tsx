"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function JarvisHologram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isVisible = true;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master hologram group for global rotation and mouse interaction
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // --- Glow Texture Helper for Particles & Nodes ---
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(56, 189, 248, 0.9)");
      gradient.addColorStop(0.55, "rgba(14, 165, 233, 0.45)");
      gradient.addColorStop(0.85, "rgba(2, 132, 199, 0.12)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const glowTexture = createGlowTexture();

    // --- 1. Central Luminous Core & Aperture ---
    const coreGroup = new THREE.Group();
    hologramGroup.add(coreGroup);

    // Central bright core sprite
    if (glowTexture) {
      const coreSpriteMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: new THREE.Color(0x38bdf8),
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.95,
      });
      const coreSprite = new THREE.Sprite(coreSpriteMat);
      coreSprite.scale.set(1.4, 1.4, 1.4);
      coreGroup.add(coreSprite);

      // Inner intense hot white spot
      const innerHotSpotMat = new THREE.SpriteMaterial({
        map: glowTexture,
        color: new THREE.Color(0xffffff),
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.85,
      });
      const innerHotSpot = new THREE.Sprite(innerHotSpotMat);
      innerHotSpot.scale.set(0.65, 0.65, 0.65);
      coreGroup.add(innerHotSpot);
    }

    // Core aperture rings (like the central circular focal eye in Jarvis)
    const coreRingGeom = new THREE.RingGeometry(0.32, 0.36, 48);
    const coreRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const coreRing1 = new THREE.Mesh(coreRingGeom, coreRingMat);
    coreGroup.add(coreRing1);

    const coreRingGeom2 = new THREE.RingGeometry(0.48, 0.51, 64);
    const coreRingMat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const coreRing2 = new THREE.Mesh(coreRingGeom2, coreRingMat2);
    coreRing2.rotation.x = Math.PI * 0.35;
    coreGroup.add(coreRing2);

    // --- 2. Radial Energy Spokes (bursting from core to outer sphere) ---
    const spokeCount = 28;
    const spokePositions: number[] = [];
    const spokeColors: number[] = [];
    const spokeColorStart = new THREE.Color(0xffffff);
    const spokeColorEnd = new THREE.Color(0x0ea5e9);

    for (let i = 0; i < spokeCount; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / spokeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 1.9 + (Math.random() - 0.5) * 0.4;

      const endX = radius * Math.sin(phi) * Math.cos(theta);
      const endY = radius * Math.sin(phi) * Math.sin(theta);
      const endZ = radius * Math.cos(phi);

      // From center aperture (radius ~0.3) to outer node
      const startScale = 0.28;
      spokePositions.push(endX * startScale, endY * startScale, endZ * startScale);
      spokePositions.push(endX, endY, endZ);

      spokeColors.push(spokeColorStart.r, spokeColorStart.g, spokeColorStart.b);
      spokeColors.push(spokeColorEnd.r, spokeColorEnd.g, spokeColorEnd.b);
    }

    const spokeGeom = new THREE.BufferGeometry();
    spokeGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(spokePositions, 3)
    );
    spokeGeom.setAttribute("color", new THREE.Float32BufferAttribute(spokeColors, 3));
    const spokeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const spokeLines = new THREE.LineSegments(spokeGeom, spokeMat);
    hologramGroup.add(spokeLines);

    // --- 3. Neural Synaptic Matrix (Consciousness Node Network) ---
    const nodeCount = 380;
    const nodePositions: THREE.Vector3[] = [];
    const nodeFloatArray = new Float32Array(nodeCount * 3);
    const nodeColorArray = new Float32Array(nodeCount * 3);
    const nodeSizeArray = new Float32Array(nodeCount);

    const baseRadius = 1.95;
    for (let i = 0; i < nodeCount; i++) {
      // Stratified spherical distribution with dense equatorial band like Jarvis
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      // Bias slightly toward equator for that distinct cylindrical/spherical core look
      const phi = Math.acos(2.0 * (v * 0.8 + 0.1) - 1.0);

      // Layered depth shells (inner radius ~1.2, main shell ~1.95, outer aura ~2.4)
      let r = baseRadius;
      const layerRand = Math.random();
      if (layerRand < 0.25) {
        r = 1.1 + Math.random() * 0.4; // Inner core neural cloud
      } else if (layerRand < 0.82) {
        r = 1.75 + Math.random() * 0.45; // Main synaptic shell
      } else {
        r = 2.3 + Math.random() * 0.35; // Outer halo nodes
      }

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      nodeFloatArray[i * 3] = x;
      nodeFloatArray[i * 3 + 1] = y;
      nodeFloatArray[i * 3 + 2] = z;

      // Color variation: electric cyan, brilliant sky blue, soft ice white
      const cRand = Math.random();
      if (cRand > 0.8) {
        // Bright white/cyan spark
        nodeColorArray[i * 3] = 0.92;
        nodeColorArray[i * 3 + 1] = 0.98;
        nodeColorArray[i * 3 + 2] = 1.0;
        nodeSizeArray[i] = 14 + Math.random() * 10;
      } else if (cRand > 0.4) {
        // Bright cyan
        nodeColorArray[i * 3] = 0.0;
        nodeColorArray[i * 3 + 1] = 0.94;
        nodeColorArray[i * 3 + 2] = 1.0;
        nodeSizeArray[i] = 9 + Math.random() * 7;
      } else {
        // Deep electric blue
        nodeColorArray[i * 3] = 0.06;
        nodeColorArray[i * 3 + 1] = 0.65;
        nodeColorArray[i * 3 + 2] = 0.95;
        nodeSizeArray[i] = 6 + Math.random() * 5;
      }
    }

    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(nodeFloatArray, 3)
    );
    nodeGeom.setAttribute("color", new THREE.BufferAttribute(nodeColorArray, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.12,
      map: glowTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodes = new THREE.Points(nodeGeom, nodeMat);
    hologramGroup.add(nodes);

    // --- 4. Interconnecting Synaptic Neural Conduits (Lines) ---
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxDistance = 0.72; // Connect nearby nodes
    let totalLines = 0;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDistance && totalLines < 650) {
          totalLines++;
          linePositions.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z
          );
          linePositions.push(
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );

          // Alpha / intensity based on proximity
          const intensity = Math.pow(1 - dist / maxDistance, 1.4);
          lineColors.push(0.0, 0.75 * intensity + 0.15, 1.0 * intensity);
          lineColors.push(0.0, 0.75 * intensity + 0.15, 1.0 * intensity);
        }
      }
    }

    const linesGeom = new THREE.BufferGeometry();
    linesGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesGeom.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const synapticLines = new THREE.LineSegments(linesGeom, linesMat);
    hologramGroup.add(synapticLines);

    // --- 5. Concentric Orbital Rings & Gimbal Circles (Armillary Matrix) ---
    const ringsGroup = new THREE.Group();
    hologramGroup.add(ringsGroup);

    // Function to create smooth orbital coordinate rings with dashed/dotted patterns
    const createOrbitalRing = (
      radius: number,
      segments: number,
      colorHex: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      opacity: number,
      isDashed = false
    ) => {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            0
          )
        );
      }
      const geom = new THREE.BufferGeometry().setFromPoints(points);

      let lineObj: THREE.Line;
      if (isDashed) {
        const mat = new THREE.LineDashedMaterial({
          color: colorHex,
          dashSize: 0.2,
          gapSize: 0.12,
          transparent: true,
          opacity: opacity,
          blending: THREE.AdditiveBlending,
        });
        lineObj = new THREE.Line(geom, mat);
        lineObj.computeLineDistances();
      } else {
        const mat = new THREE.LineBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: opacity,
          blending: THREE.AdditiveBlending,
        });
        lineObj = new THREE.Line(geom, mat);
      }

      lineObj.rotation.set(rotX, rotY, rotZ);
      return lineObj;
    };

    // Major equatorial tracking ring (prominent in the movie photo)
    const ringEquator = createOrbitalRing(
      2.1,
      128,
      0x00f0ff,
      Math.PI * 0.48,
      0.15,
      0,
      0.75,
      true
    );
    ringsGroup.add(ringEquator);

    // Secondary tilted gimbal ring
    const ringTilted1 = createOrbitalRing(
      2.3,
      128,
      0x38bdf8,
      0.4,
      Math.PI * 0.25,
      0.1,
      0.65,
      false
    );
    ringsGroup.add(ringTilted1);

    // Polar meridian ring
    const ringPolar = createOrbitalRing(
      2.15,
      96,
      0x0284c7,
      0,
      Math.PI * 0.5,
      0.3,
      0.5,
      true
    );
    ringsGroup.add(ringPolar);

    // Outer faint HUD boundary ring
    const ringOuter = createOrbitalRing(
      2.65,
      144,
      0x0ea5e9,
      Math.PI * 0.28,
      0.35,
      Math.PI * 0.12,
      0.35,
      true
    );
    ringsGroup.add(ringOuter);

    // Tick marks on the main equatorial ring (circular HUD graduation)
    const tickCount = 48;
    const tickPositions: number[] = [];
    for (let i = 0; i < tickCount; i++) {
      const angle = (i / tickCount) * Math.PI * 2;
      const r1 = 2.06;
      const r2 = i % 4 === 0 ? 2.18 : 2.12; // major and minor ticks
      tickPositions.push(Math.cos(angle) * r1, Math.sin(angle) * r1, 0);
      tickPositions.push(Math.cos(angle) * r2, Math.sin(angle) * r2, 0);
    }
    const tickGeom = new THREE.BufferGeometry();
    tickGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(tickPositions, 3)
    );
    const tickMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const tickLines = new THREE.LineSegments(tickGeom, tickMat);
    tickLines.rotation.copy(ringEquator.rotation);
    ringsGroup.add(tickLines);

    // --- 6. Ambient Floating Quantum Particles / Holographic Dust ---
    const dustCount = 450;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.5 + Math.random() * 2.6; // Throughout volume

      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = r * Math.cos(phi);
    }

    const dustGeom = new THREE.BufferGeometry();
    dustGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );
    const dustMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x7dd3fc,
      map: glowTexture || undefined,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dustCloud = new THREE.Points(dustGeom, dustMat);
    hologramGroup.add(dustCloud);

    // --- 7. Mouse Parallax & Interaction State ---
    let targetRotX = 0.15;
    let targetRotY = 0;
    let currentRotX = 0.15;
    let currentRotY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const normX = (clientX / rect.width) * 2 - 1;
      const normY = -(clientY / rect.height) * 2 + 1;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.008;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      } else {
        // Subtle ambient parallax tilt
        targetRotY = normX * 0.45;
        targetRotX = -normY * 0.35 + 0.15;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const normX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        targetRotY = normX * 0.5;
        targetRotX = -normY * 0.4 + 0.15;
      }
    };
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    // --- 8. Resize Observer ---
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // --- 9. Visibility Observer (Pause when off-screen) ---
    const intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        isVisible = entry.isIntersecting;
      }
    });
    intersectionObserver.observe(container);

    // --- 10. Main Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse interaction
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Base autonomous rotation: holographic sphere slowly revolves in 3D
      hologramGroup.rotation.y = elapsedTime * 0.22 + currentRotY;
      hologramGroup.rotation.x =
        Math.sin(elapsedTime * 0.15) * 0.1 + currentRotX;

      // Gimbal rings counter-rotate at independent harmonic speeds
      ringEquator.rotation.z = elapsedTime * 0.12;
      tickLines.rotation.z = elapsedTime * 0.12;
      ringTilted1.rotation.y = elapsedTime * -0.18;
      ringPolar.rotation.x = elapsedTime * 0.15;
      ringOuter.rotation.z = elapsedTime * -0.09;

      // Core pulsating aperture glow and breathing scale
      const pulseScale = 1.0 + Math.sin(elapsedTime * 3.2) * 0.08;
      coreGroup.scale.set(pulseScale, pulseScale, pulseScale);
      coreRing1.rotation.z = elapsedTime * 0.6;
      coreRing2.rotation.z = -elapsedTime * 0.4;

      // Subtle breathing in spoke lines
      spokeLines.rotation.y = -elapsedTime * 0.08;

      // Dust cloud slow drift
      dustCloud.rotation.y = elapsedTime * 0.05;
      dustCloud.rotation.z = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", handleMouseUp);

      // Dispose Three.js objects
      glowTexture?.dispose();
      coreRingGeom.dispose();
      coreRingGeom2.dispose();
      spokeGeom.dispose();
      nodeGeom.dispose();
      linesGeom.dispose();
      dustGeom.dispose();
      tickGeom.dispose();

      coreRingMat.dispose();
      coreRingMat2.dispose();
      spokeMat.dispose();
      nodeMat.dispose();
      linesMat.dispose();
      dustMat.dispose();
      tickMat.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[520px] w-full items-center justify-center select-none cursor-grab active:cursor-grabbing sm:h-[580px] lg:h-[640px] xl:h-[680px]"
    >
      {/* Volumetric background radial glow (atmospheric hologram emitter) */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-sky-500/20 blur-[120px] sm:h-[520px] sm:w-[520px]" />
        <div className="absolute h-[280px] w-[280px] rounded-full bg-cyan-400/20 blur-[70px]" />
      </div>

      {/* Holographic Emitter Base Ring / Pedestal Projection Glow */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -z-10 h-16 w-3/4 -translate-x-1/2 rounded-[100%] bg-gradient-to-t from-sky-500/25 via-cyan-400/10 to-transparent blur-md" />
      <div className="pointer-events-none absolute bottom-6 left-1/2 -z-10 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent" />

      {/* Three.js 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="h-full w-full object-contain touch-none"
      />
    </div>
  );
}
