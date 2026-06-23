"use client";

import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

const flakes = Array.from({ length: 30 }, (_, index) => ({
  delay: `${(index % 10) * 0.32}s`,
  left: `${8 + ((index * 17) % 84)}%`,
  size: `${3 + (index % 4)}px`,
  top: `${8 + ((index * 23) % 54)}%`,
}));

export default function SnowGlobe() {
  const [rotation, setRotation] = useState(0);
  const [hintHidden, setHintHidden] = useState(false);
  const dragStart = useRef<{ pointerId: number; x: number; rotation: number } | null>(null);

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    dragStart.current = {
      pointerId: event.pointerId,
      rotation,
      x: event.clientX,
    };
    setHintHidden(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event: PointerEvent<HTMLDivElement>) {
    const activeDrag = dragStart.current;

    if (!activeDrag || activeDrag.pointerId !== event.pointerId) {
      return;
    }

    setRotation(activeDrag.rotation + (event.clientX - activeDrag.x) * 0.45);
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (dragStart.current?.pointerId === event.pointerId) {
      dragStart.current = null;
    }
  }

  return (
    <div className="hero-globe reveal in">
      <div
        className="globe-stage"
        role="img"
        aria-label="Interactive snow globe with a Christmas tree and gifts"
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerCancel={endDrag}
        onPointerUp={endDrag}
      >
        <div
          className="globe-scene"
          style={{ "--globe-rotation": `${rotation}deg` } as CSSProperties}
        >
          {flakes.map((flake, index) => (
            <span
              aria-hidden="true"
              className="globe-flake"
              key={index}
              style={{
                animationDelay: flake.delay,
                height: flake.size,
                left: flake.left,
                top: flake.top,
                width: flake.size,
              }}
            />
          ))}
          <div className="globe-back-hill" aria-hidden="true" />
          <div className="globe-ground" aria-hidden="true" />
          <div className="globe-tree globe-tree-main" aria-hidden="true">
            <span className="globe-star" />
            <span className="globe-branch globe-branch-top" />
            <span className="globe-branch globe-branch-mid" />
            <span className="globe-branch globe-branch-low" />
            <span className="globe-trunk" />
            <span className="globe-ornament ornament-red ornament-one" />
            <span className="globe-ornament ornament-gold ornament-two" />
            <span className="globe-ornament ornament-blue ornament-three" />
          </div>
          <div className="globe-tree globe-tree-left" aria-hidden="true">
            <span className="globe-branch globe-branch-mid" />
            <span className="globe-branch globe-branch-low" />
            <span className="globe-trunk" />
          </div>
          <div className="globe-tree globe-tree-right" aria-hidden="true">
            <span className="globe-branch globe-branch-mid" />
            <span className="globe-branch globe-branch-low" />
            <span className="globe-trunk" />
          </div>
          <div className="globe-gift gift-red" aria-hidden="true" />
          <div className="globe-gift gift-blue" aria-hidden="true" />
          <div className="globe-gift gift-green" aria-hidden="true" />
        </div>
        <div className="globe-glass" aria-hidden="true" />
      </div>
      <div className="globe-base">
        <span className="globe-plate">JADEN&nbsp;·&nbsp;SANTA&nbsp;·&nbsp;HUANG</span>
      </div>
      <p className={`globe-hint ${hintHidden ? "gone" : ""}`}>✦ drag the globe to spin my world ✦</p>
    </div>
  );
}
