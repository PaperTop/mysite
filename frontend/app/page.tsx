import Link from "next/link";
import type { CSSProperties } from "react";
import SantaSoundButton from "../components/SantaSoundButton";
import SnowGlobe from "../components/SnowGlobe";
import {
  buttonGhostClass,
  buttonRedClass,
  CandyDivider,
  revealInClass,
  sectionClass,
  SectionHead,
  tiltClass,
  tiltGlareClass,
} from "../components/ui";

const exploreCards = [
  { color: "#1a7a4e", emoji: "🧝", href: "/me", title: "Me", text: "The person behind the projects: habits, quirks, and what keeps me learning.", action: "Meet me" },
  { color: "#d12b3a", emoji: "🎁", href: "/goods", title: "Goods", text: "A workbench for projects, experiments, and things I am turning into real artifacts.", action: "Open the workbench" },
  { color: "#e6b24a", emoji: "📜", href: "/timeline", title: "Timeline", text: "The tools I reach for and the trail of what I have been practicing.", action: "Read the logs" },
  { color: "#2a6fdb", emoji: "📊", href: "/brain", title: "Brain", text: "Private-ish signals, notes, and the parts of my life that keep updating.", action: "Check the vitals" },
];

export default function HomePage() {
  return (
    <>
      <section
        className="relative z-[3] mx-auto flex min-h-svh w-full max-w-[1180px] flex-col justify-center px-[18px] pb-20 pt-[110px] sm:px-8 lg:px-[46px] max-[920px]:pt-[90px]"
        id="hero"
        data-screen-label="Home — hero"
      >
        <div className="grid w-full grid-cols-[1.05fr_.95fr] items-center gap-6 lg:gap-14 max-[920px]:grid-cols-1 max-[920px]:text-center">
          <div className={`${revealInClass} relative max-[920px]:order-2`}>
            <h1 className="mb-[18px] font-display text-[clamp(2.5rem,5.6vw,4.6rem)] font-bold leading-[1.05] [text-shadow:0_3px_0_rgba(255,255,255,.7)] body-[.night]:[text-shadow:0_0_26px_rgba(120,150,255,.35)]">
              Hi, I&apos;m{" "}
              <span className="block sm:inline sm:whitespace-nowrap">
                Jaden <SantaSoundButton />{" "}
                <span className="block sm:inline">Huang</span>
              </span>
            </h1>
            <p className="mb-[30px] max-w-[560px] text-[clamp(1.02rem,1.5vw,1.22rem)] text-[var(--ink-soft)] max-[920px]:mx-auto">
              An Artificial Intelligence student at UC San Diego building little systems, learning in public, and trying to get better every week.
            </p>
            <div className="mb-7 flex flex-wrap gap-3.5 max-[920px]:justify-center">
              <Link href="#explore" className={buttonRedClass}>Explore the workshop</Link>
              <Link href="/letter" className={buttonGhostClass}>Leave me a letter</Link>
            </div>
            <div className="flex flex-wrap gap-2.5 text-[.95rem] font-semibold text-[var(--ink-soft)] max-[920px]:justify-center">
              <span>🎓 AI @ UC San Diego</span>
              <span className="text-[var(--gold)]">•</span>
              <span>⚡ Always building</span>
            </div>
          </div>

          <SnowGlobe />
        </div>
        <div className="absolute bottom-[18px] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-0.5 text-[.82rem] font-semibold text-[var(--ink-soft)]" aria-hidden="true">
          <span>scroll down the chimney</span>
          <span className="animate-bob text-[1.6rem] leading-[.6] motion-reduce:animate-none">⌄</span>
        </div>
      </section>

      <CandyDivider />

      <section className={sectionClass} id="explore" data-screen-label="Home — explore">
        <SectionHead eyebrow="🧭 Explore" title="Where to next?" description="Four stops on the tour. Start wherever you like." />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-5">
          {exploreCards.map((card) => (
            <Link
              key={card.href}
              className={`${revealInClass} ${tiltClass} relative block overflow-hidden rounded-[20px] border-b-4 border-[var(--ec,#d12b3a)] bg-[var(--surface)] px-[26px] py-[30px] shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[7px]`}
              href={card.href}
              style={{ "--ec": card.color } as CSSProperties}
            >
              <span className="mb-3 block text-[2.2rem]">{card.emoji}</span>
              <h3 className="mb-1.5 font-display text-[1.3rem] leading-[1.05]">{card.title}</h3>
              <p className="text-[.92rem] text-[var(--ink-soft)]">{card.text}</p>
              <span className="mt-3.5 inline-block font-display font-semibold text-[var(--red)] transition-transform duration-200 group-hover:translate-x-1 body-[.night]:text-[#ff9aa2]">
                {card.action} →
              </span>
              <div className={tiltGlareClass} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
