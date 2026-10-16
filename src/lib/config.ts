/**
 * Public configuration safe to use in the browser.
 * Never put secret keys in this file.
 */
export const publicConfig = {
  appName: "growscaleX",
  productTagline: "Buy premium lead databases with instant download",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() || "GTM-NTK43VFS",
} as const;

/** Public app origin without trailing slash. */
export function getPublicAppOrigin() {
  return publicConfig.appUrl.replace(/\/+$/, "");
}

