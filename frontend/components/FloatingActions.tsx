"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const { night, setNight } = useTheme();

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 700);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="float-controls">
      <button
        className="fc-btn"
        type="button"
        aria-label="Toggle day/night"
        title="Day / Night"
        onClick={() => setNight((value) => !value)}
      >
        {night ? "☀️" : "🌙"}
      </button>
      <button
        className={`fc-btn${showTop ? " show" : ""}`}
        id="toTop"
        type="button"
        aria-label="Back to top"
        title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        🎅
      </button>
    </div>
  );
}
