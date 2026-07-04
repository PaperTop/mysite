export function ProjectLinks() {
  return (
    <div className="mt-1 flex flex-wrap gap-2.5">
      <span className="rounded-full bg-[rgba(209,43,58,.08)] px-3 py-1 font-display text-[.82rem] font-semibold text-[var(--red)] body-[.night]:bg-[rgba(255,154,162,.14)] body-[.night]:text-[#ff9aa2]">
        Draft
      </span>
      <span className="rounded-full bg-[rgba(26,122,78,.08)] px-3 py-1 font-display text-[.82rem] font-semibold text-[var(--pine)] body-[.night]:bg-[rgba(120,230,180,.14)] body-[.night]:text-[#9ff0c8]">
        Coming soon
      </span>
    </div>
  );
}
