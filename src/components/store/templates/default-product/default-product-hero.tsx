"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  CircleCheck,
  Lock,
  Sparkles,
  ZoomIn,
} from "lucide-react";

import { ProductImage } from "@/components/store/product-image";
import { ProductStars } from "@/components/store/product-stars";
import { OfferCountdown } from "@/components/store/shared/offer-countdown";
import { RazorpayLogo } from "@/components/store/shared/razorpay-logo";
import { StoreBuyCtaButton } from "@/components/store/store-buy-cta-button";
import { useProductCheckout } from "@/lib/store/hooks/use-product-checkout";
import type { StoreProductConfig } from "@/lib/store/product-content";
import { formatMoney, formatReviewCount } from "@/lib/store/product-format";
import { cn } from "@/lib/utils";

const ProductImageZoomLightbox = dynamic(
  () =>
    import("@/components/store/product-image-zoom-lightbox").then(
      (m) => m.ProductImageZoomLightbox,
    ),
  { ssr: false },
);

function prefetchZoomLightbox() {
  void import("@/components/store/product-image-zoom-lightbox");
}

type Props = {
  product: StoreProductConfig;
};

/**
 * Standard Product Hero (Starter Template).
 *
 * Fully wired to shared checkout, Meta tracking & countdown logic,
 * but 100% customizable in layout, styles, and typography.
 */
