import { Fraunces, Manrope } from "next/font/google";

/**
 * Store fonts:
 * Fraunces: Original editorial serif for all standard digital products.
 * Manrope: Clean modern sans-serif for body typography across all products.
 * Fredoka: Scoped rounded display font for the kids bundle, loaded via Google Fonts in store.css.
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

export const kidsDisplayFont = {
  variable: "",
  className: "",
};

export const storeFontVariables = `${storeDisplayFont.variable} ${storeSansFont.variable}`;
