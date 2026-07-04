import {
  buttonGreenClass,
  CandyDivider,
  ChipList,
  PageHero,
  revealInClass,
  sectionClass,
  SectionHead,
  tiltClass,
  tiltGlareClass,
} from "../../components/ui";

const skillGroups = [
  ["💻", "Languages", ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL"]],
  ["🎨", "Frontend", ["React", "Next.js", "Three.js", "Tailwind", "Framer Motion"]],
  ["⚙️", "Backend", ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"]],
  ["🛠️", "Tools & Cloud", ["Git", "Docker", "AWS", "Figma", "Linux", "CI/CD"]],
] as const;

const timeline = [
  {
    date: "Now",
    emoji: "🎁",
    org: "Personal workbench",
    title: "Building projects in public",
    bullets: [
      "Iterating on this site as a real product surface instead of a frozen profile.",
      "Practicing the loop of build, inspect, tighten, and write down what changed.",
      "Keeping small experiments visible so progress is easier to notice and harder to fake.",
    ],
  },
  {
    date: "2024 - Present",
    emoji: "⭐",
    org: "UC San Diego",
    title: "Artificial Intelligence student",
    bullets: [
      "Studying the fundamentals behind intelligent systems, data, and software that scales past toy examples.",
      "Using coursework as fuel for side projects, notes, and experiments that make the concepts stick.",
    ],
  },
  {
    date: "2023 - 2024",
    emoji: "🔔",
    org: "Projects, clubs, and late-night debugging",
    title: "Learning by making",
    bullets: [
      "Chasing the parts of software that feel just out of reach, then building enough to make them less mysterious.",
      "Trying to be the kind of teammate who brings steady energy, low ego, and readable code.",
    ],
  },
];

export default function TimelinePage() {
  return (
    <>
      <PageHero eyebrow="📜 Timeline" title="Toolkit & Workshop Logs" body="What I reach for, what I am practicing, and how the work is changing over time." />
      <section className={sectionClass} id="skills">
        <SectionHead eyebrow="🧰 Skills" title="Santa's Toolkit" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[22px]">
          {skillGroups.map(([emoji, title, chips], index) => (
            <article
              className={`${revealInClass} ${tiltClass} relative overflow-hidden rounded-[var(--r)] border-t-[5px] bg-[var(--surface)] p-7 shadow-[var(--shadow-sm)] ${
                index % 2 === 0 ? "border-t-[var(--pine)]" : "border-t-[var(--red)]"
              }`}
              key={title}
            >
              <span className="mb-2.5 block text-[2.4rem]">{emoji}</span>
              <h3 className="mb-4 font-display text-[1.3rem] leading-[1.05]">{title}</h3>
              <ChipList items={[...chips]} />
              <div className={tiltGlareClass} />
            </article>
          ))}
        </div>
      </section>

      <CandyDivider flip />

      <section className={sectionClass} id="work" data-screen-label="Timeline — work">
        <SectionHead eyebrow="📜 Timeline" title="Workshop Logs" description="Less of a formal timeline, more of a record of what I am actively becoming better at." />
        <div className="relative mx-auto max-w-[780px] pl-[42px] before:absolute before:bottom-2 before:left-[13px] before:top-2 before:w-1 before:rounded before:[background:var(--stripe)] before:bg-[length:30px_30px] before:content-['']">
          {timeline.map((item) => (
            <article className={`${revealInClass} relative mb-[26px]`} key={item.title}>
              <span className="absolute -left-[42px] top-[18px] grid h-[38px] w-[38px] -translate-x-[5px] place-items-center rounded-full bg-[var(--surface)] text-[1.1rem] shadow-[var(--shadow-sm)]">
                {item.emoji}
              </span>
              <div className="rounded-[var(--r)] bg-[var(--surface)] px-[26px] py-6 shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-[250ms] hover:translate-x-1 hover:shadow-[var(--shadow)]">
                <div className="flex flex-wrap items-baseline justify-between gap-3.5">
                  <h3 className="font-display text-[1.25rem] leading-[1.05]">{item.title}</h3>
                  <span className="whitespace-nowrap font-display text-[.9rem] font-semibold text-[var(--pine)]">{item.date}</span>
                </div>
                <p className="mb-3 mt-1 font-semibold text-[var(--red)]">{item.org}</p>
                <ul className="list-disc pl-5 text-[var(--ink-soft)]">
                  {item.bullets.map((bullet) => (
                    <li className="mb-1.5" key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className={`${revealInClass} mt-10 text-center`}>
          <a className={buttonGreenClass} href="/letter">
            ✉️ Ask me what I am building
          </a>
        </div>
      </section>
    </>
  );
}
