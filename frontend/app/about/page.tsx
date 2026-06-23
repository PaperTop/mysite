import AdventCalendar from "../../components/AdventCalendar";
import { CandyDivider, ChipList, PageHero, Placeholder, SectionHead } from "../../components/portfolio";

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="🧝 About" title="Meet your favorite full-stack elf" body="A little chaos, a lot of joy, and code that's nice to read." />

      <section className="section about" id="about">
        <div className="about-grid">
          <div className="about-photo reveal in">
            <div className="photo-frame tilt">
              <Placeholder label="photo of Jaden" />
              <span className="photo-hat">🎅</span>
              <div className="tilt-glare" />
            </div>
            <div className="photo-tag">Currently: debugging by the fireplace</div>
          </div>

          <div className="about-text reveal in">
            <p className="lead">
              I&apos;m Jaden — a CS student who treats every project like Christmas morning.
            </p>
            <p>
              By day I&apos;m wrangling data structures and shipping clean, accessible interfaces. By night I&apos;m tinkering with side projects,
              over-engineering my smart-home lights, and convincing myself that <em>this</em> is the year I finish the game I started.
              I care about craft, kindness, and code that&apos;s nice to read.
            </p>
            <p>
              I&apos;m looking for an internship where I can learn from people smarter than me and build things that actually reach humans. Bonus points if there are good snacks.
            </p>
            <ul className="about-facts">
              {[
                ["4", "languages I'm fluent in (the coding kind)"],
                ["300+", "LeetCode problems wrestled"],
                ["2×", "hackathons won"],
              ].map(([value, label]) => (
                <li key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section education" id="education" data-screen-label="About — education">
        <SectionHead eyebrow="🎓 Education" title="Where I learned the magic" />
        <div className="edu-card reveal in tilt">
          <span className="edu-crest">🏔️</span>
          <div className="edu-main">
            <div className="tl-top">
              <h3>B.S. in Computer Science</h3>
              <span className="tl-date">Expected 2027</span>
            </div>
            <p className="tl-org">North Pole University &nbsp;·&nbsp; GPA 3.[X] / 4.0</p>
            <p className="edu-desc">Relevant coursework: Data Structures &amp; Algorithms, Operating Systems, Machine Learning, Databases, Computer Networks, Distributed Systems.</p>
            <ChipList items={["Dean's List", "Hackathon Winner x2", "CS Club Officer"]} small />
          </div>
          <div className="tilt-glare" />
        </div>
      </section>

      <CandyDivider />

      <section className="section advent" id="advent" data-screen-label="About — advent calendar">
        <SectionHead eyebrow="🎄 24 Days of Jaden" title="Open every door" description="A little advent calendar of who I am. Click a door — there's a surprise behind each one. (Door 24 is the good one.)" />
        <AdventCalendar />
      </section>
    </>
  );
}
