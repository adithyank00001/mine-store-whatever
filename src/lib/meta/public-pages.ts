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
  "/": "Kids Learning Bundle Store Home",
  "/store/product": "15,000+ Printable Kids Learning Bundle",
  "/store/success": "Store Purchase Success",
  "/contact": "Contact",
  "/privacy-policy": "Privacy Policy",
  "/terms-of-service": "Terms of Service",
  "/refund-policy": "Refund Policy",
};

function normalizePath(pathname: string): string {
  if (!pathname) return "/";
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
}

export function isPublicMetaPagePath(pathname: string): boolean {
  if (!pathname || pathname.startsWith("/api/")) {
    return false;
  }

  const clean = normalizePath(pathname);
  return PUBLIC_PAGE_EXACT.has(clean) || STORE_SLUG_PRODUCT_PATH.test(clean);
}

/** Friendly content_name for a public page path, or null if unknown. */
export function getMetaPageContentName(pathname: string): string | null {
  if (!pathname) {
    return null;
  }

  const clean = normalizePath(pathname);
  const exact = META_PAGE_CONTENT_NAMES[clean];
  if (exact) {
    return exact;
  }

  const slug = STORE_SLUG_PRODUCT_PATH.exec(clean)?.[1];
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
