import AdventCalendar from "../../components/AdventCalendar";
import {
  CandyDivider,
  ChipList,
  PageHero,
  Placeholder,
  revealInClass,
  sectionClass,
  SectionHead,
  tiltClass,
  tiltGlareClass,
} from "../../components/ui";

export default function MePage() {
  return (
    <>
      <PageHero eyebrow="🧝 Me" title="Curious, a little chaotic, always building" body="A snapshot of how I learn, what I care about, and the small habits that keep me moving." />

      <section className={sectionClass} id="me">
        <div className="grid grid-cols-[.85fr_1.15fr] items-center gap-8 lg:gap-16 max-[860px]:grid-cols-1">
          <div className={`${revealInClass} flex flex-col items-center gap-4 max-[860px]:-order-1`}>
            <div className={`${tiltClass} relative aspect-[4/5] w-full max-w-[340px] rounded-[var(--r)] border-[3px] border-[var(--gold-soft)] bg-[var(--surface)] p-3.5 shadow-[var(--shadow)]`}>
              <Placeholder label="photo of Jaden" />
              <span className="absolute -left-[18px] -top-[26px] z-[3] rotate-[-18deg] text-5xl drop-shadow-[0_4px_4px_rgba(0,0,0,.2)]">🎅</span>
              <div className={tiltGlareClass} />
            </div>
            <div className="rounded-full border-2 border-[var(--pine)] bg-[var(--surface)] px-4 py-1.5 font-display text-[.9rem] font-semibold text-[var(--pine)] shadow-[var(--shadow-sm)] body-[.night]:border-[var(--gold-soft)] body-[.night]:text-[var(--gold-soft)]">
              Currently: debugging by the fireplace
            </div>
          </div>

          <div className={revealInClass}>
            <p className="mb-[18px] font-display text-[1.4rem] font-medium leading-[1.35] text-[var(--ink)]">
              I&apos;m Jaden — an Artificial Intelligence student who likes turning half-formed ideas into things people can actually poke at.
            </p>
            <p className="mb-4 text-[var(--ink-soft)]">
              I like projects that make me learn the uncomfortable part: the weird bug, the missing mental model, the feature that looks simple until it has to feel good.
              I care about craft, kindness, and code that is nice to read.
            </p>
            <p className="mb-4 text-[var(--ink-soft)]">
              Lately I have been focused on building in public, tightening my fundamentals, and keeping a steady rhythm: ship something, reflect, then make the next version better.
            </p>
            <ul className="mt-[26px] flex list-none flex-wrap gap-6 max-[560px]:gap-4">
              {[
                ["4", "languages I'm fluent in (the coding kind)"],
                ["300+", "practice problems wrestled"],
                ["2×", "hackathons won"],
              ].map(([value, label]) => (
                <li className="flex flex-col" key={label}>
                  <strong className="font-display text-[2.2rem] leading-none text-[var(--red)]">{value}</strong>
                  <span className="max-w-[150px] text-[.85rem] text-[var(--ink-soft)]">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={sectionClass} id="education" data-screen-label="Me — education">
        <SectionHead eyebrow="🎓 Education" title="Where I learned the magic" />
        <div className={`${revealInClass} ${tiltClass} relative mx-auto flex max-w-[820px] items-start gap-[26px] overflow-hidden rounded-[var(--r)] border-l-[6px] border-l-[var(--gold)] bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)]`}>
          <span className="text-[3.2rem] leading-none">🏔️</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-3.5">
              <h3 className="font-display text-[1.45rem] leading-[1.05]">Artificial Intelligence</h3>
            </div>
            <p className="mb-3 mt-1 font-semibold text-[var(--red)]">University of California, San Diego</p>
            <p className="mb-4 mt-2.5 text-[var(--ink-soft)]">Relevant coursework: Data Structures &amp; Algorithms, Operating Systems, Machine Learning, Databases, Computer Networks, Distributed Systems.</p>
            <ChipList items={["Dean's List", "Hackathon Winner x2", "CS Club Officer"]} small />
          </div>
          <div className={tiltGlareClass} />
        </div>
      </section>

      <CandyDivider />

      <section className={sectionClass} id="advent" data-screen-label="Me — advent calendar">
        <SectionHead eyebrow="🎄 24 Days of Jaden" title="Open every door" description="A little advent calendar of who I am. Click a door and you get a tiny signal from the person behind the site." />
        <AdventCalendar />
      </section>
    </>
  );
}
