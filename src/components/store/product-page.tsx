import { ProductDetails } from "@/components/store/product-details";
import { ProductHero } from "@/components/store/product-hero";
import type { StoreProductConfig } from "@/lib/store/product-content";

export function StoreProductPage({ product }: { product: StoreProductConfig }) {
  return (
    <div className="store-root min-h-full">
      <main className="store-shell py-6 sm:py-10 lg:py-12">
        <ProductHero product={product} />
        <ProductDetails product={product} />
      </main>
    </div>
  );
}
