"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteNavItems } from "./site-navigation";

const navLinkClass =
  "rounded-full px-3.5 py-2 text-[.95rem] font-semibold text-[var(--ink-soft)] transition duration-200 hover:bg-[rgba(209,43,58,.08)] hover:text-[var(--red)] body-[.night]:hover:bg-[rgba(255,120,130,.14)] body-[.night]:hover:text-[#ff9aa2] max-[920px]:px-4 max-[920px]:py-[13px] max-[920px]:text-[1.05rem]";
const activeNavLinkClass =
  "bg-[rgba(209,43,58,.1)] text-[var(--red)] body-[.night]:bg-[rgba(255,120,130,.16)] body-[.night]:text-[#ff9aa2]";

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
          Jaden <em className="not-italic text-[var(--red)]">Santa</em> Huang
        </span>
      </Link>
      <nav
        className={`flex items-center gap-1.5 max-[920px]:fixed max-[920px]:inset-y-0 max-[920px]:right-0 max-[920px]:z-[55] max-[920px]:w-[min(280px,80vw)] max-[920px]:flex-col max-[920px]:items-stretch max-[920px]:justify-start max-[920px]:gap-2 max-[920px]:bg-[var(--cream)] max-[920px]:px-[22px] max-[920px]:pb-[22px] max-[920px]:pt-[90px] max-[920px]:shadow-[-10px_0_40px_rgba(0,0,0,.18)] max-[920px]:transition-transform max-[920px]:duration-300 ${
          open ? "max-[920px]:translate-x-0" : "max-[920px]:translate-x-[110%]"
        }`}
        aria-label="Primary navigation"
      >
        {siteNavItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${navLinkClass} ${active ? activeNavLinkClass : ""}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className="rounded-full bg-[var(--pine)] px-3.5 py-2 text-[.95rem] font-semibold text-white shadow-[var(--shadow-sm)] transition duration-200 hover:-translate-y-px hover:bg-[var(--pine-dark)] max-[920px]:px-4 max-[920px]:py-[13px] max-[920px]:text-[1.05rem]"
          onClick={() => setOpen(false)}
        >
          Send a Letter
        </Link>
      </nav>
      <button
        className="flex cursor-pointer flex-col gap-[5px] rounded-full border-0 bg-[var(--surface)] p-2 shadow-[var(--shadow-sm)] min-[921px]:hidden max-[920px]:fixed max-[920px]:left-[18px] max-[920px]:top-[64px] max-[920px]:z-[80]"
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
