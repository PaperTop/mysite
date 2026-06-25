export function ChipList({ items, small = false }: { items: string[]; small?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          className={`rounded-full border border-[var(--line)] bg-[var(--cream-2)] font-semibold text-[var(--ink)] body-[.night]:bg-[var(--cream-2)] ${
            small ? "px-[11px] py-1 text-[.78rem]" : "px-[13px] py-1.5 text-[.86rem]"
          }`}
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
