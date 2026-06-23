"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { siteNavItems } from "./site-navigation";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  return (
    <div className="min-[1041px]:hidden">
      <button
        className={`relative z-[56] flex cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-2 ${
          open
            ? "[&>span:nth-child(1)]:translate-y-2 [&>span:nth-child(1)]:rotate-45 [&>span:nth-child(2)]:opacity-0 [&>span:nth-child(3)]:-translate-y-2 [&>span:nth-child(3)]:-rotate-45"
            : ""
        }`}
        type="button"
        aria-controls={menuId}
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="h-[3px] w-[26px] rounded bg-ink transition body-[.night]:bg-white" />
        <span className="h-[3px] w-[26px] rounded bg-ink transition body-[.night]:bg-white" />
        <span className="h-[3px] w-[26px] rounded bg-ink transition body-[.night]:bg-white" />
      </button>

      <nav
        id={menuId}
        className={`fixed inset-y-0 right-0 z-[55] flex w-[min(280px,80vw)] flex-col items-stretch gap-2 bg-cream px-[22px] pt-[90px] shadow-[-10px_0_40px_rgba(0,0,0,.18)] transition-transform duration-300 body-[.night]:bg-[#0d1326] ${
          open ? "translate-x-0" : "translate-x-[110%]"
        }`}
        aria-label="Mobile navigation"
      >
        {siteNavItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-[13px] text-[1.05rem] font-semibold transition ${
                active
                  ? "bg-christmas-red/10 text-christmas-red body-[.night]:bg-[#ff788229] body-[.night]:text-[#ff9aa2]"
                  : "text-ink-soft hover:bg-christmas-red/10 hover:text-christmas-red body-[.night]:hover:bg-[#ff788224] body-[.night]:hover:text-[#ff9aa2] night-muted"
              }`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href="/contact"
          className="rounded-full bg-pine px-4 py-[13px] text-[1.05rem] font-semibold text-white shadow-[0_8px_20px_-10px_rgba(122,19,31,.4)] transition hover:-translate-y-0.5 hover:bg-pine-dark"
          onClick={() => setOpen(false)}
        >
          Send a Letter
        </Link>
      </nav>
    </div>
  );
}
