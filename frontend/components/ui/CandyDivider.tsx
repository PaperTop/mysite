export function CandyDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`relative z-[3] h-[18px] animate-barber [background:var(--stripe)] bg-[length:62px_62px] shadow-[inset_0_3px_6px_rgba(0,0,0,.12),inset_0_-3px_6px_rgba(0,0,0,.12)] motion-reduce:animate-none ${
        flip ? "[animation-direction:reverse]" : ""
      }`}
      aria-hidden="true"
    />
  );
}
