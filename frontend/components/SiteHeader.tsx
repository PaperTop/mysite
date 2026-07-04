"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavItems } from "./site-navigation";

const navLinkClass =
  "rounded-full px-3.5 py-2 text-[.95rem] font-semibold text-[var(--ink)] transition duration-200 hover:bg-[rgba(209,43,58,.08)] hover:text-[var(--red)] body-[.night]:text-[#eaf0ff] body-[.night]:hover:bg-[rgba(255,120,130,.14)] body-[.night]:hover:text-[#ff9aa2] max-[920px]:px-4 max-[920px]:py-[13px] max-[920px]:text-[1.05rem]";
const activeNavLinkClass =
  "bg-[rgba(209,43,58,.1)] text-[var(--red)] body-[.night]:bg-[rgba(255,176,184,.22)] body-[.night]:text-[#ffc3c8]";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerMode, setDrawerMode] = useState(false);
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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 920px)");

    function syncDrawerMode() {
      setDrawerMode(mediaQuery.matches);

      if (!mediaQuery.matches) {
        setOpen(false);
      }
    }

    syncDrawerMode();
    mediaQuery.addEventListener("change", syncDrawerMode);
    return () => mediaQuery.removeEventListener("change", syncDrawerMode);
  }, []);

  const drawerHidden = drawerMode && !open;

  return (
    <header
      className={`sticky top-0 z-[70] mt-1.5 flex w-screen max-w-full items-center justify-between gap-5 px-[18px] pb-3.5 pt-[18px] transition-[background,box-shadow,padding,backdrop-filter] duration-300 sm:px-8 lg:px-[46px] ${
        scrolled
          ? "bg-[var(--nav-bg)] py-3 shadow-[var(--shadow-sm)] backdrop-blur-[10px]"
          : ""
      }`}
      id="nav"
    >
      <Link href="/" className="flex items-center gap-2.5 text-[1.32rem] font-bold" onClick={() => setOpen(false)}>
        <span className="animate-wiggle text-2xl [transform-origin:bottom_center] motion-reduce:animate-none" aria-hidden="true">🎅</span>
        <span className="font-display leading-[1.05]">
          Jaden <em className="not-italic text-[var(--red)]">Huang</em>
        </span>
      </Link>
      <button
        aria-label="Close menu"
        className={`fixed inset-0 z-[50] bg-[rgba(51,32,42,.28)] backdrop-blur-[2px] transition-opacity duration-300 min-[921px]:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
        type="button"
      />
      <nav
        className={`flex items-center gap-1.5 max-[920px]:fixed max-[920px]:inset-y-0 max-[920px]:right-0 max-[920px]:z-[60] max-[920px]:w-[min(340px,88vw)] max-[920px]:flex-col max-[920px]:items-stretch max-[920px]:justify-start max-[920px]:gap-3 max-[920px]:rounded-l-[28px] max-[920px]:border-l-2 max-[920px]:border-[rgba(209,43,58,.1)] max-[920px]:bg-[var(--cream)] max-[920px]:px-[22px] max-[920px]:pb-[22px] max-[920px]:pt-[112px] max-[920px]:shadow-[-14px_0_46px_rgba(51,32,42,.2)] max-[920px]:transition-transform max-[920px]:duration-300 body-[.night]:max-[920px]:bg-[var(--cream-2)] ${
          open ? "max-[920px]:translate-x-0" : "max-[920px]:translate-x-full"
        }`}
        aria-label="Primary navigation"
        aria-hidden={drawerHidden ? true : undefined}
      >
        {siteNavItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${navLinkClass} ${active ? activeNavLinkClass : ""}`}
              onClick={() => setOpen(false)}
              tabIndex={drawerHidden ? -1 : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/letter"
          className="rounded-full bg-[var(--pine)] px-3.5 py-2 text-[.95rem] font-semibold text-white shadow-[var(--shadow-sm)] transition duration-200 hover:-translate-y-px hover:bg-[var(--pine-dark)] max-[920px]:px-4 max-[920px]:py-[13px] max-[920px]:text-[1.05rem]"
          onClick={() => setOpen(false)}
          tabIndex={drawerHidden ? -1 : undefined}
        >
          Send a Letter
        </Link>
      </nav>
      <button
        className="flex cursor-pointer flex-col gap-[5px] rounded-full border-0 bg-[var(--surface)] p-2 shadow-[var(--shadow-sm)] min-[921px]:hidden max-[920px]:fixed max-[920px]:right-[18px] max-[920px]:top-[64px] max-[920px]:z-[80]"
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={`h-[3px] w-[26px] rounded-[3px] bg-[var(--ink)] transition duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-[3px] w-[26px] rounded-[3px] bg-[var(--ink)] transition duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`h-[3px] w-[26px] rounded-[3px] bg-[var(--ink)] transition duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>
    </header>
  );
}
