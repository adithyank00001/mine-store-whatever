import type { Metadata } from "next";

import { ShopHomePage } from "@/components/store/shop-home-page";
import { storeFontVariables } from "@/lib/store/fonts";

import "./store/store.css";

export const metadata: Metadata = {
  title: {
    absolute: "ByePanda Store | Premium Digital Products & Bundles",
  },
  description:
    "Welcome to ByePanda Store. Discover premium digital products, creative bundles, and resources with instant digital delivery, lifetime access, and secure checkout.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "ByePanda Store | Premium Digital Products & Bundles",
    description:
      "Welcome to ByePanda Store. Discover premium digital products, creative bundles, and resources with instant digital delivery, lifetime access, and secure checkout.",
    type: "website",
    images: [
      {
        url: "/byepanda-logo.png",
        width: 1024,
        height: 190,
        alt: "ByePanda Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ByePanda Store | Premium Digital Products & Bundles",
    description:
      "Welcome to ByePanda Store. Discover premium digital products, creative bundles, and resources with instant digital delivery, lifetime access, and secure checkout.",
    images: ["/byepanda-logo.png"],
  },
};

export default function HomePage() {
  return (
    <div className={`${storeFontVariables} min-h-full`}>
      <ShopHomePage />
    </div>
  );
}
