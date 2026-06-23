"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type ThemeContextValue = {
  night: boolean;
  setNight: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("jsh-theme") === "night";
    document.body.classList.toggle("night", stored);
    window.requestAnimationFrame(() => setNight(stored));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("night", night);
    window.localStorage.setItem("jsh-theme", night ? "night" : "day");
  }, [night]);

  const value = useMemo(() => ({ night, setNight }), [night]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
