"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function SnowGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [hintHidden, setHintHidden] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;

    if (!canvas || !stage) {
      return;
    }

    const canvasElement = canvas;
    const stageElement = stage;
    let animationFrame = 0;
    let disposed = false;
    let paused = document.hidden;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvasElement,
        preserveDrawingBuffer: true,
      });
      renderer.setClearColor(0x000000, 0);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0.4, 6.2);

      const world = new THREE.Group();
      scene.add(world);

      const globeRadius = 2.25;
      const ground = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius * 1.05, 40, 40),
        new THREE.MeshLambertMaterial({ color: 0xffffff }),
      );
      ground.position.y = -globeRadius * 1.62;
      world.add(ground);

      function createTree(x: number, z: number, scale: number) {
        const tree = new THREE.Group();
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06 * scale, 0.08 * scale, 0.32 * scale, 8),
          new THREE.MeshLambertMaterial({ color: 0x6b4423 }),
        );
        trunk.position.y = 0.16 * scale;
        tree.add(trunk);

        const branches: Array<[number, number]> = [
          [0.55, 0.5],
          [0.45, 0.86],
          [0.32, 1.18],
        ];

        branches.forEach(([radius, y]) => {
          const cone = new THREE.Mesh(
            new THREE.ConeGeometry(radius * scale, 0.55 * scale, 9),
            new THREE.MeshLambertMaterial({ color: 0x1f8a4c }),
          );
          cone.position.y = y * scale;
          tree.add(cone);
        });

        const star = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.1 * scale),
          new THREE.MeshBasicMaterial({ color: 0xffd35a }),
        );
        star.position.y = 1.5 * scale;
        tree.add(star);

        tree.position.set(x, -0.95, z);
        return tree;
      }

      function createGift(x: number, z: number, color: number, size: number) {
        const gift = new THREE.Group();
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(size, size, size),
          new THREE.MeshLambertMaterial({ color }),
        );
        gift.add(box);

        const ribbon = new THREE.MeshLambertMaterial({ color: 0xffe08a });
        const vertical = new THREE.Mesh(
          new THREE.BoxGeometry(size * 0.18, size * 1.02, size * 1.02),
          ribbon,
        );
        const horizontal = new THREE.Mesh(
          new THREE.BoxGeometry(size * 1.02, size * 1.02, size * 0.18),
          ribbon,
        );
        gift.add(vertical);
        gift.add(horizontal);

        gift.position.set(x, -0.95 + size / 2, z);
        gift.rotation.y = Math.random();
        return gift;
      }

      world.add(createTree(0, 0, 1.05));
      world.add(createTree(-1.05, -0.35, 0.62));
      world.add(createTree(0.95, -0.55, 0.5));
      world.add(createGift(0.7, 0.55, 0xd12b3a, 0.45));
      world.add(createGift(-0.62, 0.6, 0x2a6fdb, 0.34));
      world.add(createGift(0.05, 0.85, 0x1f8a4c, 0.28));

      const snowCount = 280;
      const snowPositions = new Float32Array(snowCount * 3);
      const snowSpeeds: number[] = [];

      for (let i = 0; i < snowCount; i += 1) {
        const radius = Math.random() * globeRadius * 0.92;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        snowPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        snowPositions[i * 3 + 1] = Math.random() * globeRadius * 1.8 - globeRadius * 0.9;
        snowPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
        snowSpeeds.push(0.004 + Math.random() * 0.01);
      }

      const snowGeometry = new THREE.BufferGeometry();
      snowGeometry.setAttribute("position", new THREE.BufferAttribute(snowPositions, 3));

      const snow = new THREE.Points(
        snowGeometry,
        new THREE.PointsMaterial({
          color: 0xffffff,
          depthWrite: false,
          opacity: 0.95,
          size: 0.075,
          transparent: true,
        }),
      );
      world.add(snow);

      const glass = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius, 48, 48),
        new THREE.MeshPhongMaterial({
          color: 0xbcdcff,
          depthWrite: false,
          opacity: 0.12,
          shininess: 90,
          transparent: true,
        }),
      );
      scene.add(glass);

      scene.add(new THREE.AmbientLight(0xfff4e0, 0.85));
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
      directionalLight.position.set(3, 5, 4);
      scene.add(directionalLight);

      const warmLight = new THREE.PointLight(0xffcaa0, 0.8, 12);
      warmLight.position.set(0, 0.5, 2);
      scene.add(warmLight);

      let dragging = false;
      let lastX = 0;
      let velocity = 0.004;
      let rotation = 0;
      let swirl = 0;
      let hinted = false;

      function onPointerDown(event: PointerEvent) {
        dragging = true;
        lastX = event.clientX;
        swirl = 0.06;
        stageElement.setPointerCapture(event.pointerId);

        if (!hinted) {
          hinted = true;
          setHintHidden(true);
        }
      }

      function onPointerMove(event: PointerEvent) {
        if (!dragging) {
          return;
        }

        const deltaX = event.clientX - lastX;
        lastX = event.clientX;
        velocity = deltaX * 0.01;
        rotation += velocity;
        swirl = 0.08;
      }

      function onPointerUp(event: PointerEvent) {
        dragging = false;

        if (stageElement.hasPointerCapture(event.pointerId)) {
          stageElement.releasePointerCapture(event.pointerId);
        }
      }

      function onVisibilityChange() {
        paused = document.hidden;
      }

      function resize() {
        const width = canvasElement.clientWidth || 360;
        renderer?.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer?.setSize(width, width, false);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }

      stageElement.addEventListener("pointerdown", onPointerDown);
      stageElement.addEventListener("pointermove", onPointerMove);
      stageElement.addEventListener("pointercancel", onPointerUp);
      stageElement.addEventListener("pointerup", onPointerUp);
      document.addEventListener("visibilitychange", onVisibilityChange);
      window.addEventListener("resize", resize);
      resize();

      function loop() {
        animationFrame = window.requestAnimationFrame(loop);

        if (paused || disposed) {
          return;
        }

        if (!dragging) {
          velocity += (0.004 - velocity) * 0.04;
          rotation += velocity;
        }

        swirl += (0 - swirl) * 0.05;
        world.rotation.y = rotation;

        const positions = snowGeometry.attributes.position.array;

        for (let i = 0; i < snowCount; i += 1) {
          positions[i * 3 + 1] -= snowSpeeds[i] + swirl * 0.3;
          positions[i * 3] += Math.sin((rotation + i) * 0.5) * swirl * 0.4;

          if (positions[i * 3 + 1] < -globeRadius * 0.9) {
            positions[i * 3 + 1] = globeRadius * 0.9;
          }
        }

        snowGeometry.attributes.position.needsUpdate = true;
        renderer?.render(scene, camera);
      }

      loop();

      return () => {
        disposed = true;
        window.cancelAnimationFrame(animationFrame);
        stageElement.removeEventListener("pointerdown", onPointerDown);
        stageElement.removeEventListener("pointermove", onPointerMove);
        stageElement.removeEventListener("pointercancel", onPointerUp);
        stageElement.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        window.removeEventListener("resize", resize);

        disposeSceneObject(scene);
        renderer?.dispose();
      };
    } catch {
      document.body.classList.add("no3d");
      renderer?.dispose();
    }
  }, []);

  return (
    <div className="hero-globe reveal in">
      <div
        className="globe-stage"
        ref={stageRef}
        role="img"
        aria-label="Interactive snow globe with a Christmas tree and gifts"
      >
        <canvas id="globe3d" ref={canvasRef} aria-hidden="true" />
        <div className="globe-glass" aria-hidden="true" />
        <div className="globe-fallback" aria-hidden="true">
          🎄
        </div>
      </div>
      <div className="globe-base">
        <span className="globe-plate">JADEN&nbsp;·&nbsp;SANTA&nbsp;·&nbsp;HUANG</span>
      </div>
      <p className={`globe-hint ${hintHidden ? "gone" : ""}`}>
        ✦ drag the globe to spin my world ✦
      </p>
    </div>
  );
}

function disposeSceneObject(object: THREE.Object3D) {
  object.traverse((child) => {
    const drawable = child as THREE.Object3D & {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
    };

    drawable.geometry?.dispose();

    if (Array.isArray(drawable.material)) {
      drawable.material.forEach((material) => material.dispose());
    } else {
      drawable.material?.dispose();
    }
  });
}
