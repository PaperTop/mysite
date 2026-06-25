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

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="🧝 About" title="Meet your favorite full-stack elf" body="A little chaos, a lot of joy, and code that's nice to read." />

      <section className={sectionClass} id="about">
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
              I&apos;m Jaden — a CS student who treats every project like Christmas morning.
            </p>
            <p className="mb-4 text-[var(--ink-soft)]">
              By day I&apos;m wrangling data structures and shipping clean, accessible interfaces. By night I&apos;m tinkering with side projects,
              over-engineering my smart-home lights, and convincing myself that <em className="not-italic text-[var(--red)] font-semibold">this</em> is the year I finish the game I started.
              I care about craft, kindness, and code that&apos;s nice to read.
            </p>
            <p className="mb-4 text-[var(--ink-soft)]">
              I&apos;m looking for an internship where I can learn from people smarter than me and build things that actually reach humans. Bonus points if there are good snacks.
            </p>
            <ul className="mt-[26px] flex list-none flex-wrap gap-6 max-[560px]:gap-4">
              {[
                ["4", "languages I'm fluent in (the coding kind)"],
                ["300+", "LeetCode problems wrestled"],
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

      <section className={sectionClass} id="education" data-screen-label="About — education">
        <SectionHead eyebrow="🎓 Education" title="Where I learned the magic" />
        <div className={`${revealInClass} ${tiltClass} relative mx-auto flex max-w-[820px] items-start gap-[26px] overflow-hidden rounded-[var(--r)] border-l-[6px] border-l-[var(--gold)] bg-[var(--surface)] p-8 shadow-[var(--shadow-sm)]`}>
          <span className="text-[3.2rem] leading-none">🏔️</span>
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-3.5">
              <h3 className="font-display text-[1.45rem] leading-[1.05]">B.S. in Computer Science</h3>
              <span className="whitespace-nowrap font-display text-[.9rem] font-semibold text-[var(--pine)]">Expected 2027</span>
            </div>
            <p className="mb-3 mt-1 font-semibold text-[var(--red)]">North Pole University &nbsp;·&nbsp; GPA 3.[X] / 4.0</p>
            <p className="mb-4 mt-2.5 text-[var(--ink-soft)]">Relevant coursework: Data Structures &amp; Algorithms, Operating Systems, Machine Learning, Databases, Computer Networks, Distributed Systems.</p>
            <ChipList items={["Dean's List", "Hackathon Winner x2", "CS Club Officer"]} small />
          </div>
          <div className={tiltGlareClass} />
        </div>
      </section>

      <CandyDivider />

      <section className={sectionClass} id="advent" data-screen-label="About — advent calendar">
        <SectionHead eyebrow="🎄 24 Days of Jaden" title="Open every door" description="A little advent calendar of who I am. Click a door — there's a surprise behind each one. (Door 24 is the good one.)" />
        <AdventCalendar />
      </section>
    </>
  );
}
