"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const controlButtonClass =
  "grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full border-0 bg-[var(--surface)] text-[1.4rem] text-[var(--ink)] shadow-[var(--shadow)] transition-[transform,background] duration-[250ms] hover:-translate-y-[3px] hover:scale-105";

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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <button
        className={controlButtonClass}
        type="button"
        aria-label="Toggle day/night"
        title="Day / Night"
        onClick={() => setNight((value) => !value)}
      >
        {night ? "☀️" : "🌙"}
      </button>
      <button
        className={`${controlButtonClass} bg-[var(--red)] ${
          showTop ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-5 scale-[.8] opacity-0"
        }`}
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
