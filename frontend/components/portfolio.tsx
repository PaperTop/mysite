import Link from "next/link";

export const buttonBase =
  "btn";

export function SectionHead({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-head reveal in">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description ? <p className="section-desc">{description}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="page-hero">
      <span className="eyebrow reveal in">{eyebrow}</span>
      <h1 className="reveal in">{title}</h1>
      <p className="reveal in">{body}</p>
    </header>
  );
}

export function CandyDivider({ flip = false }: { flip?: boolean }) {
  return <div className={`candy-divider${flip ? " flip" : ""}`} aria-hidden="true" />;
}

export function Placeholder({ label }: { label: string }) {
  return <div className="img-placeholder" data-label={label} />;
}

export function ChipList({ items, small = false }: { items: string[]; small?: boolean }) {
  return (
    <div className={`chips${small ? " small" : ""}`}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

export function ProjectLinks() {
  return (
    <div className="project-links">
      <Link href="#">Live demo →</Link>
      <Link href="#">Code →</Link>
    </div>
  );
}
