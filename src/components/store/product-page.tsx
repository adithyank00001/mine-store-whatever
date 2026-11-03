import { DefaultProductPage } from "@/components/store/templates/default-product/default-product-page";
import type { StoreProductConfig } from "@/lib/store/product-content";

/**
 * Standard StoreProductPage — backward-compatible alias to DefaultProductPage.
 * Existing code importing `StoreProductPage` continues to work seamlessly.
 */
export function StoreProductPage({ product }: { product: StoreProductConfig }) {
  return <DefaultProductPage product={product} />;
}
