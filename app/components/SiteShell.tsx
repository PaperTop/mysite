"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { drawScene } from "./canvas-scene";

const pages = [
  { href: "/", label: "Me" },
  { href: "/goods", label: "Goods" },
  { href: "/brain", label: "Brain" },
  { href: "/talk", label: "Talk?" },
];

const snowflakes = Array.from({ length: 22 }, (_, index) => ({
  delay: `${(index % 8) * 0.72}s`,
  duration: `${5 + (index % 6) * 0.86}s`,
  glyph: ["❄", "❅", "❆", "✦"][index % 4],
  left: `${(index * 37) % 100}%`,
  opacity: 0.32 + (index % 5) * 0.1,
  size: `${8 + (index % 7) * 1.7}px`,
}));

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    function resize() {
      if (!canvas || !context) {
        return;
      }

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawScene(context, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <main className="min-h-screen min-h-[100svh] bg-gradient-to-br from-[#fbf7ef] to-[#e7dccb]">
      <div className="relative w-full min-h-screen min-h-[100svh] overflow-hidden border-0 rounded-none">
        <canvas
          aria-hidden="true"
          className="fixed inset-0 z-0 w-screen h-screen"
          ref={canvasRef}
        />

        {snowflakes.map((flake, index) => (
          <span
            aria-hidden="true"
            className="fixed top-[-20px] text-[rgba(255,255,255,0.7)] animate-fall pointer-events-none select-none z-[1]"
            key={index}
            style={{
              animationDelay: flake.delay,
              animationDuration: flake.duration,
              fontSize: flake.size,
              left: flake.left,
              opacity: flake.opacity,
            }}
          >
            {flake.glyph}
          </span>
        ))}

        <div className="fixed top-[18%] left-0 w-full h-[100px] z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="inline-block text-[clamp(24px,3vw,36px)] drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] animate-fly-across whitespace-nowrap">🦌🦌🛷🎅✨</span>
        </div>

        <div className="relative z-[1] min-h-[inherit] bg-transparent">
          <nav className="sticky top-0 z-10 min-h-[clamp(60px,8vh,80px)] px-[clamp(22px,6vw,72px)] border-b border-tan/25 bg-cream/92 backdrop-blur-[18px] backdrop-saturate-[1.4] flex items-center justify-center animate-nav-fade-in max-[720px]:px-[18px] max-[430px]:px-[14px] max-[430px]:py-[10px]" aria-label="Primary navigation">
            <div className="flex items-center gap-[clamp(24px,3.5vw,40px)] w-full max-w-[1040px] mx-auto max-[720px]:gap-[10px] max-[430px]:flex-wrap max-[430px]:gap-[6px]">
              <span className="text-charcoal text-[clamp(17px,1.7vw,22px)] font-semibold whitespace-nowrap tracking-[-0.02em] transition-colors duration-300 hover:text-red max-[430px]:text-[15px]">Jaden 🎁</span>
              <div className="flex gap-[clamp(4px,0.8vw,6px)] ml-auto max-[720px]:gap-[2px] max-[430px]:order-3 max-[430px]:w-full max-[430px]:gap-[2px]">
                {pages.map((page) => (
                  <Link
                    className={`cursor-pointer border-0 bg-transparent text-[clamp(14px,1.35vw,16px)] px-[14px] py-[6px] rounded-lg transition-colors duration-250 relative hover:text-charcoal hover:bg-tan/15 max-[720px]:text-[12px] max-[720px]:px-[10px] max-[720px]:py-[5px] max-[430px]:text-[11px] max-[430px]:px-[8px] max-[430px]:py-[4px] ${
                      pathname === page.href
                        ? "text-red bg-red/10 font-semibold"
                        : "text-charcoal font-medium"
                    }`}
                    href={page.href}
                    key={page.href}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
              <a className="ml-[clamp(8px,1.5vw,16px)] px-[18px] py-[8px] border-none rounded-lg bg-red text-cream cursor-pointer text-[clamp(13px,1.2vw,15px)] font-medium tracking-[0.01em] transition-[transform,box-shadow,background-color] duration-200 shadow-[0_1px_3px_rgba(184,84,80,0.25)] hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(184,84,80,0.35)] hover:bg-[#c45c58] max-[720px]:px-[12px] max-[720px]:py-[6px] max-[430px]:ml-auto max-[430px]:px-[10px] max-[430px]:py-[5px] max-[430px]:text-[12px]" href="#resume">
                Resume
              </a>
            </div>
          </nav>

          {children}
        </div>
      </div>
    </main>
  );
}
