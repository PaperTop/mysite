"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavItems } from "./site-navigation";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 30);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <span className="brand-hat" aria-hidden="true">🎅</span>
        <span className="brand-name">
          Jaden <em>Santa</em> Huang
        </span>
      </Link>
      <nav className={`nav-links${open ? " open" : ""}`} aria-label="Primary navigation">
        {siteNavItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className="nav-cta"
          onClick={() => setOpen(false)}
        >
          Send a Letter
        </Link>
      </nav>
      <button
        className={`nav-burger${open ? " open" : ""}`}
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
