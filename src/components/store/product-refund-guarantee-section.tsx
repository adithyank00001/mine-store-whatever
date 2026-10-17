"use client";

import { StoreFinalCtaBuyButton } from "@/components/store/store-buy-cta-button";

export function ProductRefundGuaranteeSection({
  buttonLabel = "Get This Bundle For My Child",
}: {
  buttonLabel?: string;
}) {
  return (
    <section
      aria-label="100% Refund Guarantee"
      className="relative mt-8 sm:mt-12 overflow-hidden rounded-3xl border-2 border-emerald-200/90 bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/40 p-6 sm:p-8 lg:p-10 text-center shadow-xs"
    >
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
        {/* Money Back Guarantee Badge Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/store/money-back-guarantee.png"
          alt="100% Money Back Guarantee Badge"
          className="size-24 sm:size-28 md:size-32 object-contain drop-shadow-sm"
          loading="lazy"
          decoding="async"
        />

        {/* Guarantee Heading */}
        <h2
          className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
          style={{
            fontFamily: "var(--font-store-display), ui-serif, Georgia, serif",
          }}
        >
          🛡️ 100% Refund Guarantee
        </h2>

        {/* Guarantee Policy Copy */}
        <p className="mt-2.5 text-sm sm:text-base font-medium text-slate-700 leading-relaxed max-w-md">
          If you don&apos;t receive your download link immediately after payment, you get a 100% full refund.
        </p>

        {/* CTA Button */}
        <div className="mt-6 w-full max-w-sm sm:max-w-md">
          <StoreFinalCtaBuyButton label={buttonLabel} />
        </div>

        {/* Reassurance Subtext */}
        <p className="mt-3 text-xs font-semibold text-slate-500">
          🔒 Instant Google Drive delivery · 100% Safe &amp; Secure Checkout
        </p>
      </div>
    </section>
  );
}
