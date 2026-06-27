import ContactForm from "../../components/ContactForm";
import { PageHero, revealInClass, sectionClass } from "../../components/ui";

export default function LetterPage() {
  return (
    <>
      <PageHero eyebrow="✉️ Letter" title="Drop a letter to the North Pole" body="Got an internship, a project, or just want to talk shop? My inbox is always open." />
      <section className={`${sectionClass} max-w-[760px]`} id="letter">
        <div className={`${revealInClass} relative rounded-[28px] border-[3px] border-[var(--gold-soft)] bg-[var(--surface)] p-[30px] text-center shadow-[var(--shadow)] lg:p-14`}>
          <span className="mb-1.5 block font-script text-[2.6rem] font-bold text-[var(--gold)]">Ho ho ho!</span>
          <h2 className="mb-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.05]">Send it up the chimney</h2>
          <p className="mx-auto mb-[30px] max-w-[480px] text-[var(--ink-soft)]">I reply faster than a sleigh on Christmas Eve.</p>
          <ContactForm />
          <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-2.5 font-display font-semibold">
            {["✉️ jaden@example.com", "💼 LinkedIn", "🐙 GitHub", "🐦 X / Twitter"].map((label) => (
              <a className="text-[var(--ink-soft)] transition duration-200 hover:-translate-y-0.5 hover:text-[var(--red)]" href="#" key={label}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
