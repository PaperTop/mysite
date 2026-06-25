import { eyebrowClass, revealInClass } from "./styles";

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
    <div className={`${revealInClass} mb-[50px] text-center`}>
      <span className={eyebrowClass}>{eyebrow}</span>
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05]">{title}</h2>
      {description ? (
        <p className="mx-auto mt-3.5 max-w-[600px] text-[1.08rem] text-[var(--ink-soft)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
