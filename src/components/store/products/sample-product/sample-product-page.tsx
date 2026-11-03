import { SampleAnnouncementBar } from "@/components/store/products/sample-product/sample-announcement-bar";
import { SampleProductHero } from "@/components/store/products/sample-product/sample-product-hero";
import { SampleProductDetails } from "@/components/store/products/sample-product/sample-product-details";
import type { StoreProductConfig } from "@/lib/store/product-content";

/**
 * Isolated Sample Product Page (1M Reels Bundle).
 *
 * Rendered at /store/product/1m-reels-bundle.
 * Features a dedicated sticky top announcement bar with the standard header hidden.
 * This is completely isolated from other products.
 */
export function SampleProductPage({ product }: { product: StoreProductConfig }) {
  return (
    <div className="store-root min-h-full w-full max-w-[100vw] overflow-x-hidden">
      <SampleAnnouncementBar />
      <main className="store-shell py-6 sm:py-10 lg:py-12">
        <SampleProductHero product={product} />
        <SampleProductDetails product={product} />
      </main>
    </div>
  );
}
