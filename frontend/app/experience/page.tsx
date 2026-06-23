import { buttonBase, CandyDivider, ChipList, PageHero, SectionHead } from "../components/portfolio";

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

export default function ExperiencePage() {
  return (
    <>
      <PageHero eyebrow="📜 Experience" title="Toolkit & Workshop Logs" body="What I build with, and where I've built it." />
      <section className="section skills" id="skills">
        <SectionHead eyebrow="🧰 Skills" title="Santa's Toolkit" />
        <div className="skills-grid">
          {skillGroups.map(([emoji, title, chips]) => (
            <article className="skill-card reveal in tilt" key={title}>
              <span className="skill-emoji">{emoji}</span>
              <h3>{title}</h3>
              <ChipList items={[...chips]} />
              <div className="tilt-glare" />
            </article>
          ))}
        </div>
      </section>

      <CandyDivider flip />

      <section className="section work" id="work" data-screen-label="Experience — timeline">
        <SectionHead eyebrow="📜 Experience" title="Workshop Logs" />
        <div className="timeline">
          {timeline.map((item) => (
            <article className="tl-item reveal in" key={item.title}>
              <span className="tl-dot">{item.emoji}</span>
              <div className="tl-card">
                <div className="tl-top">
                  <h3>{item.title}</h3>
                  <span className="tl-date">{item.date}</span>
                </div>
                <p className="tl-org">{item.org}</p>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="work-cta reveal in">
          <a className={`${buttonBase} btn-green`} href="#">
            📄 Download my résumé (the nice list)
          </a>
        </div>
      </section>
    </>
  );
}
