import { KidsProductPage } from "@/components/store/kids/kids-product-page";
import { SampleProductPage } from "@/components/store/products/sample-product/sample-product-page";
import { DefaultProductPage } from "@/components/store/templates/default-product/default-product-page";
import type { StoreProductConfig } from "@/lib/store/product-content";

/**
 * Isolated Product Page Dispatcher.
 *
 * Each product with a custom design is isolated in its own folder and rendered here.
 * When you want to create a custom, isolated design for a product:
 * 1. Duplicate `src/components/store/templates/default-product/` into `src/components/store/products/<slug>/`
 * 2. Add a case for your slug below:
 *    case "your-slug":
 *      return <YourSlugProductPage product={product} />;
 * 3. Freely edit HTML, CSS, layouts, and copy in that folder — it will NEVER affect any other product!
 *
 * Any product slug not explicitly listed falls back to DefaultProductPage safely.
 */
export function ProductPageDispatcher({
  slug,
  product,
}: {
  slug: string;
  product: StoreProductConfig;
}) {
  switch (slug) {
    case "kids-bundle":
      return <KidsProductPage product={product} />;
    case "1m-reels-bundle":
    case "sample-product":
      return <SampleProductPage product={product} />;
    default:
      return <DefaultProductPage product={product} />;
  }
}
