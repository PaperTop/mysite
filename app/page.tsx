"use client";

import { useCallback, useState } from "react";
import Link from "next/link";

export default function MePage() {
  const [hohos, setHohos] = useState<number[]>([]);

  const playHoho = useCallback(() => {
    const randomNum = Math.floor(Math.random() * 6) + 1;
    const audio = new Audio(`/audio/hohoho${randomNum}.mp3`);
    audio.play().catch((err) => console.error("Audio playback failed:", err));
  }, []);

  return (
    <section className="min-h-[calc(100vh-clamp(68px,9vh,96px))] min-h-[calc(100svh-clamp(68px,9vh,96px))] p-[clamp(24px,4vw,56px)] max-[720px]:px-[18px] max-[720px]:pt-[28px] max-[720px]:pb-[40px] max-[430px]:px-[12px] max-[430px]:pt-[46px] max-[430px]:pb-[34px] grid items-center">
      <div className="w-[min(100%,1040px)] min-w-0 p-[clamp(24px,4vw,44px)] border-[0.5px] border-tan/40 rounded-[clamp(16px,2vw,26px)] bg-cream/85 backdrop-blur-[10px] max-[720px]:w-full max-[720px]:min-h-auto max-[430px]:p-[24px] max-[430px]:w-[calc(100vw-24px)] max-[430px]:max-w-[calc(100vw-24px)]">
        <span className="inline-block mb-[16px] px-[14px] py-[6px] rounded-[20px] bg-pine/12 text-pine text-[clamp(12px,1.3vw,16px)] font-medium">AI @ UCSD</span>
        <h1 className="mt-0 mx-0 mb-[18px] text-charcoal text-[clamp(38px,5vw,64px)] font-medium leading-[1.12] tracking-0 relative max-[720px]:text-[clamp(34px,10vw,52px)] max-[430px]:text-[clamp(34px,11vw,44px)] max-[430px]:leading-[1.16]">
          Hey, I&apos;m Jaden{" "}
          <span
            className="bg-gradient-to-br from-[#c0392b] via-[#e74c3c] via-[#f39c12] via-[#e74c3c] to-[#c0392b] bg-[length:300%_300%] bg-clip-text text-transparent animate-santa-shimmer font-semibold cursor-pointer transition-transform duration-200 inline-block hover:scale-[1.08] active:scale-[0.95]"
            onClick={() => { setHohos((prev) => [...prev, Date.now()]); playHoho(); }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setHohos((prev) => [...prev, Date.now()]); playHoho(); } }}
          >
            Santa
          </span>{" "}
          Huang.
          {hohos.map((id) => (
            <span
              key={id}
              className="absolute left-1/2 -translate-x-1/2 text-[clamp(18px,2.5vw,28px)] font-semibold text-red bg-none pointer-events-none whitespace-nowrap animate-hoho-float"
              onAnimationEnd={() => setHohos((prev) => prev.filter((h) => h !== id))}
            >
              Ho Ho Ho! 🎅
            </span>
          ))}
          <br />
          I learn things.
        </h1>
        <p className="max-w-[720px] mt-0 mx-0 mb-[28px] text-stone text-[clamp(16px,1.5vw,21px)] leading-[1.65] max-[430px]:max-w-full max-[430px]:text-[15px]">
          I built this site not only as a portfolio, but also as a place to share my thoughts and ideas. I wanted to show what I have accomplished, but I also wanted to make something more personal. I wanted whoever comes across this site to really get to know who I am as a person, the values I hold, and what I&apos;m working on. As a result, I present knowJaden.dev.
        </p>
        <div className="flex gap-[10px] flex-wrap max-[430px]:flex-col">
          <Link
            className="inline-flex items-center justify-center min-h-[44px] px-[22px] py-[10px] rounded-lg cursor-pointer text-[clamp(14px,1.25vw,17px)] font-medium border-none bg-red text-cream max-[430px]:w-full transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(184,84,80,0.35)] hover:bg-[#c45c58] active:translate-y-0 active:shadow-md"
            href="/goods"
          >
            See my work
          </Link>
          <Link
            className="inline-flex items-center justify-center min-h-[44px] px-[22px] py-[10px] rounded-lg cursor-pointer text-[clamp(14px,1.25vw,17px)] font-medium border-[1.5px] border-pine bg-transparent text-pine max-[430px]:w-full transition-[transform,box-shadow,background-color,color] duration-200 hover:-translate-y-[1px] hover:bg-pine hover:text-cream hover:shadow-[0_4px_12px_rgba(61,90,71,0.25)] active:translate-y-0 active:shadow-md"
            href="/talk"
          >
            Let&apos;s talk
          </Link>
        </div>
      </div>
    </section>
  );
}
