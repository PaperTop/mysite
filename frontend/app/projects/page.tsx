import { ChipList, PageHero, Placeholder, ProjectLinks } from "../components/portfolio";

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

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="🎁 Projects" title="Toys I've Shipped" body="A few things I've built and am proud of. Swap these for your real projects." />
      <section className="section projects" id="projects">
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card reveal in tilt" key={project.title}>
              <div className={`project-thumb${project.alt ? " alt" : ""}`}>
                <Placeholder label="project screenshot" />
                {project.featured ? <span className="ribbon">Featured</span> : null}
              </div>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.text}</p>
                <ChipList items={project.chips} small />
                <ProjectLinks />
              </div>
              <div className="tilt-glare" />
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
