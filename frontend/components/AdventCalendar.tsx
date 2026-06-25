"use client";

import { useState } from "react";
import { revealInClass } from "./ui";

const doors = [
  ["🎓", "CS @ North Pole U, class of 2027"],
  ["💾", "First program: a Discord bot at 14"],
  ["🏆", "2× hackathon winner"],
  ["⚡", "200+ commits last month"],
  ["🐧", "Daily driver: Linux"],
  ["🎮", "Building an indie game"],
  ["☕", "247 cups of cocoa this term"],
  ["🤖", "Trained a transformer from scratch"],
  ["🎹", "Plays carols on piano"],
  ["📷", "Film photographer in the snow"],
  ["🌐", "3 human + 5 coding languages"],
  ["⭐", "200★ on an open-source CLI"],
  ["🧩", "300+ LeetCode problems solved"],
  ["🚀", "Dreams of building dev tools"],
  ["🤝", "Great teammate, low ego"],
  ["🎯", "Obsessed with readable code"],
  ["🔭", "Contributes to OSS he loves"],
  ["🍪", "Bakes the team actual cookies"],
  ["📚", "Reading: Data-Intensive Apps"],
  ["🎤", "Gave a talk at the dev club"],
  ["💡", "40+ project ideas in a folder"],
  ["🧊", "Cool under pressure"],
  ["📬", "Open to collaboration"],
  ["🎁", "Available Summer 2026 — let's build!"],
];

export default function AdventCalendar() {
  const [opened, setOpened] = useState<Set<number>>(new Set());

  function toggleDoor(index: number) {
    setOpened((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <>
      <div className={`${revealInClass} grid grid-cols-6 gap-3.5 max-[860px]:grid-cols-4 max-[560px]:grid-cols-3`} id="adventGrid">
        {doors.map(([emoji, text], index) => {
          const isOpen = opened.has(index);
          const special = index === 23;
          const frontBackground =
            special
              ? "bg-[linear-gradient(150deg,#e6b24a,#b9851f)]"
              : index % 3 === 0
                ? "bg-[linear-gradient(150deg,#d9384a,#a31e2c)]"
                : index % 3 === 1
                  ? "bg-[linear-gradient(150deg,#1f8a57,#125c3a)]"
                  : "bg-[linear-gradient(150deg,#e6b24a,#c8932b)]";

          return (
            <button
              key={text}
              className="relative aspect-square cursor-pointer rounded-[14px] border-0 bg-transparent p-0 font-[inherit] [perspective:700px]"
              type="button"
              aria-label={`Door ${index + 1}`}
              onClick={() => toggleDoor(index)}
            >
              <span
                className={`absolute inset-0 [transform-style:preserve-3d] transition-transform duration-[550ms] ease-[cubic-bezier(.4,.9,.3,1)] ${
                  isOpen ? "[transform:rotateY(-118deg)]" : ""
                }`}
              >
                <span
                  className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-[14px] [backface-visibility:hidden] [transform-origin:left_center] ${frontBackground} shadow-[var(--shadow-sm),inset_0_0_0_2px_rgba(255,255,255,.25)] ${
                    isOpen ? "shadow-[-8px_6px_18px_-6px_rgba(0,0,0,.5)]" : ""
                  }`}
                >
                  <span className="font-display text-[clamp(1.1rem,2.4vw,1.7rem)] font-bold text-white [text-shadow:0_2px_4px_rgba(0,0,0,.3)]">{index + 1}</span>
                  <span className="pointer-events-none absolute inset-1.5 rounded-[9px] border-2 border-dashed border-white/35" />
                </span>
                <span
                  className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-[14px] p-2 text-center [backface-visibility:hidden] [transform:rotateY(0deg)] ${
                    special
                      ? "bg-[linear-gradient(150deg,#fff,#fff2d6)] shadow-[inset_0_0_0_2px_var(--gold),0_0_0_3px_var(--gold),var(--shadow)]"
                      : "bg-[var(--surface)] shadow-[inset_0_0_0_2px_var(--gold-soft),var(--shadow-sm)]"
                  }`}
                >
                  <span>
                    <span className="mb-0.5 block text-[clamp(1.3rem,3vw,2rem)] leading-none">{emoji}</span>
                    <span className={`block text-[clamp(.5rem,1.2vw,.72rem)] font-semibold leading-[1.2] ${special ? "font-bold text-[var(--red-dark)]" : "text-[var(--ink)]"}`}>
                      {text}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-[22px] text-center font-mono text-[.9rem] font-semibold text-[var(--ink-soft)]" id="adventProgress">
        {opened.size} / 24 doors opened{opened.size === 24 ? "  you opened them all!" : ""}
      </p>
    </>
  );
}
