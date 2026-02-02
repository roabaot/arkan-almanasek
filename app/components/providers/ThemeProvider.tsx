"use client";

import type { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = PropsWithChildren<{
  /** Storage key used by next-themes */
  storageKey?: string;
  /** Default theme when there is no saved preference */
  defaultTheme?: "light" | "dark" | "system";
}>;

export default function ThemeProvider({
  children,
  storageKey = "theme",
  defaultTheme = "light",
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      storageKey={storageKey}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
