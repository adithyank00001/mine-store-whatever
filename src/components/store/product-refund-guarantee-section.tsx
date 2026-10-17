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
      className="relative mt-8 sm:mt-12 overflow-hidden rounded-3xl border-2 border-[#fc7b02] bg-white p-6 sm:p-8 lg:p-10 text-center shadow-sm"
    >
      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
        {/* Money Back Guarantee Badge Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/store/money-back-guarantee.png"
          alt="100% Money Back Guarantee Badge"
          className="w-40 sm:w-48 md:w-56 h-auto object-contain"
          loading="lazy"
          decoding="async"
        />

        {/* Guarantee Heading */}
        <h2
          className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#1e40af]"
          style={{
            fontFamily: "var(--font-store-display), Fredoka, ui-rounded, sans-serif",
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

        {/* Motivational Callout under CTA */}
        <h3
          className="mt-4 text-base sm:text-lg md:text-xl font-black tracking-tight text-[#1e40af] uppercase"
          style={{
            fontFamily: "var(--font-store-display), Fredoka, ui-rounded, sans-serif",
          }}
        >
          UNLOCK YOUR CHILD&apos;S BRIGHT FUTURE TODAY!
        </h3>

        {/* Reassurance Subtext */}
        <p className="mt-2.5 text-xs font-semibold text-slate-500">
          🔒 Instant Google Drive delivery · 100% Safe &amp; Secure Checkout
        </p>
      </div>
    </section>
  );
}
