import type { Metadata } from "next";

// Preserved original product page component (kept intact, cleanly disconnected)
// import { KidsProductPage } from "@/components/store/kids/kids-product-page";
import { KidsKoshaPage } from "@/components/store/products/kids-kosha/kids-kosha-page";
/** Live ads product — always /store/product. Content: products/kids-bundle.ts */
import { storeProduct } from "@/lib/store/product-content";

export const metadata: Metadata = {
  title: {
    absolute: "15000+ Kids Worksheet – Kids Kosha",
  },
  description:
    "Printable worksheets for ages 2 to 7: tracing, counting, mazes, colouring, cut and glue. Instant PDF download. Digital product, no physical book is shipped.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "15000+ Kids Worksheet – Kids Kosha",
    description:
      "15,000+ printable worksheets for ages 2 to 7: tracing, counting, mazes, colouring, cut and glue. Instant PDF download.",
    type: "website",
    images: storeProduct.images[0]
      ? [{ url: storeProduct.images[0].src, alt: storeProduct.images[0].alt }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "15000+ Kids Worksheet – Kids Kosha",
    description:
      "15,000+ printable worksheets for ages 2 to 7. Instant download. ₹199 only.",
    images: storeProduct.images[0] ? [storeProduct.images[0].src] : undefined,
  },
};

export default function StoreProductRoutePage() {
  return (
    <>
      <link
        rel="preload"
        href="/wp-content/themes/generatepress/assets/fonts/wXKrE3kTposypRyd51jcAA.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/wp-content/themes/generatepress/assets/fonts/rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/wp-content/uploads/2026/10/Kids-Learning-Worksheets-Hero.webp"
        as="image"
        type="image/webp"
        fetchPriority="high"
      />
      <KidsKoshaPage product={storeProduct} />
    </>
  );
}