export function DefaultProductHero({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const {
    selections,
    selectOption,
    unitPrice,
    lineTotal,
    startingCheckout,
    payError,
    handleBuy,
  } = useProductCheckout(product);

  const buyLabel = product.buyButtonLabel;
  const buyButtonText = startingCheckout ? "Opening checkout…" : buyLabel;
  const stickyBuyLabel =
    product.stickyBuyButtonLabel ?? product.buyButtonLabel;
  const stickyBuyButtonText = startingCheckout
    ? "Opening checkout…"
    : stickyBuyLabel;

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
        {/* Product Images & Gallery */}
        <section aria-label="Product images" className="store-gallery">
          <div className="store-rating-badge">
            <span className="store-rating-stars" aria-hidden>
              ⭐⭐⭐⭐⭐
            </span>
            <span className="store-rating-text">
              <strong>{product.rating.toFixed(1)}</strong>/5{" "}
              <span className="store-rating-count">
                ({formatReviewCount(product.reviewCount)}+ Satisfied Customers)
              </span>
            </span>
          </div>

          <button
            type="button"
            className="store-main-image store-main-image-zoom"
            onClick={() => setZoomOpen(true)}
            onPointerEnter={prefetchZoomLightbox}
            onFocus={prefetchZoomLightbox}
            aria-label="Open image zoom"
          >
            <ProductImage
              src={product.images[activeImage]?.src ?? product.images[0]?.src}
              alt={product.images[activeImage]?.alt ?? product.images[0]?.alt}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            {product.socialProofTag ? (
              <span className="store-social-proof">
                {product.socialProofTag}
              </span>
            ) : null}
            <span className="store-zoom-cue">
              <ZoomIn className="size-3.5" />
              Click to zoom
            </span>
          </button>

          {product.images.length > 1 ? (
            <div
              className="mt-3 grid gap-2.5 sm:mt-4 sm:gap-3"
              style={{
                gridTemplateColumns: `repeat(${Math.min(product.images.length, 4)}, minmax(0, 1fr))`,
              }}
            >
              {product.images.map((image, index) => {
                const selected = index === activeImage;
                return (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={cn("store-thumb", selected && "is-active")}
                    aria-label={`Show image ${index + 1}`}
                    aria-pressed={selected}
                  >
                    <ProductImage
                      src={image.src}
                      alt=""
                      sizes="120px"
                      width={150}
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        {/* Buy Box */}
        <section className="store-buybox" aria-label="Buy product">
          {product.eyebrow?.trim() ? (
            <p className="store-eyebrow">{product.eyebrow.trim()}</p>
          ) : null}
          <h1 className="store-title">{product.title}</h1>
          <h3 className="store-subtitle-heading">{product.subtitle}</h3>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ProductStars rating={product.rating} />
            <span className="text-sm text-[var(--store-muted)]">
              {product.rating.toFixed(1)} ·{" "}
              {formatReviewCount(product.reviewCount)} reviews
            </span>
          </div>

          {/* Highlights List */}
          <ul className="store-highlights">
            {product.highlights.map((item) => {
              const text = typeof item === "string" ? item : item.text;
              const badge = typeof item === "string" ? undefined : item.badge;
              const worth = typeof item === "string" ? undefined : item.worth;
              const points =
                typeof item === "string" ? undefined : item.points;
              const isBonusHighlight = Boolean(
                badge && /bonus|🎁/i.test(badge),
              );
              const hasBonusPoints = Boolean(points && points.length > 0);
              return (
                <li
                  key={text}
                  className={
                    isBonusHighlight ? "store-highlight-bonus" : undefined
                  }
                >
                  {isBonusHighlight ? (
                    <span className="store-highlight-emoji" aria-hidden="true">
                      🔥
                    </span>
                  ) : (
                    <CircleCheck
                      className="size-4 shrink-0 text-[var(--store-accent)]"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                  )}
                  {hasBonusPoints ? (
                    <div className="store-highlight-bonus-body">
                      <p className="store-highlight-bonus-urgency">
                        Only Available Today
                      </p>
                      <div className="store-highlight-bonus-top">
                        {badge ? (
                          <span className="store-highlight-badge">{badge}</span>
                        ) : null}
                        {worth ? (
                          <span className="store-highlight-worth">{worth}</span>
                        ) : null}
                      </div>
                      <ul className="store-highlight-bonus-points">
                        {points!.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (() => {
                    const colonIdx = text.indexOf(":");
                    const hasColon = colonIdx !== -1;
                    const headingText = hasColon
                      ? text.slice(0, colonIdx).trim()
                      : text;
                    const subText = hasColon
                      ? text.slice(colonIdx + 1).trim()
                      : null;
                    return (
                      <span className="store-highlight-text">
                        {badge ? (
                          <span className="store-highlight-badge">{badge}</span>
                        ) : null}
                        <span className="store-highlight-heading">
                          {headingText}
                        </span>
                        {subText ? (
                          <span className="store-highlight-sub">{subText}</span>
                        ) : null}
                      </span>
                    );
                  })()}
                </li>
              );
            })}
          </ul>

          {/* Pricing & Offer Timer */}
          <div className="mt-6 flex flex-col items-center justify-center text-center">
            <div className="flex flex-wrap items-baseline justify-center gap-2.5 sm:gap-3">
              <p className="store-price">
                {formatMoney(unitPrice, product.currencySymbol)}
              </p>
              {product.compareAtPrice != null ? (
                <p className="store-compare">
                  {formatMoney(product.compareAtPrice, product.currencySymbol)}
                </p>
              ) : null}
            </div>

            {product.compareAtPrice != null &&
            product.compareAtPrice > unitPrice ? (
              <div className="mt-1.5 flex items-center justify-center">
                <span className="store-save">
                  {Math.round(
                    ((product.compareAtPrice - unitPrice) /
                      product.compareAtPrice) *
                      100,
                  )}
                  % OFF
                </span>
              </div>
            ) : null}

            <OfferCountdown />
          </div>

          {/* Options selector (if configured) */}
          {product.options && product.options.length > 0 ? (
            <div className="mt-8 space-y-6">
              {product.options.map((option) => (
                <div key={option.id}>
                  <div className="mb-2.5 flex items-baseline justify-between gap-3">
                    <p className="store-option-label">{option.name}</p>
                    <p className="text-sm text-[var(--store-muted)]">
                      {
                        option.values.find(
                          (v) => v.value === selections[option.id],
                        )?.label
                      }
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const selected = selections[option.id] === value.value;
                      return (
                        <button
                          key={value.value}
                          type="button"
                          onClick={() => selectOption(option.id, value.value)}
                          className={cn("store-chip", selected && "is-active")}
                        >
                          {value.label}
                          {value.priceAdjust ? (
                            <span className="opacity-70">
                              {" "}
                              +
                              {formatMoney(
                                value.priceAdjust,
                                product.currencySymbol,
                              )}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* Primary Buy CTA */}
          <div id="buy" className="mt-8 space-y-3">
            <div className="flex justify-center">
              <StoreBuyCtaButton
                onClick={() => void handleBuy()}
                disabled={startingCheckout}
                busy={startingCheckout}
              >
                {buyButtonText}
              </StoreBuyCtaButton>
            </div>
            {payError ? (
              <p className="text-center text-sm text-red-600" role="alert">
                {payError}
              </p>
            ) : null}
            <div className="store-pay-secure" aria-label="Secured by Razorpay">
              <Lock className="size-3.5 shrink-0 text-[var(--store-accent)]" />
              <span>Secured by</span>
              <RazorpayLogo />
            </div>
          </div>

          {/* Trust badges */}
          {product.trustItems && product.trustItems.length > 0 ? (
            <div className="store-trust">
              {product.trustItems.map((item) => (
                <div key={item.title} className="store-trust-item">
                  <Sparkles className="size-4 shrink-0 text-[var(--store-accent)] mt-0.5" />
                  <div>
                    <p>{item.title}</p>
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </section>
      </div>

      {/* Floating Sticky Buy Bar */}
      <div className="store-sticky-buy">
        <div className="store-sticky-buy-inner">
          <div className="store-sticky-buy-price">
            <span className="store-sticky-buy-now">
              {formatMoney(lineTotal, product.currencySymbol)}
            </span>
            {product.compareAtPrice != null ? (
              <span className="store-sticky-buy-was">
                {formatMoney(product.compareAtPrice, product.currencySymbol)}
              </span>
            ) : null}
          </div>
          <div className="store-sticky-buy-actions">
            {product.socialProofTag ? (
              <p className="text-center lg:text-left text-xs sm:text-sm font-semibold text-[var(--store-muted)] leading-tight">
                {product.socialProofTag}
              </p>
            ) : null}
            <StoreBuyCtaButton
              onClick={() => void handleBuy()}
              disabled={startingCheckout}
              busy={startingCheckout}
              buttonClassName="min-h-[2.85rem] px-4 sm:px-6 text-[15px] sm:text-base"
              className="w-full lg:w-auto lg:min-w-[15rem] lg:shrink-0"
              pulse
            >
              {stickyBuyButtonText}
            </StoreBuyCtaButton>
            {payError ? (
              <p
                className="text-center text-[11px] leading-snug text-red-600"
                role="alert"
              >
                {payError}
              </p>
            ) : (
              <div
                className="store-pay-secure store-pay-secure-sticky"
                aria-label="Secured by Razorpay"
              >
                <Lock className="size-3 shrink-0 text-[var(--store-accent)]" />
                <span>Secured by</span>
                <RazorpayLogo className="store-razorpay-logo-sm" />
              </div>
            )}
          </div>
        </div>
      </div>

      {zoomOpen ? (
        <ProductImageZoomLightbox
          src={product.images[activeImage]?.src ?? product.images[0]?.src}
          alt={product.images[activeImage]?.alt ?? product.images[0]?.alt}
          onClose={() => setZoomOpen(false)}
        />
      ) : null}
    </>
  );
}

