import type { Metadata } from "next";

import { StoreProductPage } from "@/components/store/product-page";
import { sampleProduct } from "@/lib/store/products/sample-product";

export const metadata: Metadata = {
  title: {
    absolute: `${sampleProduct.title} | ByePanda Original Template`,
  },
  description: sampleProduct.subtitle,
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: `${sampleProduct.title} | ByePanda Original Template`,
    description: sampleProduct.subtitle,
    type: "website",
    images: sampleProduct.images[0]
      ? [{ url: sampleProduct.images[0].src, alt: sampleProduct.images[0].alt }]
      : undefined,
  },
};

export default function StoreOriginalTemplatePage() {
  return <StoreProductPage product={sampleProduct} />;
}
