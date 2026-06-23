import Link from "next/link";
import type { CSSProperties } from "react";
import SnowGlobe from "../components/SnowGlobe";
import { CandyDivider, SectionHead } from "../components/portfolio";

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
      <section className="hero" id="hero" data-screen-label="Home — hero">
        <div className="hero-grid">
          <div className="hero-copy reveal in">
            <p className="hero-kicker">Ho ho ho, welcome to my workshop</p>
            <h1 className="hero-title">
              Hi, I&apos;m{" "}
              <span className="nowrap">
                Jaden <span className="santa-script">Santa</span> Huang
              </span>
            </h1>
            <p className="hero-sub">
              A computer science student &amp; full-stack developer who ships delightful things all year round — not just in December.
              Currently hunting for <strong>Summer 2026 internships</strong>.
            </p>
            <div className="hero-actions">
              <Link href="#sleighshow" className="btn btn-red">Take a sleigh ride</Link>
              <Link href="/contact" className="btn btn-ghost">Leave me a letter</Link>
            </div>
            <div className="hero-meta">
              <span>🎓 CS @ North Pole University</span>
              <span className="dot">•</span>
              <span>⚡ Open to work</span>
            </div>
          </div>

          <SnowGlobe />
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>scroll down the chimney</span>
          <span className="chev">⌄</span>
        </div>
      </section>

      <CandyDivider />

      <section className="section sleigh-sec" id="sleighshow" data-screen-label="Home — 3D sleigh">
        <SectionHead eyebrow="🛷 Take a ride" title="Come fly with me" description="My ride of choice. Built it myself — grab it and give it a spin. (Yes, it's fully 3D.)" />
        <div className="sleigh-stage reveal in">
          <div className="sleigh-fallback" style={{ display: "flex" }}>🛷</div>
        </div>
        <p className="globe-hint">✦ drag-free sleigh preview ✦</p>
      </section>

      <CandyDivider flip />

      <section className="section" id="explore" data-screen-label="Home — explore">
        <SectionHead eyebrow="🧭 Explore" title="Where to next?" description="Five stops on the tour. Start wherever you like." />
        <div className="explore-grid">
          {exploreCards.map((card) => (
            <Link
              key={card.href}
              className="explore-card reveal in tilt"
              href={card.href}
              style={{ "--ec": card.color } as CSSProperties}
            >
              <span className="ec-emoji">{card.emoji}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span className="ec-go">{card.action} →</span>
              <div className="tilt-glare" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
