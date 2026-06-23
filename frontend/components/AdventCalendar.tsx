"use client";

import { useState } from "react";

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
      <div className="advent-grid reveal in" id="adventGrid">
        {doors.map(([emoji, text], index) => {
          const isOpen = opened.has(index);
          const special = index === 23;

          return (
            <button
              key={text}
              className={`door${isOpen ? " open" : ""}${special ? " special" : ""}`}
              type="button"
              aria-label={`Door ${index + 1}`}
              onClick={() => toggleDoor(index)}
            >
              <span className="door-inner">
                <span className="door-front">
                  <span className="door-num">{index + 1}</span>
                </span>
                <span className="door-back">
                  <span>
                    <span className="db-emoji">{emoji}</span>
                    <span className="db-text">{text}</span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="advent-progress" id="adventProgress">
        {opened.size} / 24 doors opened{opened.size === 24 ? "  you opened them all!" : ""}
      </p>
    </>
  );
}
