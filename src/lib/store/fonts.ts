import { Fraunces, Fredoka, Manrope } from "next/font/google";

/**
 * Store fonts:
 * Fraunces: Original editorial serif for all standard digital products.
 * Manrope: Clean modern sans-serif for body typography across all products.
 * Fredoka: Playful rounded display font scoped specifically for the kids learning product page.
 */
export const storeDisplayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-store-display",
  display: "swap",
});

export const storeSansFont = Manrope({
  subsets: ["latin"],
  variable: "--font-store-sans",
  display: "swap",
});

export const kidsDisplayFont = Fredoka({
  subsets: ["latin"],
  variable: "--font-kids-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const storeFontVariables = `${storeDisplayFont.variable} ${storeSansFont.variable} ${kidsDisplayFont.variable}`;
