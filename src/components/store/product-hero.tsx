"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  CircleCheck,
  Download,
  Lock,
  Sparkles,
  X,
  Zap,
  ZoomIn,
} from "lucide-react";

import { cloudinaryDeliveryUrl } from "@/lib/store/cloudinary";
import { ProductImage } from "@/components/store/product-image";
import { ProductStars } from "@/components/store/product-stars";
import { StoreBuyCtaButton } from "@/components/store/store-buy-cta-button";
import { ProductVideo } from "@/components/store/product-video";
import {
  trackStoreInitiateCheckout,
  trackStoreViewContent,
} from "@/lib/meta/store-track";
import { readBrowserMetaClickIds } from "@/lib/meta/fbc";
import {
  loadRazorpayCheckout,
  openRazorpayCheckout,
  prefetchRazorpayCheckout,
  type RazorpaySuccessResponse,
} from "@/lib/store/load-razorpay";
import { formatMoney, formatReviewCount } from "@/lib/store/product-format";
import type { StoreProductConfig } from "@/lib/store/product-content";
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

function RazorpayLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "store-razorpay-logo-sm inline-flex items-center gap-1.5",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        focusable="false"
        className="size-4 shrink-0"
      >
        <path
          fill="#072654"
          d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z"
        />
      </svg>
      <span className="font-semibold tracking-tight text-[#072654]">
        Razorpay
      </span>
    </span>
  );
}

function pad2(value: number) {
  return String(value).padStart(2, "0");
}

