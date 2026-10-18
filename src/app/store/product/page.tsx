import type { Metadata } from "next";

import { StoreProductPage } from "@/components/store/product-page";
/** Live ads product — always /store/product. Content: products/kids-bundle.ts */
import { storeProduct } from "@/lib/store/product-content";

export const metadata: Metadata = {
  title: {
    absolute: "15,000+ Printable Kids Learning Bundle | ByePanda",
  },
  description:
    "15,000+ printable kids learning worksheets covering reading, math, and brain skills. Instant Google Drive delivery. Secure checkout with Razorpay.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "15,000+ Printable Kids Learning Bundle | ByePanda",
    description:
      "15,000+ printable worksheets for kids — early reading, math & brain skills. Instant download.",
    type: "website",
    images: storeProduct.images[0]
      ? [{ url: storeProduct.images[0].src, alt: storeProduct.images[0].alt }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "15,000+ Printable Kids Learning Bundle | ByePanda",
    description:
      "15,000+ printable kids worksheets — reading, math & brain skills. Instant download. From ₹497.",
    images: storeProduct.images[0] ? [storeProduct.images[0].src] : undefined,
  },
};

export default function StoreProductRoutePage() {
  return <StoreProductPage product={storeProduct} />;
}
