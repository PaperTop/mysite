export default function SiteFooter() {
  return (
    <footer className="footer">
      <p className="footer-big">Made with 🍪, ❤️, and far too much cocoa.</p>
      <p className="footer-small">
        © {new Date().getFullYear()} Jaden Santa Huang · Built from scratch, no elves were harmed.{" "}
        <span className="kbd-hint">psst - try the ↑↑↓↓ Konami code</span>
      </p>
    </footer>
  );
}
