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
    date: "Summer 2025",
    emoji: "🎁",
    org: "Tinsel & Co. - placeholder company",
    title: "Software Engineering Intern",
    bullets: [
      "Built and shipped a feature used by [X] users, improving [metric] by [Y]%.",
      "Collaborated with a cross-functional team to redesign the onboarding flow.",
      "Wrote tests, reviewed PRs, and kept the deploy pipeline merry and bright.",
    ],
  },
  {
    date: "2024 - Present",
    emoji: "⭐",
    org: "North Pole University, [Lab Name]",
    title: "Undergraduate Research Assistant",
    bullets: [
      "Researching [topic] under Prof. [Name]; co-authored a paper currently in review.",
      "Built data-processing tooling that cut analysis time from hours to minutes.",
    ],
  },
  {
    date: "2023 - 2024",
    emoji: "🔔",
    org: "North Pole University",
    title: "Teaching Assistant - Intro to CS",
    bullets: [
      "Led weekly lab sections for 30+ students; held office hours and graded with care.",
      "Created supplemental materials that students actually said were helpful.",
    ],
  },
];

export default function TimelinePage() {
  return (
    <>
      <PageHero eyebrow="📜 Timeline" title="Toolkit & Workshop Logs" body="What I build with, and where I've built it." />
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
        <SectionHead eyebrow="📜 Timeline" title="Workshop Logs" />
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
          <a className={buttonGreenClass} href="#">
            📄 Download my résumé (the nice list)
          </a>
        </div>
      </section>
    </>
  );
}
