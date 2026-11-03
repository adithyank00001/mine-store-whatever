import { ProductHeader } from "@/components/store/product-header";
import { KidsProductHero } from "@/components/store/kids/kids-product-hero";
import { KidsProductDetails } from "@/components/store/kids/kids-product-details";
import type { StoreProductConfig } from "@/lib/store/product-content";

/**
 * Dedicated Kids Learning Bundle Product Page.
 * Contains all the custom high-converting sections and styles created for the kids bundle.
 * Served at the root /store/product URL.
 */
export function KidsProductPage({ product }: { product: StoreProductConfig }) {
  return (
    <div className="store-root store-kids-theme min-h-full">
      <ProductHeader brandName={product.brandName} />
      <main className="store-shell py-6 sm:py-10 lg:py-12">
        <KidsProductHero product={product} />
        <KidsProductDetails product={product} />
      </main>
    </div>
  );
}
