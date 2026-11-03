"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { readBrowserMetaClickIds } from "@/lib/meta/fbc";
import {
  trackStoreInitiateCheckout,
  trackStoreViewContent,
} from "@/lib/meta/store-track";
import {
  loadRazorpayCheckout,
  openRazorpayCheckout,
  prefetchRazorpayCheckout,
  type RazorpaySuccessResponse,
} from "@/lib/store/load-razorpay";
import type { StoreProductConfig } from "@/lib/store/product-content";

export type UseProductCheckoutOptions = {
  initialQuantity?: number;
};

export type UseProductCheckoutReturn = {
  /** Selected product options (e.g. format, license tier) */
  selections: Record<string, string>;
  /** Update an option selection */
  selectOption: (optionId: string, value: string) => void;
  /** Current quantity (defaults to 1) */
  quantity: number;
  /** Change quantity */
  setQuantity: (qty: number) => void;
  /** Calculated price per unit after option price adjustments */
  unitPrice: number;
  /** Total price for the order (unitPrice * quantity) */
  lineTotal: number;
  /** True while the checkout modal is opening or processing */
  startingCheckout: boolean;
  /** Any payment or network error message, or null */
  payError: string | null;
  /** Clear active error message */
  clearPayError: () => void;
  /**
   * Primary checkout action:
   * 1. Fires Meta InitiateCheckout tracking event (Pixel + CAPI)
   * 2. Calls /api/store/razorpay/order to create secure order
   * 3. Opens Razorpay popup modal
   * 4. On payment completion, verifies signature at /api/store/razorpay/verify
   * 5. Redirects user to /store/success download page
   */
  handleBuy: () => Promise<void>;
  /** Reset checkout lock and loading state if needed */
  resetCheckoutUi: () => void;
};

/**
 * Shared technical checkout hook for all store product pages.
 *
 * Encapsulates:
 * - Meta Pixel & CAPI ViewContent tracking on mount
 * - Background pre-warming of Razorpay script + order API
 * - Order creation, modal lifecycle, and signature verification
 * - Back-button / pageshow lock handling
 *
 * UI pages can design their layout freely and simply wire up `handleBuy` to their buy button.
 */
export function useProductCheckout(
  product: StoreProductConfig,
  opts?: UseProductCheckoutOptions,
): UseProductCheckoutReturn {
  const [quantity, setQuantity] = useState(opts?.initialQuantity ?? 1);
  const [selections, setSelections] = useState<Record<string, string>>(
    product.defaultSelections ?? {},
  );
  const [startingCheckout, setStartingCheckout] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const checkoutLock = useRef(false);
  const viewContentSent = useRef(false);

  // Compute unit price including selected option price adjustments
  const unitPrice = useMemo(() => {
    let total = product.price;
    if (product.options && product.options.length > 0) {
      for (const option of product.options) {
        const selected = selections[option.id];
        const match = option.values.find((v) => v.value === selected);
        if (match?.priceAdjust) total += match.priceAdjust;
      }
    }
    return total;
  }, [product.options, product.price, selections]);

  const lineTotal = unitPrice * quantity;

  // Track ViewContent on mount (deduped)
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

  // Warmup Checkout.js + order API on idle callback after first paint
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

  // Reset checkout lock when navigated via browser back/forward cache
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

  function clearPayError() {
    setPayError(null);
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
        name: data.productName ?? product.brandName ?? "Trusted Seller",
        description:
          data.description ?? `Complete payment to download ${product.title}`,
        order_id: data.orderId,
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

  return {
    selections,
    selectOption,
    quantity,
    setQuantity,
    unitPrice,
    lineTotal,
    startingCheckout,
    payError,
    clearPayError,
    handleBuy,
    resetCheckoutUi,
  };
}

