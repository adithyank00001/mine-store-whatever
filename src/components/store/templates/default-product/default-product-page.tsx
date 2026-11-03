import { ProductHeader } from "@/components/store/product-header";
import { DefaultProductHero } from "@/components/store/templates/default-product/default-product-hero";
import { DefaultProductDetails } from "@/components/store/templates/default-product/default-product-details";
import type { StoreProductConfig } from "@/lib/store/product-content";

/**
 * Standard Product Page Template (The Blueprint).
 *
 * This is the baseline starter template for new product pages.
 * Any new product page can start with this design, and can be copied into its own
 * isolated folder whenever custom UI styling, layout changes, or new sections are needed.
 */
export function DefaultProductPage({ product }: { product: StoreProductConfig }) {
  return (
    <div className="store-root min-h-full">
      <ProductHeader brandName={product.brandName} />
      <main className="store-shell py-6 sm:py-10 lg:py-12">
        <DefaultProductHero product={product} />
        <DefaultProductDetails product={product} />
      </main>
    </div>
  );
}

