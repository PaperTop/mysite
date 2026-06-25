export function Placeholder({ label }: { label: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[14px] [background:var(--placeholder-bg)]">
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[.74rem] uppercase tracking-[.04em] text-[#a8987f] body-[.night]:text-[#6f80ac]">
        {label}
      </span>
    </div>
  );
}
