export default function SiteFooter() {
  return (
    <footer className="relative z-[3] [background:var(--footer-bg)] px-5 py-[46px] text-center">
      <p className="font-display text-[1.2rem] font-semibold text-[var(--ink)]">Made with 🍪, ❤️, and far too much cocoa.</p>
      <p className="mt-1.5 text-[.88rem] text-[var(--ink-soft)]">
        © {new Date().getFullYear()} Jaden Santa Huang · Built from scratch, no elves were harmed.{" "}
        <span className="ml-1.5 inline-block font-mono text-[.78rem] opacity-60">psst - try the ↑↑↓↓ Konami code</span>
      </p>
    </footer>
  );
}
