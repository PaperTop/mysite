"use client";

import { useEffect, useRef, useState } from "react";

const santaSounds = [
  "/audio/hohoho1.mp3",
  "/audio/hohoho2.mp3",
  "/audio/hohoho3.mp3",
  "/audio/hohoho4.mp3",
  "/audio/hohoho5.mp3",
  "/audio/hohoho6.mp3",
] as const;

export default function SantaSoundButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }

      audioRef.current?.pause();
    };
  }, []);

  function playRandomSound() {
    const sound = santaSounds[Math.floor(Math.random() * santaSounds.length)];

    audioRef.current?.pause();
    audioRef.current = new Audio(sound);
    audioRef.current.volume = 0.85;
    audioRef.current.currentTime = 0;
    void audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });

    setIsPlaying(true);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setIsPlaying(false);
    }, 420);
  }

  return (
    <button
      aria-label="Play a random Santa sound"
      className={`inline-flex translate-y-[-0.03em] items-center rounded-[0.22em] border-0 bg-transparent px-[0.04em] font-[inherit] font-bold leading-none text-[var(--red)] underline decoration-[var(--gold)] decoration-[0.08em] underline-offset-[0.1em] transition duration-200 hover:translate-y-[-0.09em] hover:rotate-[-1deg] hover:text-[var(--red-dark)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[rgba(230,178,74,.34)] body-[.night]:text-[#ff9aa2] motion-reduce:transition-none ${
        isPlaying ? "scale-105 rotate-[-2deg]" : ""
      }`}
      onClick={playRandomSound}
      title="Play a random ho ho ho"
      type="button"
    >
      Santa
    </button>
  );
}
