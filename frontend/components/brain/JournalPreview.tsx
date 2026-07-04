"use client";

import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { revealInClass, tiltClass, tiltGlareClass } from "../ui";

const entries = [
  {
    date: "July 3, 2026",
    eyebrow: "Today",
    mood: "Steady",
    title: "Dashboard shape is getting clearer",
    summary: "The brain page is starting to feel less like a novelty dashboard and more like a daily operating log.",
    body: [
      "The main thing I want from this page is quick context. The numbers should explain what my body, work, and side projects are doing without forcing me to reconstruct the day from five different apps.",
      "The journal should hold the story behind the signals. A high heart rate or a bad poker result means more when there is a short note attached to the day.",
      "Next pass: make the entries real data, keep the interface fast, and avoid turning the page into a complicated writing app.",
    ],
    tags: ["brain", "dashboard", "notes"],
  },
  {
    date: "July 2, 2026",
    eyebrow: "Yesterday",
    mood: "Focused",
    title: "Good build momentum",
    summary: "Most of the day went into tightening the frontend and thinking through what should become real data later.",
    body: [
      "I kept coming back to the same constraint: the dashboard should show enough detail to be useful, but not so much that I stop checking it.",
      "The health metrics are the anchor. Poker and GitHub make the page personal, but heart rate, HRV, and sleep are what tell me whether the rest is sustainable.",
      "The writing layer should stay lightweight. One useful paragraph beats a giant journal system I never maintain.",
    ],
    tags: ["frontend", "health", "focus"],
  },
  {
    date: "July 1, 2026",
    eyebrow: "Previous",
    mood: "Tired",
    title: "Late session tradeoffs",
    summary: "The numbers looked productive, but the notes explain why the recovery score matters.",
    body: [
      "I got a lot done late, but the next morning felt slower. This is exactly why a journal belongs next to the metrics instead of living in a separate place.",
      "A good dashboard should show both the win and the cost. If the graph goes up but the note says I felt cooked, that is useful context.",
      "I want the daily archive to make those patterns obvious over time.",
    ],
    tags: ["recovery", "sleep", "reflection"],
  },
];

