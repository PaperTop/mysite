"use client";

import { useEffect, useRef } from "react";

export default function SnowCanvas() {
  const snowRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = snowRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canvas || reduce) {
      return;
    }

    const currentCanvas = canvas;
    const drawingContext = currentCanvas.getContext("2d");

    if (!drawingContext) {
      return;
    }

    const context = drawingContext;

    let width = 0;
    let height = 0;
    let frame = 0;
    let angle = 0;
    let flakes: Array<{ x: number; y: number; r: number; d: number; s: number; o: number }> = [];

    function resize() {
      width = currentCanvas.width = window.innerWidth;
      height = currentCanvas.height = window.innerHeight;
      const count = Math.min(120, Math.floor(width / 16));
      flakes = Array.from({ length: count }, () => ({
        d: Math.random() + 0.5,
        o: Math.random() * 0.5 + 0.35,
        r: Math.random() * 2.6 + 1,
        s: Math.random() * 0.6 - 0.3,
        x: Math.random() * width,
        y: Math.random() * height,
      }));
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      angle += 0.008;

      for (const flake of flakes) {
        context.globalAlpha = flake.o;
        context.fillStyle = "#fff";
        context.beginPath();
        context.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        context.fill();

        flake.y += flake.d * 0.9;
        flake.x += Math.sin(angle + flake.s * 5) * 0.5 + flake.s;

        if (flake.y > height + 5) {
          flake.y = -5;
          flake.x = Math.random() * width;
        }

        if (flake.x > width + 5) flake.x = -5;
        if (flake.x < -5) flake.x = width + 5;
      }

      context.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="pointer-events-none fixed inset-0 z-[1]" ref={snowRef} id="snow" aria-hidden="true" />;
}
