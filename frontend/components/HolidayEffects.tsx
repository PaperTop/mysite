const lightCount = 32;

export function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[-2] h-[60vh] animate-aurora bg-[radial-gradient(60%_80%_at_25%_0%,rgba(80,230,180,.22),transparent_60%),radial-gradient(60%_80%_at_75%_0%,rgba(120,120,255,.22),transparent_60%),radial-gradient(50%_70%_at_50%_0%,rgba(230,120,200,.16),transparent_60%)] opacity-0 blur-lg transition-opacity duration-[800ms] body-[.night]:opacity-100 motion-reduce:animate-none"
      aria-hidden="true"
    />
  );
}

export function HolidayLights() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[90] flex h-[34px] justify-around" aria-hidden="true">
      {Array.from({ length: lightCount }).map((_, index) => {
        const lightColor =
          index % 4 === 0
            ? "bg-[#ff5a5f] text-[#ff5a5f]"
            : index % 4 === 1
              ? "bg-[#ffd166] text-[#ffd166] [animation-delay:.4s]"
              : index % 4 === 2
                ? "bg-[#06d6a0] text-[#06d6a0] [animation-delay:.8s]"
                : "bg-[#4cc9f0] text-[#4cc9f0] [animation-delay:1.2s]";

        return (
          <span
            className={`relative mt-3.5 h-[11px] w-[11px] animate-twinkle rounded-full shadow-[0_0_14px_currentColor,0_0_30px_currentColor,0_8px_18px_currentColor] before:absolute before:-top-[9px] before:left-[3px] before:h-[9px] before:w-[5px] before:rounded-sm before:bg-[#3a5a40] before:content-[''] after:absolute after:left-1/2 after:top-1/2 after:h-9 after:w-9 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-current after:opacity-35 after:blur-md after:content-[''] body-[.night]:brightness-125 body-[.night]:saturate-[1.2] motion-reduce:animate-none ${
              index >= 21 ? "max-[560px]:hidden" : ""
            } ${lightColor}`}
            key={index}
          />
        );
      })}
    </div>
  );
}
