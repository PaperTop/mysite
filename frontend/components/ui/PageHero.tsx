import { eyebrowClass, revealInClass } from "./styles";

export function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="relative z-[3] mx-auto w-full max-w-[1180px] px-[18px] pb-4 pt-[124px] text-center sm:px-8 lg:px-10">
      <span className={`${eyebrowClass} ${revealInClass}`}>{eyebrow}</span>
      <h1 className={`${revealInClass} my-1.5 mb-3.5 font-display text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] [text-shadow:0_3px_0_rgba(255,255,255,.5)] body-[.night]:[text-shadow:0_0_24px_rgba(120,150,255,.3)]`}>
        {title}
      </h1>
      <p className={`${revealInClass} mx-auto max-w-[620px] text-[1.12rem] text-[var(--ink-soft)]`}>{body}</p>
    </header>
  );
}
