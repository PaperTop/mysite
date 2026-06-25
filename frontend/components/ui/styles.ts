export const buttonBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-0 px-[26px] py-3.5 font-display text-base font-bold shadow-[var(--shadow-sm)] transition-[transform,box-shadow,background] duration-[180ms] hover:-translate-y-[3px]";

export const buttonRedClass =
  `${buttonBase} bg-[var(--red)] text-white hover:bg-[var(--red-dark)] hover:shadow-[var(--shadow)]`;

export const buttonGreenClass =
  `${buttonBase} bg-[var(--pine)] text-white hover:bg-[var(--pine-dark)]`;

export const buttonGhostClass =
  `${buttonBase} border-2 border-[var(--red)] bg-[var(--surface)] text-[var(--red)] hover:bg-[var(--red)] hover:text-white body-[.night]:border-[#ff9aa2] body-[.night]:text-[#ff9aa2] body-[.night]:hover:bg-[#ff9aa2] body-[.night]:hover:text-[#0d1326]`;

export const sectionClass =
  "relative z-[3] mx-auto w-full max-w-[1180px] px-[18px] py-[60px] sm:px-8 md:py-20 lg:px-10 lg:py-[100px]";

export const revealInClass = "opacity-100 transform-none motion-reduce:transition-none";

export const tiltClass =
  "group [transform-style:preserve-3d] transition-[transform] duration-[250ms] ease-[cubic-bezier(.2,.7,.2,1)] will-change-transform";

export const tiltGlareClass =
  "pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,.4),transparent_45%)] opacity-0 mix-blend-soft-light transition-opacity duration-[250ms] group-hover:opacity-100";

export const eyebrowClass =
  "mb-4 inline-block rounded-full bg-[rgba(209,43,58,.1)] px-4 py-1.5 font-display text-[.9rem] font-semibold text-[var(--red)] body-[.night]:bg-[rgba(255,120,130,.16)] body-[.night]:text-[#ff9aa2]";
