import Link from "next/link";
import type { CSSProperties } from "react";
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
  { color: "#1a7a4e", emoji: "🧝", href: "/about", title: "About", text: "Who I am, where I study, and 24 little doors of trivia.", action: "Meet the elf" },
  { color: "#d12b3a", emoji: "🎁", href: "/projects", title: "Projects", text: "The toys I've shipped — apps, ML, and open source.", action: "Open the gifts" },
  { color: "#e6b24a", emoji: "📜", href: "/experience", title: "Experience", text: "My toolkit and the workshops I've worked in.", action: "Read the logs" },
  { color: "#2a6fdb", emoji: "📊", href: "/stats", title: "Command Center", text: "Live North Pole metrics, tracked in glorious 3D.", action: "Check the vitals" },
  { color: "#1a7a4e", emoji: "✉️", href: "/contact", title: "Contact", text: "Got an internship or idea? Send a letter to the Pole.", action: "Write to me" },
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
            <p className="mb-5 inline-block rounded-full border-2 border-dashed border-[var(--pine)] bg-[var(--surface)] px-[18px] py-[7px] font-display text-[.95rem] font-semibold text-[var(--pine)] shadow-[var(--shadow-sm)] body-[.night]:border-[var(--gold-soft)] body-[.night]:text-[var(--gold-soft)]">
              Ho ho ho, welcome to my workshop
            </p>
            <h1 className="mb-[18px] font-display text-[clamp(2.5rem,5.6vw,4.6rem)] font-bold leading-[1.05] [text-shadow:0_3px_0_rgba(255,255,255,.7)] body-[.night]:[text-shadow:0_0_26px_rgba(120,150,255,.35)]">
              Hi, I&apos;m{" "}
              <span className="block sm:inline sm:whitespace-nowrap">
                Jaden <span className="font-script font-bold text-[var(--gold)]">Santa</span>{" "}
                <span className="block sm:inline">Huang</span>
              </span>
            </h1>
            <p className="mb-[30px] max-w-[560px] text-[clamp(1.02rem,1.5vw,1.22rem)] text-[var(--ink-soft)] max-[920px]:mx-auto">
              A computer science student &amp; full-stack developer who ships delightful things all year round — not just in December.
              Currently hunting for <strong className="text-[var(--red)]">Summer 2026 internships</strong>.
            </p>
            <div className="mb-7 flex flex-wrap gap-3.5 max-[920px]:justify-center">
              <Link href="#explore" className={buttonRedClass}>Explore the workshop</Link>
              <Link href="/contact" className={buttonGhostClass}>Leave me a letter</Link>
            </div>
            <div className="flex flex-wrap gap-2.5 text-[.95rem] font-semibold text-[var(--ink-soft)] max-[920px]:justify-center">
              <span>🎓 CS @ North Pole University</span>
              <span className="text-[var(--gold)]">•</span>
              <span>⚡ Open to work</span>
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
        <SectionHead eyebrow="🧭 Explore" title="Where to next?" description="Five stops on the tour. Start wherever you like." />
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