function formatCountdown(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

const OFFER_TIMER_KEY = "store-offer-timer-v13";
/** Fresh browser open starts at 00:44:28 */
const OFFER_START_MS = (44 * 60 + 28) * 1000;
/** When timer hits 00:03:00, bump back to 00:28:58 */
const OFFER_SOFT_FLOOR_MS = 3 * 60 * 1000;
const OFFER_SOFT_RESET_MS = (28 * 60 + 58) * 1000;
/** At local midnight, restart only if under 10 minutes left */
const OFFER_MIDNIGHT_RESET_IF_UNDER_MS = 10 * 60 * 1000;

const LICENSE_STOCK_KEY = "store-license-stock-v7";
const LICENSE_MAX = 13;
/** Drop by 1 every hour; at 1, next hour → 13 */
const LICENSE_TICK_MS = 60 * 60 * 1000;
/** Soft reset must always be above the floor or the timer would loop every second */
const OFFER_SOFT_RESET_SAFE_MS =
  OFFER_SOFT_RESET_MS > OFFER_SOFT_FLOOR_MS
    ? OFFER_SOFT_RESET_MS
    : OFFER_SOFT_FLOOR_MS + 60_000;

type OfferTimerState = {
  deadlineMs: number;
  /** Local calendar day last seen, e.g. "2026-09-22" */
  dayKey: string;
};

type LicenseStockState = {
  count: number;
  nextTickMs: number;
};

/** In-memory fallback if localStorage is blocked (private mode / quota). */
let memoryOfferTimer: OfferTimerState | null = null;
let memoryLicenseStock: LicenseStockState | null = null;

function localDayKey(now = Date.now()) {
  const d = new Date(now);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function clampLicenseCount(value: number) {
  if (!Number.isFinite(value)) return LICENSE_MAX;
  return Math.min(LICENSE_MAX, Math.max(1, Math.round(value)));
}

function isValidDayKey(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function readOfferTimerState(): OfferTimerState | null {
  try {
    const raw = window.localStorage.getItem(OFFER_TIMER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<OfferTimerState>;
      if (
        typeof parsed.deadlineMs === "number" &&
        Number.isFinite(parsed.deadlineMs) &&
        parsed.deadlineMs > 0 &&
        isValidDayKey(parsed.dayKey)
      ) {
        const state = {
          deadlineMs: parsed.deadlineMs,
          dayKey: parsed.dayKey,
        };
        memoryOfferTimer = state;
        return state;
      }
    }
  } catch {
    // fall through to memory
  }
  return memoryOfferTimer;
}

function writeOfferTimerState(state: OfferTimerState) {
  memoryOfferTimer = state;
  try {
    window.localStorage.setItem(OFFER_TIMER_KEY, JSON.stringify(state));
  } catch {
    // private mode / quota — memory still keeps this tab stable
  }
}

function readLicenseStockState(): LicenseStockState | null {
  try {
    const raw = window.localStorage.getItem(LICENSE_STOCK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LicenseStockState>;
      if (
        typeof parsed.count === "number" &&
        Number.isFinite(parsed.count) &&
        typeof parsed.nextTickMs === "number" &&
        Number.isFinite(parsed.nextTickMs) &&
        parsed.nextTickMs > 0
      ) {
        const state = {
          count: clampLicenseCount(parsed.count),
          nextTickMs: parsed.nextTickMs,
        };
        memoryLicenseStock = state;
        return state;
      }
    }
  } catch {
    // fall through to memory
  }
  return memoryLicenseStock;
}

function writeLicenseStockState(state: LicenseStockState) {
  memoryLicenseStock = state;
  try {
    window.localStorage.setItem(LICENSE_STOCK_KEY, JSON.stringify(state));
  } catch {
    // private mode / quota — memory still keeps this tab stable
  }
}

/**
 * Apply N hourly ticks: 14 → 13 → … → 2 → 1 → 14 (never stuck at 0).
 */
function advanceLicenseCount(count: number, ticks: number) {
  const safeCount = clampLicenseCount(count);
  const safeTicks = Math.max(0, Math.floor(ticks));
  if (safeTicks === 0) return safeCount;
  // index 0 = 14, index 13 = 1
  const index = LICENSE_MAX - safeCount;
  const nextIndex = (index + safeTicks) % LICENSE_MAX;
  return LICENSE_MAX - nextIndex;
}

function resolveLicenseStock(now = Date.now()): number {
  const existing = readLicenseStockState();

  if (!existing) {
    const fresh = {
      count: LICENSE_MAX,
      nextTickMs: now + LICENSE_TICK_MS,
    };
    writeLicenseStockState(fresh);
    return fresh.count;
  }

  let count = clampLicenseCount(existing.count);
  let nextTickMs = existing.nextTickMs;

  // Corrupted far-future tick → would never decrement (stuck). Fix it.
  if (nextTickMs > now + LICENSE_TICK_MS * 2) {
    nextTickMs = now + LICENSE_TICK_MS;
  }

  // Catch up after sleep / background tabs (no long while-loops).
  if (nextTickMs <= now) {
    const elapsed = now - nextTickMs;
    const ticks = Math.floor(elapsed / LICENSE_TICK_MS) + 1;
    count = advanceLicenseCount(count, ticks);
    nextTickMs += ticks * LICENSE_TICK_MS;
    // Still behind (clock jump) → schedule next hour from now
    if (nextTickMs <= now) {
      nextTickMs = now + LICENSE_TICK_MS;
    }
  }

  count = clampLicenseCount(count);
  writeLicenseStockState({ count, nextTickMs });
  return count;
}

/**
 * Per-browser offer timer:
 * - First open: 00:44:28
 * - Hits ≤ 00:03:00 → jump to 00:28:58
 * - Local midnight: restart to 00:44:28 only if under 10 minutes left
 */
function resolveOfferTimer(now = Date.now()): {
  deadlineMs: number;
  remainingSeconds: number;
} {
  const today = localDayKey(now);
  const existing = readOfferTimerState();

  let deadlineMs = existing?.deadlineMs ?? now + OFFER_START_MS;
  let dayKey =
    existing && isValidDayKey(existing.dayKey) ? existing.dayKey : today;

  if (!existing) {
    writeOfferTimerState({ deadlineMs, dayKey: today });
    return {
      deadlineMs,
      remainingSeconds: Math.floor(OFFER_START_MS / 1000),
    };
  }

  // Midnight crossed: reset only when less than 2 hours remain
  if (dayKey !== today) {
    const remainingAtMidnight = deadlineMs - now;
    if (
      !Number.isFinite(remainingAtMidnight) ||
      remainingAtMidnight < OFFER_MIDNIGHT_RESET_IF_UNDER_MS
    ) {
      deadlineMs = now + OFFER_START_MS;
    }
    dayKey = today;
  }

  let remainingMs = deadlineMs - now;

  // Absurd future deadline (corrupt storage / bad clock) → clamp
  if (!Number.isFinite(remainingMs) || remainingMs > OFFER_START_MS) {
    deadlineMs = now + OFFER_START_MS;
    remainingMs = OFFER_START_MS;
  }

  // Soft loop: at/under 15:00 → restart at 45:24 (always above floor)
  if (remainingMs > 0 && remainingMs <= OFFER_SOFT_FLOOR_MS) {
    deadlineMs = now + OFFER_SOFT_RESET_SAFE_MS;
    remainingMs = OFFER_SOFT_RESET_SAFE_MS;
  }

  // Fully expired → fresh start (never stuck at 00:00:00)
  if (remainingMs <= 0) {
    deadlineMs = now + OFFER_START_MS;
    remainingMs = OFFER_START_MS;
  }

  writeOfferTimerState({ deadlineMs, dayKey });

  return {
    deadlineMs,
    remainingSeconds: Math.max(0, Math.floor(remainingMs / 1000)),
  };
}

function OfferCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    function syncAll() {
      if (cancelled) return;
      setRemaining(resolveOfferTimer().remainingSeconds);
    }

    function onVisible() {
      if (document.visibilityState === "visible") {
        syncAll();
      }
    }

    syncAll();
    const timerId = window.setInterval(syncAll, 1000);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", syncAll);

    return () => {
      cancelled = true;
      window.clearInterval(timerId);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", syncAll);
    };
  }, []);

  return (
    <div className="store-offer-timer mx-auto flex flex-col items-center justify-center text-center" aria-live="polite">
      <p className="store-offer-timer-title text-center">Offer ending soon</p>
      <p className="store-offer-timer-digits text-center" suppressHydrationWarning>
        {remaining == null ? "--:--:--" : formatCountdown(remaining)}
      </p>
    </div>
  );
}

