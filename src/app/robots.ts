import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/store",
        "/store/product",
        "/privacy-policy",
        "/terms-of-service",
        "/refund-policy",
        "/contact",
      ],
      disallow: [
        "/api/",
        "/store/downloads/",
        "/api/store/download",
      ],
    },
  };
}
