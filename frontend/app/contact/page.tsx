import ContactForm from "../components/ContactForm";
import { PageHero } from "../components/portfolio";

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="✉️ Contact" title="Drop a letter to the North Pole" body="Got an internship, a project, or just want to talk shop? My inbox is always open." />
      <section className="section contact" id="contact">
        <div className="contact-card reveal in">
          <span className="contact-flourish santa-script">Ho ho ho!</span>
          <h2>Send it up the chimney</h2>
          <p>I reply faster than a sleigh on Christmas Eve.</p>
          <ContactForm />
          <div className="contact-links">
            <a href="#">✉️ jaden@example.com</a>
            <a href="#">💼 LinkedIn</a>
            <a href="#">🐙 GitHub</a>
            <a href="#">🐦 X / Twitter</a>
          </div>
        </div>
      </section>
    </>
  );
}