export function JournalPreview() {
  const [selectedEntryIndex, setSelectedEntryIndex] = useState<number | null>(null);
  const selectedEntry = selectedEntryIndex === null ? null : entries[selectedEntryIndex];

  function openJournal() {
    setSelectedEntryIndex(0);
  }

  function handleJournalKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openJournal();
  }

  useEffect(() => {
    if (selectedEntryIndex === null) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedEntryIndex(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedEntryIndex]);

  return (
    <section className="relative z-[3] mx-auto w-full max-w-[1180px] px-[18px] pb-[60px] sm:px-8 md:pb-20 lg:px-10 lg:pb-[100px]" id="journal">
      <div
        aria-label="Open journal"
        className={`${revealInClass} ${tiltClass} group relative cursor-pointer overflow-hidden rounded-[22px] bg-[var(--surface)] p-6 text-left shadow-[var(--shadow-sm)] outline-none transition-[transform,box-shadow] hover:-translate-y-1 hover:shadow-[var(--shadow)] focus-visible:ring-4 focus-visible:ring-[rgba(42,111,219,.22)] lg:p-[38px]`}
        onClick={openJournal}
        onKeyDown={handleJournalKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="mb-7">
          <div>
            <p className="mb-3 font-mono text-[.84rem] font-semibold text-[var(--ink-soft)]">Daily context</p>
            <h2 className="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[.95] text-[var(--ink)]">Journal</h2>
          </div>
        </div>
        <p className="max-w-[780px] text-[1.02rem] leading-8 text-[var(--ink-soft)]">
          The less numerical side of the Brain page: short daily notes, context behind the metrics, and the running story of what I am building.
        </p>
        <div className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3">
          {entries.map((entry) => (
            <div
              className="rounded-[16px] bg-[rgba(42,111,219,.08)] px-4 py-4 transition-[background] group-hover:bg-[rgba(42,111,219,.12)]"
              key={entry.title}
            >
              <p className="mb-2 font-mono text-[.72rem] font-semibold uppercase text-[#2a6fdb]">{entry.eyebrow}</p>
              <h3 className="mb-2 font-display text-[1.05rem] leading-[1.05] text-[var(--ink)]">{entry.title}</h3>
              <p className="text-[.92rem] leading-6 text-[var(--ink-soft)]">{entry.summary}</p>
            </div>
          ))}
        </div>
        <div className={tiltGlareClass} />
      </div>

      {selectedEntry && typeof document !== "undefined" ? createPortal(
        <div className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[rgba(21,12,17,.38)] px-4 py-6 backdrop-blur-sm" onClick={() => setSelectedEntryIndex(null)}>
          <section
            aria-label="Journal detail"
            aria-modal="true"
            className="grid h-[min(760px,calc(100dvh-48px))] w-full max-w-[1040px] grid-rows-[auto_minmax(0,1fr)] gap-5 overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-5 text-[var(--ink)] shadow-[0_28px_80px_-30px_rgba(21,12,17,.75)] md:grid-cols-[260px_minmax(0,1fr)] md:grid-rows-1 md:p-7"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <aside className="min-h-0 rounded-[18px] bg-[var(--cream)] p-3 md:overflow-y-auto">
              <p className="mb-3 px-2 font-mono text-[.76rem] font-semibold uppercase text-[var(--ink-soft)]">Entries</p>
              <div className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
                {entries.map((entry, index) => (
                  <button
                    aria-pressed={index === selectedEntryIndex}
                    className="min-w-[180px] rounded-[14px] px-3 py-3 text-left transition-[background,color] aria-pressed:bg-[var(--surface)] aria-pressed:shadow-[var(--shadow-sm)] md:min-w-0"
                    key={entry.title}
                    onClick={() => setSelectedEntryIndex(index)}
                    type="button"
                  >
                    <p className="font-mono text-[.72rem] font-semibold text-[#2a6fdb]">{entry.eyebrow}</p>
                    <p className="mt-1 font-display text-[.98rem] leading-[1.05] text-[var(--ink)]">{entry.title}</p>
                    <p className="mt-1 font-mono text-[.7rem] text-[var(--ink-soft)]">{entry.date}</p>
                  </button>
                ))}
              </div>
            </aside>

            <article className="min-h-0 overflow-y-auto pr-1">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div className="min-w-0">
                  <p className="mb-2 font-mono text-[.78rem] font-semibold uppercase text-[#2a6fdb]">{selectedEntry.date}</p>
                  <h3 className="font-display text-[clamp(2rem,5vw,3.4rem)] leading-[.95]">{selectedEntry.title}</h3>
                  <p className="mt-3 max-w-[680px] text-[1rem] leading-7 text-[var(--ink-soft)]">{selectedEntry.summary}</p>
                </div>
                <button
                  aria-label="Close journal"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--cream)] font-display text-[1.2rem] font-bold text-[var(--ink)] transition-[background,transform] hover:-translate-y-0.5 hover:bg-[rgba(42,111,219,.12)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(42,111,219,.22)]"
                  onClick={() => setSelectedEntryIndex(null)}
                  type="button"
                >
                  x
                </button>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-[rgba(42,111,219,.1)] px-3 py-1.5 font-display text-[.8rem] font-semibold text-[#2a6fdb]">{selectedEntry.mood}</span>
                {selectedEntry.tags.map((tag) => (
                  <span className="rounded-full bg-[var(--cream)] px-3 py-1.5 font-display text-[.8rem] font-semibold text-[var(--ink-soft)]" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4 rounded-[20px] bg-[rgba(42,111,219,.06)] p-5">
                {selectedEntry.body.map((paragraph) => (
                  <p className="text-[1rem] leading-8 text-[var(--ink)]" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </section>
        </div>,
        document.body,
      ) : null}
    </section>
  );
}
