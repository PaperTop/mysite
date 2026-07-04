import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import SiteShell from "../components/SiteShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jaden Huang - Personal Portfolio",
  description: "Artificial Intelligence student at UC San Diego building a personal, human portfolio.",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  );
}
