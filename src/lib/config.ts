/**
 * Public configuration safe to use in the browser.
 * Never put secret keys in this file.
 */
export const publicConfig = {
  appName: "ByePanda",
  productTagline: "15,000+ Printable Kids Learning Worksheets & Activity Bundles",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "https://www.byepanda.com",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-NTK43VFS",
} as const;

/** Public app origin without trailing slash. */
export function getPublicAppOrigin() {
  return publicConfig.appUrl.replace(/\/+$/, "");
}

