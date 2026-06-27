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
    chips: ["React", "Node", "WebSockets", "Mapbox"],
    featured: true,
    title: "SleighOS",
    text: "A real-time logistics dashboard that routes thousands of deliveries with a custom pathfinding algorithm. Handles peak load on the busiest night of the year.",
  },
  {
    alt: true,
    chips: ["Next.js", "TypeScript", "PWA"],
    title: "Cocoa",
    text: "A cozy habit-tracker that rewards you with warm fuzzies instead of guilt. Built mobile-first with offline sync and delightful micro-interactions.",
  },
  {
    alt: false,
    chips: ["Python", "PyTorch", "FastAPI"],
    title: "NaughtyOrNice.ml",
    text: "An ML classifier trained on a custom dataset that predicts intent with 9X% accuracy. My excuse to finally understand transformers from scratch.",
  },
  {
    alt: true,
    chips: ["Go", "CLI", "OSS"],
    title: "Mistletoe",
    text: "A tiny open-source CLI that automates the boring parts of my workflow. Turns out other people hated those parts too.",
  },
];

export default function GoodsPage() {
  return (
    <>
      <PageHero eyebrow="🎁 Goods" title="Toys I've Shipped" body="A few things I've built and am proud of. Swap these for your real projects." />
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
