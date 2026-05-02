"use client";

import { useMemo, useState } from "react";

const switches = [
  { label: "Sun", toggles: [0, 1] },
  { label: "Moon", toggles: [1, 2] },
  { label: "Star", toggles: [0, 2] },
];

export default function Home() {
  const [lights, setLights] = useState([false, true, false]);

  const solved = lights.every(Boolean);
  const status = useMemo(
    () => (solved ? "Unlocked. Nice." : "Turn every light on."),
    [solved],
  );

  function pressSwitch(index: number) {
    setLights((currentLights) =>
      currentLights.map((light, lightIndex) =>
        switches[index].toggles.includes(lightIndex) ? !light : light,
      ),
    );
  }

  function resetPuzzle() {
    setLights([false, true, false]);
  }

  return (
    <main className="min-h-screen bg-yellow-100 p-6 text-zinc-950 sm:p-8">
      <section className="mx-auto max-w-xl border-4 border-zinc-950 bg-white p-6 shadow-[8px_8px_0_#18181b]">
        <p className="font-mono text-sm uppercase">Jaden&apos;s Site</p>
        <h1 className="mt-3 text-5xl font-black">Hi, I&apos;m Jaden!</h1>
        <p className="mt-4 text-lg">
          This is a very temporary personal website, so expect new changes over
          time. Play this tiny puzzle for the time being.
        </p>

        <div className="mt-8 border-4 border-zinc-950 bg-cyan-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black">Light Lock</h2>
            <p className="font-mono text-sm font-bold uppercase">{status}</p>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3" aria-label="Light row">
            {lights.map((isLit, index) => (
              <div
                className={`aspect-square border-4 border-zinc-950 ${
                  isLit ? "bg-lime-300" : "bg-zinc-200"
                }`}
                key={index}
              />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {switches.map((button, index) => (
              <button
                className="border-4 border-zinc-950 bg-white px-2 py-3 font-black shadow-[4px_4px_0_#18181b] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#18181b] active:translate-x-1 active:translate-y-1 active:shadow-none"
                key={button.label}
                onClick={() => pressSwitch(index)}
                type="button"
              >
                {button.label}
              </button>
            ))}
          </div>

          <button
            className="mt-4 bg-zinc-950 px-4 py-2 font-bold text-white"
            onClick={resetPuzzle}
            type="button"
          >
            Reset
          </button>
        </div>

        <a
          className="mt-8 inline-block bg-zinc-950 px-5 py-3 font-bold text-white"
          href="mailto:hello@example.com"
        >
          Say hi
        </a>
      </section>
    </main>
  );
}
