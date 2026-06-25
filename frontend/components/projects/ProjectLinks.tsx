import Link from "next/link";

export function ProjectLinks() {
  return (
    <div className="mt-1 flex gap-[18px]">
      <Link className="font-display text-[.92rem] font-semibold text-[var(--red)] transition duration-200 hover:translate-x-0.5 body-[.night]:text-[#ff9aa2]" href="#">
        Live demo →
      </Link>
      <Link className="font-display text-[.92rem] font-semibold text-[var(--red)] transition duration-200 hover:translate-x-0.5 body-[.night]:text-[#ff9aa2]" href="#">
        Code →
      </Link>
    </div>
  );
}
