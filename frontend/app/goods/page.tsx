import {
  ChipList,
  PageHero,
  Placeholder,
  revealInClass,
  sectionClass,
  tiltClass,
  tiltGlareClass,
} from "../../components/ui";
import { ProjectLinks } from "../../components/projects/ProjectLinks";

const projects = [
  {
    alt: false,
    chips: ["In progress", "Systems", "UX"],
    featured: true,
    title: "Project bench",
    text: "The place where polished projects will land. For now, this is a reminder that the portfolio is still actively becoming more real.",
  },
  {
    alt: true,
    chips: ["Next.js", "TypeScript", "Play"],
    title: "Personal site",
    text: "This site is one of the experiments: playful interface, real code, weird little interactions, and a lot of iteration in public.",
  },
  {
    alt: false,
    chips: ["AI", "Notes", "Learning"],
    title: "Learning logs",
    text: "A growing pile of notes from AI, systems, frontend craft, and whatever concept is currently bothering me enough to understand it.",
  },
  {
    alt: true,
    chips: ["Ideas", "Prototype", "Soon"],
    title: "Next thing",
    text: "A slot for the next real build. I like keeping a visible empty space because it makes the unfinished work harder to ignore.",
  },
];

export default function GoodsPage() {
  return (
    <>
      <PageHero eyebrow="🎁 Goods" title="Work in progress" body="A workbench for projects, prototypes, and the things I am slowly turning into artifacts worth showing." />
      <section className={sectionClass} id="goods">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[26px]">
          {projects.map((project) => (
            <article
              className={`${revealInClass} ${tiltClass} relative flex flex-col overflow-hidden rounded-[var(--r)] bg-[var(--surface)] shadow-[var(--shadow-sm)]`}
              key={project.title}
            >
              <div
                className={`relative aspect-[16/10] p-3.5 ${
                  project.alt ? "[background:var(--project-thumb-alt)]" : "[background:var(--project-thumb)]"
                }`}
              >
                <Placeholder label="project screenshot" />
                {project.featured ? (
                  <span className="absolute right-3 top-3 z-[3] rounded-full bg-[var(--gold)] px-3 py-1 font-display text-[.78rem] font-semibold text-[#33202a] shadow-[var(--shadow-sm)]">
                    Featured
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 py-[22px]">
                <h3 className="font-display text-[1.4rem] leading-[1.05]">{project.title}</h3>
                <p className="flex-1 text-[.96rem] text-[var(--ink-soft)]">{project.text}</p>
                <ChipList items={project.chips} small />
                <ProjectLinks />
              </div>
              <div className={tiltGlareClass} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
