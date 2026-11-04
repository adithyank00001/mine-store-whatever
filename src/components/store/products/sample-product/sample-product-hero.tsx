"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Check, CircleCheck, Lock, ShieldCheck, ZoomIn } from "lucide-react";

import { ProductImage } from "@/components/store/product-image";
import { ProductStars } from "@/components/store/product-stars";
import { OfferCountdown } from "@/components/store/shared/offer-countdown";
import { RazorpayLogo } from "@/components/store/shared/razorpay-logo";
import { StoreBuyCtaButton } from "@/components/store/store-buy-cta-button";
import { useProductCheckout } from "@/lib/store/hooks/use-product-checkout";
import type { StoreProductConfig } from "@/lib/store/product-content";
import { formatMoney, formatReviewCount } from "@/lib/store/product-format";
import { cloudinaryDeliveryUrl } from "@/lib/store/cloudinary";
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
 * Isolated Sample Product Hero.
 *
 * Dedicated to /store/product/sample-product.
 * You can freely edit this file's design, layout, and copy without affecting any other product!
 */
export function SampleProductHero({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const {
    unitPrice,
    lineTotal,
    startingCheckout,
    payError,
    handleBuy,
  } = useProductCheckout(product);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
        <section aria-label="Product images" className="store-gallery">
          <div className="store-rating-badge">
            <span className="store-rating-stars" aria-hidden>
              ⭐⭐⭐⭐⭐
            </span>
            <span className="store-rating-text">
              <strong>{product.rating.toFixed(1)}</strong>/5{" "}
              <span className="store-rating-count">
                ({formatReviewCount(product.reviewCount)} Customers)
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
              width={800}
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
                      priority={false}
                    />
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="store-buybox" aria-label="Buy product">
          {product.eyebrow?.trim() ? (
            <p className="store-eyebrow !text-amber-600 !font-black !tracking-wider text-xs sm:text-[13px] uppercase mb-2">
              {product.eyebrow.trim()}
            </p>
          ) : null}
          <h1 className="store-title !text-[26px] sm:!text-[34px] lg:!text-[40px] !font-sans !font-black uppercase !tracking-tight !text-slate-900 !leading-[1.15]">
            {product.title}
          </h1>

          {/* Trust Sub-headline Checklist Row */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[13px] sm:text-sm font-bold text-slate-700">
            {[
              "Lifetime Access",
              "One-Time Payment",
              "Instant Access",
              "No Watermark",
            ].map((item, idx, arr) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="size-3.5 shrink-0 text-emerald-600" strokeWidth={3} />
                <span>{item}</span>
                {idx < arr.length - 1 ? (
                  <span className="ml-1 text-slate-300 font-normal select-none">•</span>
                ) : null}
              </span>
            ))}
          </div>

          <h3 className="store-subtitle-heading !text-base sm:!text-[17px] lg:!text-xl !font-bold !text-slate-900 !leading-relaxed !mt-3.5">
            {product.subtitle}
          </h3>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ProductStars rating={product.rating} />
            <span className="text-sm text-[var(--store-muted)]">
              {product.rating.toFixed(1)} ·{" "}
              {formatReviewCount(product.reviewCount)} Customers
            </span>
          </div>

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
                      className="size-4 shrink-0 text-emerald-600 mt-0.5"
                      strokeWidth={2.5}
                      aria-hidden="true"
                    />
                  )}
                  {isBonusHighlight ? (
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
                      <p className="text-sm font-bold text-amber-950 leading-snug">
                        {text}
                      </p>
                      {hasBonusPoints ? (
                        <ul className="store-highlight-bonus-points mt-2">
                          {points!.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ) : (() => {
                    const cleanText = text.replace(/^[✔✓•\-]\s*/, "");
                    const colonIdx = cleanText.indexOf(":");
                    const hasColon = colonIdx !== -1;
                    const headingText = hasColon
                      ? cleanText.slice(0, colonIdx).trim()
                      : cleanText;
                    const subText = hasColon
                      ? cleanText.slice(colonIdx + 1).trim()
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

          {/* Pricing & Offer Countdown */}
          <div className="mt-7 flex flex-col items-center justify-center text-center">
            {/* Price Row: Current Price + Strikethrough Original */}
            <div className="flex items-baseline justify-center gap-3 sm:gap-4">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-sans">
                {formatMoney(unitPrice, product.currencySymbol)}
              </span>
              {product.compareAtPrice != null ? (
                <del
                  className="text-xl sm:text-2xl font-bold text-slate-400 line-through decoration-slate-400 decoration-2"
                  style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}
                >
                  {formatMoney(product.compareAtPrice, product.currencySymbol)}
                </del>
              ) : null}
            </div>

            {/* 97% OFF Tag under the price */}
            {product.compareAtPrice != null &&
            product.compareAtPrice > unitPrice ? (
              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3.5 py-1 text-xs sm:text-sm font-black text-emerald-800 border border-emerald-200 shadow-2xs">
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

          {/* Primary CTA Button & Trust Badges */}
          <div id="buy" className="mt-6 space-y-3.5">
            <div className="flex justify-center">
              <StoreBuyCtaButton
                onClick={() => void handleBuy()}
                disabled={startingCheckout}
                busy={startingCheckout}
                buttonClassName="min-h-[3.25rem] text-sm sm:text-base lg:text-lg font-black tracking-wide uppercase px-4 sm:px-6"
                pulse
              >
                {startingCheckout ? (
                  "Opening checkout…"
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <span>Download Now</span>
                    <span className="font-black text-white">
                      {product.currencySymbol}{product.price}
                    </span>
                    <del
                      className="line-through decoration-white text-white/80 text-xs sm:text-sm font-bold"
                      style={{
                        textDecoration: "line-through",
                        textDecorationThickness: "2px",
                        textDecorationColor: "#ffffff",
                      }}
                    >
                      ₹4,999
                    </del>
                  </span>
                )}
              </StoreBuyCtaButton>
            </div>
            {payError ? (
              <p className="text-center text-sm text-red-600" role="alert">
                {payError}
              </p>
            ) : null}

            {/* Supported Payment Systems: UPI, Cards, NetBanking */}
            <div className="flex justify-center items-center pt-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cloudinaryDeliveryUrl(
                  "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793718383/image-removebg-preview_5.png",
                  { width: 700, quality: "good" },
                )}
                alt="Supported Payment Methods: UPI, Google Pay, PhonePe, Cards, NetBanking"
                loading="lazy"
                className="h-auto w-auto max-w-[190px] sm:max-w-[220px] max-h-5 object-contain"
              />
            </div>

            <div className="store-pay-secure !mt-1" aria-label="Secured by Razorpay">
              <Lock className="size-3.5 shrink-0 text-emerald-600" />
              <span>Secured by</span>
              <RazorpayLogo />
            </div>

            {/* Quick Trust Badges Grid right below CTA */}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center pt-2">
              <div className="rounded-xl border border-slate-200/90 bg-white/90 p-2.5 sm:p-3 shadow-xs flex flex-col items-center justify-center gap-0.5">
                <span className="text-base sm:text-lg">⚡</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  Instant Access
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">Google Drive</span>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white/90 p-2.5 sm:p-3 shadow-xs flex flex-col items-center justify-center gap-0.5">
                <span className="text-base sm:text-lg">🔒</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  Safe & Secure
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">Razorpay Checkout</span>
              </div>
              <div className="rounded-xl border border-slate-200/90 bg-white/90 p-2.5 sm:p-3 shadow-xs flex flex-col items-center justify-center gap-0.5">
                <span className="text-base sm:text-lg">♾️</span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                  Lifetime Access
                </span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">No Watermark</span>
              </div>
            </div>

            {/* 100% Money-Back Guaranteed Trust Badge */}
            <div className="mt-3 flex items-center justify-center gap-2.5 rounded-2xl border-2 border-emerald-300/90 bg-emerald-50/95 py-2.5 sm:py-3 px-4 text-center shadow-xs">
              <ShieldCheck className="size-5 sm:size-6 shrink-0 text-emerald-600" strokeWidth={2.5} />
              <span className="text-sm sm:text-base font-black text-emerald-950 tracking-tight">
                100% Money-Back Guaranteed
              </span>
            </div>
          </div>
        </section>
      </div>

      <div className="store-sticky-buy">
        <div className="store-sticky-buy-inner">
          <div className="store-sticky-buy-price">
            <span className="store-sticky-buy-now">
              {formatMoney(lineTotal, product.currencySymbol)}
            </span>
            {product.compareAtPrice != null ? (
              <del
                className="store-sticky-buy-was text-slate-400 text-sm font-semibold line-through decoration-slate-400 decoration-2"
                style={{ textDecoration: "line-through", textDecorationThickness: "2px" }}
              >
                {formatMoney(product.compareAtPrice, product.currencySymbol)}
              </del>
            ) : null}
          </div>
          <div className="store-sticky-buy-actions">
            <p className="text-center lg:text-left !text-sm sm:!text-[15px] lg:!text-base font-black tracking-tight text-slate-900 leading-tight">
              <span>Offer Ends Today. </span>
              <span className="text-red-600 font-black">HURRY UP!</span>
            </p>
            <StoreBuyCtaButton
              onClick={() => void handleBuy()}
              disabled={startingCheckout}
              busy={startingCheckout}
              buttonClassName="min-h-[2.85rem] px-4 sm:px-6 text-[15px] sm:text-base font-bold"
              className="w-full lg:w-auto lg:min-w-[15rem] lg:shrink-0"
              pulse
            >
              {startingCheckout ? (
                "Opening checkout…"
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span>Download Now</span>
                  <span className="font-black text-white">
                    {product.currencySymbol}{product.price}
                  </span>
                  <del
                    className="line-through decoration-white text-white/80 text-xs sm:text-sm font-bold"
                    style={{
                      textDecoration: "line-through",
                      textDecorationThickness: "2px",
                      textDecorationColor: "#ffffff",
                    }}
                  >
                    ₹4,999
                  </del>
                </span>
              )}
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