type Props = {
  product: StoreProductConfig;
};

/**
 * Gallery + buy box + sticky CTA.
 * CTA → InitiateCheckout (Pixel + CAPI) + Razorpay (email/phone collected there).
 */
export function ProductHero({ product }: Props) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const quantity = 1;
  const [selections, setSelections] = useState(product.defaultSelections);
  const [startingCheckout, setStartingCheckout] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const checkoutLock = useRef(false);

  const unitPrice = useMemo(() => {
    let total = product.price;
    for (const option of product.options) {
      const selected = selections[option.id];
      const match = option.values.find((v) => v.value === selected);
      if (match?.priceAdjust) total += match.priceAdjust;
    }
    return total;
  }, [product.options, product.price, selections]);

  const lineTotal = unitPrice * quantity;
  const buyLabel = product.buyButtonLabel;
  const buyButtonText = startingCheckout ? "Opening checkout…" : buyLabel;

  const viewContentSent = useRef(false);

  useEffect(() => {
    if (viewContentSent.current) return;
    viewContentSent.current = true;
    trackStoreViewContent({
      value: product.price,
      currency: product.currency,
      contentName: product.title,
      contentIds: [product.contentId],
    });
  }, [product.contentId, product.currency, product.price, product.title]);

  /** After first paint: warm Checkout.js + order API (never on mount). */
  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const win = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const runWarmup = () => {
      if (cancelled) return;
      prefetchRazorpayCheckout();
      void fetch("/api/store/razorpay/order", {
        method: "GET",
        cache: "no-store",
      }).catch(() => undefined);
    };

    const scheduleIdle = () => {
      if (cancelled) return;
      if (typeof win.requestIdleCallback === "function") {
        idleId = win.requestIdleCallback(() => runWarmup(), { timeout: 2500 });
      } else {
        timeoutId = window.setTimeout(runWarmup, 2000);
      }
    };

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      const onLoad = () => scheduleIdle();
      window.addEventListener("load", onLoad, { once: true });
      return () => {
        cancelled = true;
        window.removeEventListener("load", onLoad);
        if (idleId != null) win.cancelIdleCallback?.(idleId);
        if (timeoutId != null) window.clearTimeout(timeoutId);
      };
    }

    return () => {
      cancelled = true;
      if (idleId != null) win.cancelIdleCallback?.(idleId);
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    function onPageShow() {
      checkoutLock.current = false;
      setStartingCheckout(false);
    }

    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  function selectOption(optionId: string, value: string) {
    setSelections((prev) => ({ ...prev, [optionId]: value }));
  }

  function resetCheckoutUi() {
    checkoutLock.current = false;
    setStartingCheckout(false);
  }

  async function verifyAndRedirect(response: RazorpaySuccessResponse) {
    const clickIds = readBrowserMetaClickIds();
    const res = await fetch("/api/store/razorpay/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        ...(clickIds.fbp ? { fbp: clickIds.fbp } : {}),
        ...(clickIds.fbc ? { fbc: clickIds.fbc } : {}),
      }),
      cache: "no-store",
    });
    const data = (await res.json()) as {
      ok?: boolean;
      redirectUrl?: string;
      error?: { message?: string };
    };

    if (!res.ok || !data.ok || !data.redirectUrl) {
      throw new Error(data.error?.message ?? "Could not verify payment.");
    }

    window.location.assign(data.redirectUrl);
  }

  /**
   * Buy CTA: InitiateCheckout with available details, then open Razorpay.
   * Razorpay asks for email + phone on its checkout screen.
   */
  async function handleBuy() {
    if (checkoutLock.current || startingCheckout) return;

    checkoutLock.current = true;
    setPayError(null);
    setStartingCheckout(true);

    trackStoreInitiateCheckout({
      value: lineTotal,
      currency: product.currency,
      quantity,
      contentName: product.title,
      contentIds: [product.contentId],
    });

    try {
      // Start script download in parallel with order create (often already warm).
      const scriptReady = loadRazorpayCheckout();

      const clickIds = readBrowserMetaClickIds();
      const res = await fetch("/api/store/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: product.slug,
          quantity,
          selections,
          eventSourceUrl:
            typeof window !== "undefined" ? window.location.href : undefined,
          ...(clickIds.fbp ? { fbp: clickIds.fbp } : {}),
          ...(clickIds.fbc ? { fbc: clickIds.fbc } : {}),
        }),
        cache: "no-store",
      });
      const data = (await res.json()) as {
        ok?: boolean;
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
        productName?: string;
        description?: string;
        error?: { message?: string };
      };

      if (
        !res.ok ||
        !data.ok ||
        !data.orderId ||
        !data.keyId ||
        data.amount == null
      ) {
        throw new Error(data.error?.message ?? "Could not start checkout.");
      }

      await scriptReady;

      await openRazorpayCheckout({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency ?? "INR",
        name: data.productName ?? product.brandName,
        description:
          data.description ?? "Complete payment to receive your leads database",
        order_id: data.orderId,
        // No email/phone prefill — Razorpay collects both on checkout.
        handler: (response) => {
          void verifyAndRedirect(response).catch((error) => {
            setPayError(
              error instanceof Error
                ? error.message
                : "Payment received but verification failed. Contact support.",
            );
            resetCheckoutUi();
          });
        },
        modal: {
          ondismiss: () => {
            resetCheckoutUi();
          },
        },
      });
    } catch (error) {
      setPayError(
        error instanceof Error ? error.message : "Could not start payment.",
      );
      resetCheckoutUi();
    }
  }

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 xl:gap-20">
        <section aria-label="Product images" className="store-gallery">
          <div className="store-rating-badge">
            <span className="store-rating-stars" aria-hidden>⭐⭐⭐⭐⭐</span>
            <span className="store-rating-text">
              <strong>4.9</strong>/5{" "}
              <span className="store-rating-count">(2,400+ Happy Parents)</span>
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
              src={product.images[activeImage]?.src ?? product.images[0].src}
              alt={product.images[activeImage]?.alt ?? product.images[0].alt}
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
        </section>

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
              {formatReviewCount(product.reviewCount)} Happy Parents
            </span>
          </div>

          <div className="store-before-after mt-4 mix-blend-multiply">
            <Image
              src={cloudinaryDeliveryUrl(
                "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792164333/BEFORE_1.png",
                { width: 900, quality: "eco" },
              )}
              alt="Before: screen addiction vs After: happy engaged learning"
              width={938}
              height={675}
              className="h-auto w-full object-contain"
              priority
              unoptimized
            />
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
                    const headingText = hasColon ? text.slice(0, colonIdx).trim() : text;
                    const subText = hasColon ? text.slice(colonIdx + 1).trim() : null;
                    return (
                      <span className="store-highlight-text">
                        {badge ? (
                          <span className="store-highlight-badge">{badge}</span>
                        ) : null}
                        <span className="store-highlight-heading">{headingText}</span>
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

          <div className="mt-6 flex flex-col items-center justify-center text-center">
            {/* Price & Original Price */}
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

            {/* Discount % Badge Under Price */}
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

          {product.options.length > 0 ? (
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

          <h2
            className="mt-8 text-center sm:text-left text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#1e40af] leading-tight"
            style={{ fontFamily: "var(--font-store-display), Fredoka, ui-rounded, sans-serif" }}
          >
            Happy Kids = Happy Parents
          </h2>

          <ProductVideo />

          {/* Problem & Solution Card (Dark Background Theme) */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-7 shadow-xl text-white">
            <div className="flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-950/80 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-800/80">
                <AlertCircle className="size-3.5 text-rose-400" />
                Parent Alert • Child Development
              </span>
            </div>

            <h3
              className="mt-3 text-center text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight"
              style={{ fontFamily: "var(--font-store-display), Fredoka, ui-rounded, sans-serif" }}
            >
              Do You Know?
            </h3>
            <p className="mt-1.5 text-center text-sm sm:text-base font-medium text-slate-300">
              Excessive mobile screen time is secretly hurting your child&apos;s daily growth:
            </p>

            {/* Negative Impacts - Light Cards */}
            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3.5 rounded-2xl border border-white/90 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 border border-rose-200 mt-0.5">
                  <X className="size-4" strokeWidth={2.5} />
                </span>
                <div className="text-sm leading-relaxed text-slate-700">
                  <strong className="font-extrabold text-slate-900">Weak Focus:</strong>{" "}
                  Cannot sit in one place, easily distracted, and struggles to pay attention.
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-white/90 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 border border-rose-200 mt-0.5">
                  <X className="size-4" strokeWidth={2.5} />
                </span>
                <div className="text-sm leading-relaxed text-slate-700">
                  <strong className="font-extrabold text-slate-900">Severe Emotional Disconnect:</strong>{" "}
                  Zombie-like staring, loss of eye contact, and severe anxiety or crying fits whenever the phone is taken away.
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-2xl border border-white/90 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 border border-rose-200 mt-0.5">
                  <X className="size-4" strokeWidth={2.5} />
                </span>
                <div className="text-sm leading-relaxed text-slate-700">
                  <strong className="font-extrabold text-slate-900">Permanent Academic Lag:</strong>{" "}
                  A complete lack of focus and severely delayed writing skills, leaving them permanently behind their classmates.
                </div>
              </div>
            </div>

            {/* Downward pointing thick block arrow in normal green color towards the solution box */}
            <div className="my-3 sm:my-3.5 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10 sm:size-12 text-[#22c55e] drop-shadow-md"
                aria-hidden="true"
              >
                <path d="M12 22l-9-9h5V2h8v11h5L12 22z" />
              </svg>
            </div>

            {/* The Easy Solution Card (White Background & Normal White Border) */}
            <div className="rounded-2xl border border-white/90 bg-white p-5 sm:p-6 shadow-md text-slate-900">
              <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-green-700">
                <CheckCircle2 className="size-4 text-green-600" />
                <span>The Easy Solution</span>
              </div>

              <div className="mt-3 flex items-start gap-3">
                <span className="text-2xl sm:text-3xl select-none leading-none mt-0.5">💬</span>
                <div className="space-y-2 text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-snug">
                  <p>
                    Instead of constantly saying{" "}
                    <mark className="inline-block rounded-lg bg-amber-200/90 px-2 py-0.5 font-black text-slate-950 border border-amber-300 shadow-xs not-italic">
                      “Put the phone away!”
                    </mark>
                  </p>
                  <p className="font-extrabold text-slate-900">
                    Give your child something they{" "}
                    <mark className="inline-block rounded-lg bg-green-200 px-2 py-0.5 font-black text-green-950 border border-green-400 shadow-xs not-italic">
                      actually WANT to do.
                    </mark>
                  </p>
                </div>
              </div>
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
              <span className="store-sticky-buy-was">
                {formatMoney(product.compareAtPrice, product.currencySymbol)}
              </span>
            ) : null}
          </div>
          <div className="store-sticky-buy-actions">
            <p className="text-center lg:text-left text-sm sm:text-base font-black tracking-tight text-red-600 leading-tight">
              Stop your kid&apos;s screen addiction before it&apos;s too late.
            </p>
            <StoreBuyCtaButton
              onClick={() => void handleBuy()}
              disabled={startingCheckout}
              busy={startingCheckout}
              buttonClassName="min-h-[2.85rem] px-5 sm:px-6"
              className="w-full lg:w-auto lg:min-w-[15rem] lg:shrink-0"
              pulse
            >
              {buyButtonText}
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
          src={product.images[activeImage]?.src ?? product.images[0].src}
          alt={product.images[activeImage]?.alt ?? product.images[0].alt}
          onClose={() => setZoomOpen(false)}
        />
      ) : null}
    </>
  );
}
