import type { CSSProperties } from "react";
import { revealInClass } from "../ui";

type WeeklyCheerChartProps = {
  bars: number[];
};

export function WeeklyCheerChart({ bars }: WeeklyCheerChartProps) {
  return (
    <div className={`${revealInClass} rounded-3xl bg-[var(--surface)] p-[22px] shadow-[var(--shadow-sm)] lg:p-[34px]`} data-screen-label="Brain — weekly chart">
      <h3 className="mb-1 font-display text-[1.4rem] leading-[1.05]">Cheer delivered this week</h3>
      <p className="mb-[22px] text-[.92rem] text-[var(--ink-soft)]">Heart-points, but make it holiday. Saturday was a big one.</p>
      <div className="flex h-40 items-end gap-1.5" style={{ "--ec": "#1a7a4e" } as CSSProperties}>
        {bars.map((height, index) => (
          <i
            className="h-[var(--h)] min-w-1 flex-1 rounded-t-[5px] bg-[var(--ec,#d12b3a)] opacity-90 transition-[height] duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)]"
            key={index}
            style={{ "--h": `${height}%`, transitionDelay: `${index * 0.05}s` } as CSSProperties}
          />
        ))}
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <span className="flex-1 text-center font-mono text-[.78rem] text-[var(--ink-soft)]" key={day}>{day}</span>
        ))}
      </div>
    </div>
  );
}
