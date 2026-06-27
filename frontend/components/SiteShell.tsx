import FloatingActions from "./FloatingActions";
import { AuroraBackground, HolidayLights } from "./HolidayEffects";
import SiteHeader from "./SiteHeader";
import SnowCanvas from "./SnowCanvas";
import ThemeProvider from "./ThemeProvider";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <>
        <SnowCanvas />
        <canvas className="pointer-events-none fixed inset-0 z-0 opacity-50 transition-opacity duration-[600ms] body-[.night]:opacity-[.72]" id="bg3d" aria-hidden="true" />
        <AuroraBackground />
        <HolidayLights />
        <SiteHeader />
        <main id="top">{children}</main>
        <FloatingActions />
        <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" id="snowburst" aria-hidden="true" />
      </>
    </ThemeProvider>
  );
}
