/** Public marketing / checkout funnel paths that should send Meta PageView. */

export const PUBLIC_META_PAGE_PATHS = [
  "/",
  "/store/product",
  "/store/success",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/refund-policy",
] as const;

const PUBLIC_PAGE_EXACT = new Set<string>(PUBLIC_META_PAGE_PATHS);

/** Extra store products: /store/product/<slug> (live ads product stays /store/product). */
const STORE_SLUG_PRODUCT_PATH = /^\/store\/product\/([a-z0-9-]+)$/;

/** Friendly labels for Meta PageView custom_data.content_name */
export const META_PAGE_CONTENT_NAMES: Record<string, string> = {
  "/": "Digital Products Store Home",
  "/store/product": "PAN India Leads Database Product",
  "/store/success": "Store Purchase Success",
  "/contact": "Contact",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-service": "Terms of Service",
  "/refund-policy": "Refund Policy",
};

export function isPublicMetaPagePath(pathname: string): boolean {
  if (!pathname || pathname.startsWith("/api/")) {
    return false;
  }

  return PUBLIC_PAGE_EXACT.has(pathname) || STORE_SLUG_PRODUCT_PATH.test(pathname);
}

/** Friendly content_name for a public page path, or null if unknown. */
export function getMetaPageContentName(pathname: string): string | null {
  if (!pathname) {
    return null;
  }

  const exact = META_PAGE_CONTENT_NAMES[pathname];
  if (exact) {
    return exact;
  }

  const slug = STORE_SLUG_PRODUCT_PATH.exec(pathname)?.[1];
  return slug ? `Store Product: ${slug}` : null;
}

/** Same key format for head bootstrap + SPA tracker (avoids double Pixel PageView). */
export function getMetaPageViewKey(
  pathname: string,
  search: string | { toString(): string },
): string {
  const path = pathname || "/";
  const raw = typeof search === "string" ? search : search.toString();
  const query = raw.startsWith("?") ? raw.slice(1) : raw;
  return query ? `${path}?${query}` : path;
}
