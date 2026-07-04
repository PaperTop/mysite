import ContactForm from "../../components/ContactForm";
import { PageHero, revealInClass, sectionClass } from "../../components/ui";

export default function LetterPage() {
  return (
    <>
      <PageHero eyebrow="✉️ Letter" title="Send me a note" body="This is the least formal room in the house. Send a thought, a question, a strange idea, or a small hello." />
      <section className={`${sectionClass} max-w-[760px]`} id="letter">
        <div className={`${revealInClass} relative rounded-[28px] border-[3px] border-[var(--gold-soft)] bg-[var(--surface)] p-[30px] text-center shadow-[var(--shadow)] lg:p-14`}>
          <span className="mb-1.5 block font-script text-[2.6rem] font-bold text-[var(--gold)]">Ho ho ho!</span>
          <h2 className="mb-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.05]">Tell me something cool</h2>
          <p className="mx-auto mb-[30px] max-w-[480px] text-[var(--ink-soft)]">Big, small, polished, messy - I like hearing what people are thinking about.</p>
          <ContactForm />
          <div className="flex flex-wrap justify-center gap-x-[22px] gap-y-2.5 font-display font-semibold">
            <a className="text-[var(--ink-soft)] transition duration-200 hover:-translate-y-0.5 hover:text-[var(--red)]" href="mailto:JSH007@UCSD.edu">
              ✉️ JSH007@UCSD.edu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
