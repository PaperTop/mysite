const lightCount = 32;

export function AuroraBackground() {
  return <div className="aurora" aria-hidden="true" />;
}

export function SleighFlyBy() {
  return (
    <div className="sleigh" id="sleigh" aria-hidden="true">
      <span className="sleigh-trail" />
      <span className="sleigh-emoji">🛷</span>
    </div>
  );
}

export function HolidayLights() {
  return (
    <div className="lights" aria-hidden="true">
      {Array.from({ length: lightCount }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
