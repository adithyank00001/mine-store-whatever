/**
 * ============================================================
 * STORE PRODUCT REGISTRY — list of every sellable product.
 * To add a product: read STORE-PRODUCT-GUIDE.md at the project root.
 * ============================================================
 */

import type { StoreProductConfig } from "@/lib/store/product-content";
import { panIndiaLeads2026 } from "@/lib/store/products/pan-india-leads-2026";
import { sampleProduct } from "@/lib/store/products/sample-product";

/**
 * Valid ByePanda store product slugs.
 * Used to strictly verify incoming Razorpay webhook/verify orders belong to ByePanda.
 */
export const BYEPANDA_PRODUCT_SLUGS = [
  "kids-bundle",
  "1m-reels-bundle",
  "sample-product",
] as const;

export function isByePandaProductSlug(slug: string | null | undefined): boolean {
  if (!slug) return false;
  const clean = slug.trim();
  return (
    clean === "kids-bundle" ||
    clean === "1m-reels-bundle" ||
    clean === "sample-product"
  );
}

/**
 * Live ads product. Served ONLY at /store/product.
 * Never change this value unless the user explicitly asks.
 */
export const LIVE_ADS_PRODUCT_SLUG = "kids-bundle";

/** URL of the live ads product page. Never change. */
export const LIVE_ADS_PRODUCT_PATH = "/store/product";

/**
 * Old slugs saved on past purchases before the store was renamed.
 * Notice: "pan-india-leads-2026" belongs to Growscale and must NEVER be listed here.
 */
const LEGACY_LIVE_PURCHASE_SLUGS = ["poster-pack"];

/**
 * NEXT_PUBLIC_STORE_PRICE_INR overrides the price of the live ads product ONLY.
 * Other products always use the price written in their own file.
 */
function withLivePriceOverride(product: StoreProductConfig): StoreProductConfig {
  if (product.slug !== LIVE_ADS_PRODUCT_SLUG) {
    return product;
  }
  const raw = process.env.NEXT_PUBLIC_STORE_PRICE_INR?.trim();
  if (!raw) {
    return product;
  }
  const override = Number.parseFloat(raw);
  if (!Number.isFinite(override) || override <= 0) {
    return product;
  }
  return { ...product, price: override };
}

/**
 * ByePanda registered products ONLY.
 */
const REGISTERED_PRODUCTS: StoreProductConfig[] = [
  sampleProduct,
  panIndiaLeads2026,
];

export const storeProducts: StoreProductConfig[] =
  REGISTERED_PRODUCTS.map(withLivePriceOverride);

const productsBySlug = new Map(
  storeProducts.map((product) => [product.slug, product]),
);

if (productsBySlug.size !== storeProducts.length) {
  throw new Error("Two store products use the same slug. Every slug must be unique.");
}

/** Live ads product (Kids Bundle). Same object the /store/product page renders. */
export const storeProduct: StoreProductConfig = (() => {
  const live =
    productsBySlug.get(LIVE_ADS_PRODUCT_SLUG) ??
    storeProducts[0] ??
    panIndiaLeads2026;
  if (!live) {
    throw new Error(`Live ads product "${LIVE_ADS_PRODUCT_SLUG}" is not registered.`);
  }
  return live;
})();

export function getStoreProductBySlug(
  slug: string | null | undefined,
): StoreProductConfig | null {
  if (!slug) {
    return null;
  }
  const clean = slug.trim();
  const direct = productsBySlug.get(clean);
  if (direct) {
    return direct;
  }
  // Backward compatibility alias for sample-product and 1m-reels-bundle
  if (clean === "sample-product") {
    return productsBySlug.get("1m-reels-bundle") ?? sampleProduct;
  }
  if (clean === "1m-reels-bundle") {
    return productsBySlug.get("sample-product") ?? sampleProduct;
  }
  return null;
}

/**
 * Product for a saved purchase row (download + email).
 * Strictly checks that the slug is a verified ByePanda product.
 * Returns null if the slug is unknown, missing, or belongs to another store.
 */
export function getStoreProductForPurchaseSlug(
  slug: string | null | undefined,
): StoreProductConfig | null {
  if (!slug) {
    return null;
  }
  const trimmed = slug.trim();
  if (!trimmed || !isByePandaProductSlug(trimmed)) {
    return null;
  }
  if (LEGACY_LIVE_PURCHASE_SLUGS.includes(trimmed)) {
    return storeProduct;
  }
  return getStoreProductBySlug(trimmed);
}

/** Products shown on the store homepage (published: true). */
export function getPublishedStoreProducts(): StoreProductConfig[] {
  return storeProducts.filter((product) => product.published);
}

/** Public page URL for a product. Live ads product always uses /store/product. */
export function getStoreProductPath(product: Pick<StoreProductConfig, "slug">): string {
  return product.slug === LIVE_ADS_PRODUCT_SLUG
    ? LIVE_ADS_PRODUCT_PATH
    : `/store/product/${product.slug}`;
}
