import Link from "next/link";
import { BadgeCheck, Sparkles, CheckCircle2 } from "lucide-react";

import { BrandLogo } from "@/components/marketing/brand-logo";
import { ProductImage } from "@/components/store/product-image";
import { ProductStars } from "@/components/store/product-stars";
import { formatMoney } from "@/lib/store/product-format";
import {
  getPublishedStoreProducts,
  getStoreProductPath,
} from "@/lib/store/products";

export function ShopHomePage() {
  const publishedProducts = getPublishedStoreProducts();
  const featuredProduct = publishedProducts[0];
  const featuredPath = featuredProduct
    ? getStoreProductPath(featuredProduct)
    : "/store/product";

  return (
    <div className="store-root shop-home min-h-screen flex flex-col justify-between">
      <header className="store-header">
        <div className="store-shell flex h-14 items-center justify-between sm:h-16">
          <div className="store-header-brand">
            <BrandLogo href="/" size="sm" className="store-header-logo" />
            <span className="store-brand store-verified-badge">
              <BadgeCheck className="size-4 shrink-0 text-amber-500" aria-hidden />
              Verified Kids Store
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm text-[var(--store-muted)] font-medium">
            <Link href="/contact" className="hover:text-[var(--store-ink)]">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="shop-hero w-full">
          <div className="store-shell shop-hero-inner">
            <div className="shop-hero-copy">
              <p className="store-eyebrow flex items-center gap-1.5">
                <Sparkles className="size-4 text-amber-500" aria-hidden />
                Ages 2–8 · Printable Learning Worksheets
              </p>
              <h1 className="shop-hero-title">
                Your Kid&apos;s Growth Starts From Here
              </h1>
              <p className="shop-hero-subtitle">
                Less screen time. A smarter, happier child. 15,000+ printable
                coloring pages, phonics, numbers, handwriting, math & daily
                brain puzzles for instant home learning.
              </p>
              <div className="shop-hero-actions">
                <Link
                  href={featuredPath}
                  className="store-btn store-btn-primary shop-hero-btn"
                >
                  Get 15,000+ Bundle — {featuredProduct ? formatMoney(featuredProduct.price, featuredProduct.currencySymbol) : "₹497"}
                </Link>
                <Link href={featuredPath} className="shop-hero-secondary">
                  View preview samples &rarr;
                </Link>
              </div>

              {/* Quick trust points */}
              <div className="mt-8 grid grid-cols-2 gap-3 text-xs sm:text-sm text-[var(--store-muted)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Instant PDF download</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Organized for Ages 2–8</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Print unlimited times</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Lifetime access</span>
                </div>
              </div>
            </div>

            {/* Featured Product Hero Card */}
            {featuredProduct ? (
              <Link
                href={featuredPath}
                className="shop-hero-feature"
                aria-label={`View ${featuredProduct.title}`}
              >
                <div className="shop-hero-feature-media">
                  <ProductImage
                    src={featuredProduct.images[0]?.src || ""}
                    alt={featuredProduct.images[0]?.alt || featuredProduct.title}
                    priority
                    fit="cover"
                    sizes="(max-width: 960px) 100vw, 480px"
                  />
                </div>
                <div className="shop-hero-feature-meta">
                  <p className="shop-hero-feature-label">
                    🔥 {featuredProduct.badge || "Top Selling Bundle"}
                  </p>
                  <h2>{featuredProduct.title}</h2>
                  <p className="text-sm text-[var(--store-muted)] mt-1 line-clamp-2">
                    {featuredProduct.catalogSubtitle || featuredProduct.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <ProductStars rating={featuredProduct.rating} />
                    <span className="text-xs font-semibold text-[var(--store-muted)]">
                      {featuredProduct.rating.toFixed(1)} ({featuredProduct.reviewCount.toLocaleString()}+ parents)
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[var(--store-ink)]">
                      {formatMoney(featuredProduct.price, featuredProduct.currencySymbol)}
                    </span>
                    {featuredProduct.compareAtPrice ? (
                      <span className="text-sm text-[var(--store-muted)] line-through">
                        {formatMoney(featuredProduct.compareAtPrice, featuredProduct.currencySymbol)}
                      </span>
                    ) : null}
                    <span className="ml-auto text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Instant Access
                    </span>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        </section>

        {/* Product Catalog Grid */}
        {publishedProducts.length > 0 ? (
          <section className="shop-products mt-8 sm:mt-12" id="products">
            <div className="store-shell">
              <div className="shop-products-head">
                <h2>Featured Learning Bundles</h2>
                <p>
                  {publishedProducts.length} package available · Instant digital delivery
                </p>
              </div>
              <div className="shop-grid">
                {publishedProducts.map((product) => {
                  const href = getStoreProductPath(product);
                  const image = product.images[0];
                  return (
                    <Link
                      key={product.slug}
                      href={href}
                      className="shop-card shop-card-featured"
                    >
                      <div className="shop-card-media">
                        {product.badge ? (
                          <span className="shop-card-badge shop-card-badge-hot">
                            {product.badge}
                          </span>
                        ) : null}
                        <ProductImage
                          src={image?.src || ""}
                          alt={image?.alt || product.title}
                          fit="cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <div className="shop-card-body">
                        <h3 className="shop-card-title">{product.title}</h3>
                        <p className="shop-card-subtitle">
                          {product.catalogSubtitle || product.subtitle}
                        </p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <ProductStars rating={product.rating} />
                          <span className="text-xs text-[var(--store-muted)]">
                            {product.rating.toFixed(1)} ({product.reviewCount}+)
                          </span>
                        </div>
                        <div className="shop-card-price-row">
                          <span className="shop-card-price">
                            {formatMoney(product.price, product.currencySymbol)}
                          </span>
                          {product.compareAtPrice ? (
                            <span className="shop-card-compare">
                              {formatMoney(product.compareAtPrice, product.currencySymbol)}
                            </span>
                          ) : null}
                        </div>
                        <div className="shop-card-cta">
                          <span>View bundle &amp; samples</span>
                          <span aria-hidden>&rarr;</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <footer className="shop-footer">
        <div className="store-shell flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8">
          <p className="text-sm text-[var(--store-muted)]">
            &copy; {new Date().getFullYear()} ByePanda &middot; Instant digital delivery &middot; Secure checkout
          </p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--store-muted)]">
            <Link
              href="/privacy-policy"
              className="hover:text-[var(--store-ink)] hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-[var(--store-ink)] hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-[var(--store-ink)] hover:underline"
            >
              Refunds
            </Link>
            <Link
              href="/contact"
              className="hover:text-[var(--store-ink)] hover:underline"
            >
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
