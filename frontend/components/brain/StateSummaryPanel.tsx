import type { CSSProperties } from "react";
import { revealInClass } from "../ui";

export type DailySummary = {
  date: string;
  highlights: {
    label: string;
    value: string;
    tone: "body" | "money" | "code";
  }[];
  tabLabel: string;
  title: string;
  text: string;
};

type StateSummaryPanelProps = {
  selectedIndex: number;
  summaries: DailySummary[];
  onSelect: (index: number) => void;
};

export function StateSummaryPanel({ selectedIndex, summaries, onSelect }: StateSummaryPanelProps) {
  const selectedSummary = summaries[selectedIndex] ?? summaries[0];

  return (
    <div className={`${revealInClass} mb-[26px] rounded-[22px] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] lg:p-[38px]`}>
      <div className="min-w-0">
        <p className="mb-3 font-mono text-[.84rem] font-semibold text-[var(--ink-soft)]">{selectedSummary.date}</p>
        <h2 className="max-w-[780px] font-display text-[clamp(2rem,5vw,4.2rem)] leading-[.95] text-[var(--ink)]">{selectedSummary.title}</h2>
      </div>
      <div className="mt-6 grid w-full max-w-[430px] grid-cols-3 gap-1 rounded-[18px] bg-[var(--cream)] p-1">
        {summaries.map((summary, index) => (
          <button
            aria-pressed={index === selectedIndex}
            className="min-w-0 rounded-[14px] px-3 py-2.5 font-display text-[.84rem] font-semibold text-[var(--ink-soft)] transition-[background,color,transform] duration-200 hover:-translate-y-0.5 hover:text-[var(--ink)] aria-pressed:bg-[var(--pine)] aria-pressed:text-white"
            key={summary.date}
            onClick={() => onSelect(index)}
            type="button"
          >
            {summary.tabLabel}
          </button>
        ))}
      </div>
      <p className="mt-5 max-w-[780px] text-[1.02rem] leading-8 text-[var(--ink-soft)]">{selectedSummary.text}</p>
      <div className="mt-7 grid grid-cols-3 gap-3 max-[760px]:grid-cols-1">
        {selectedSummary.highlights.map((highlight) => (
          <div
            className="rounded-[16px] bg-[var(--highlight-bg)] px-4 py-3"
            key={highlight.label}
            style={{ "--highlight-bg": highlightToneBg[highlight.tone] } as CSSProperties}
          >
            <p className="font-display text-[.82rem] font-semibold text-[var(--ink-soft)]">{highlight.label}</p>
            <p className="font-mono text-[1.35rem] font-bold text-[var(--ink)]">{highlight.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const highlightToneBg = {
  body: "rgba(209,43,58,.08)",
  money: "rgba(26,122,78,.09)",
  code: "rgba(42,111,219,.09)",
};
