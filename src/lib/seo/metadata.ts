import type { Metadata } from "next";

export const landingPageTitle =
  "15,000+ Printable Kids Learning Worksheets & Activity Bundles | ByePanda";

export const landingPageDescription =
  "15,000+ fun printable kids learning worksheets & activities for Ages 2–8. Reduce screen time with coloring, phonics, math, and daily brain puzzles. Instant digital download.";

export const landingPageMetadata: Metadata = {
  title: {
    absolute: landingPageTitle,
  },
  description: landingPageDescription,
  openGraph: {
    title: landingPageTitle,
    description: landingPageDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: landingPageTitle,
    description: landingPageDescription,
  },
};
