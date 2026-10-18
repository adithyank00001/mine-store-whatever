import type { Metadata } from "next";

import { ShopHomePage } from "@/components/store/shop-home-page";
import { storeFontVariables } from "@/lib/store/fonts";

import "./store/store.css";

export const metadata: Metadata = {
  title: {
    absolute: "Your Kid's Growth Starts From Here | ByePanda",
  },
  description:
    "Explore 15,000+ fun printable kids learning worksheets & activities for Ages 2–8. Reduce screen time with engaging coloring, phonics, math, and brain puzzles. Instant digital download.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Your Kid's Growth Starts From Here | ByePanda",
    description:
      "15,000+ printable kids learning worksheets & fun activities for Ages 2–8. Instant download.",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792260874/15_000_Printable_Worksheet_Fun.png",
        width: 1200,
        height: 630,
        alt: "15,000+ Printable Kids Learning Bundle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Kid's Growth Starts From Here | ByePanda",
    description:
      "15,000+ printable kids learning worksheets for Ages 2–8. Less screen time, smarter child. Instant download.",
    images: [
      "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792260874/15_000_Printable_Worksheet_Fun.png",
    ],
  },
};

export default function HomePage() {
  return (
    <div className={`${storeFontVariables} min-h-full`}>
      <ShopHomePage />
    </div>
  );
}
