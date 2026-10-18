import { ProductDetails } from "@/components/store/product-details";
import { ProductHeader } from "@/components/store/product-header";
import { ProductHero } from "@/components/store/product-hero";
import type { StoreProductConfig } from "@/lib/store/product-content";

export function StoreProductPage({ product }: { product: StoreProductConfig }) {
  return (
    <div className="store-root min-h-full">
      <ProductHeader brandName={product.brandName} />
      <main className="store-shell py-6 sm:py-10 lg:py-12">
        <ProductHero product={product} />
        <ProductDetails product={product} />
      </main>
    </div>
  );
}
