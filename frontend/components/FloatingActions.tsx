"use client";
import { useTheme } from "./ThemeProvider";

const controlButtonClass =
  "grid h-[52px] w-[52px] cursor-pointer place-items-center rounded-full border-0 bg-[var(--surface)] text-[1.4rem] text-[var(--ink)] shadow-[var(--shadow)] transition-[transform,background] duration-[250ms] hover:-translate-y-[3px] hover:scale-105";

export default function FloatingActions() {
  const { night, setNight } = useTheme();

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
    </div>
  );
}
