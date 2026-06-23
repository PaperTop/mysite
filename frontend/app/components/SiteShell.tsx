import FloatingActions from "./FloatingActions";
import { AuroraBackground, HolidayLights, SleighFlyBy } from "./HolidayEffects";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SnowCanvas from "./SnowCanvas";
import ThemeProvider from "./ThemeProvider";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <>
        <SnowCanvas />
        <canvas id="bg3d" aria-hidden="true" />
        <AuroraBackground />
        <SleighFlyBy />
        <HolidayLights />
        <SiteHeader />
        <main id="top">{children}</main>
        <SiteFooter />
        <FloatingActions />
        <div className="snowburst" id="snowburst" aria-hidden="true" />
      </>
    </ThemeProvider>
  );
}
