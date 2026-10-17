import { Fredoka, Manrope } from "next/font/google";

/**
 * Store fonts only — primary (headings) + secondary (body).
 * Fredoka: Fun, friendly, rounded kids display font.
 * Manrope: Clean, readable body font.
 */
export const storeDisplayFont = Fredoka({
  subsets: ["latin"],
  variable: "--font-store-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const storeSansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-store-sans",
  display: "swap",
});

export const storeFontVariables = `${storeDisplayFont.variable} ${storeSansFont.variable}`;
