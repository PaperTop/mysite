import { revealInClass } from "../ui";

export type CheerProgressRow = {
  color: string;
  label: string;
  sub: string;
  value: string;
};

type CheerProgressPanelProps = {
  rows: CheerProgressRow[];
};

export function CheerProgressPanel({ rows }: CheerProgressPanelProps) {
  return (
    <div className={`${revealInClass} mb-[26px] grid grid-cols-[minmax(260px,360px)_1fr] items-center gap-6 rounded-[26px] bg-[var(--surface)] p-6 shadow-[var(--shadow-sm)] lg:gap-12 lg:p-[38px] max-[760px]:grid-cols-1 max-[760px]:text-center`}>
      <div className="relative mx-auto aspect-square w-[min(340px,78vw)]">
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <b className="font-display text-[2.8rem] leading-none text-[var(--ink)]">81%</b>
          <small className="mt-1 text-[.74rem] font-semibold uppercase tracking-[.1em] text-[var(--ink-soft)]">daily cheer</small>
        </div>
      </div>
      <div className="flex flex-col gap-[18px] max-[760px]:mx-auto max-[760px]:max-w-[380px] max-[760px]:text-left">
        {rows.map((row) => (
          <div className="flex items-center gap-3.5" key={row.label}>
            <span className="h-[15px] w-[15px] flex-none rounded-full shadow-[0_0_10px_currentColor]" style={{ background: row.color, color: row.color }} />
            <div className="flex-1">
              <div className="font-display text-[1.05rem] font-semibold">{row.label}</div>
              <div className="text-[.84rem] text-[var(--ink-soft)]">{row.sub}</div>
            </div>
            <div className="font-mono text-[1.4rem] font-bold">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
