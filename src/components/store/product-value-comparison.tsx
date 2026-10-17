"use client";

import { Sparkles, Check, X, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { StoreFinalCtaBuyButton } from "@/components/store/store-buy-cta-button";

export function ProductValueComparison({ price = 497 }: { price?: number }) {
  return (
    <section
      aria-label={`The Best ₹${price} You Will Ever Spend`}
      className="relative my-6 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      {/* Subtle brand ambient accents */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-blue-50/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-slate-100/60 blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/70 px-3.5 py-1 text-xs font-bold text-blue-700">
          <Sparkles className="size-3.5 text-blue-600" />
          <span>Smart Parent Investment</span>
        </div>

        <h2
          className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900"
          style={{ fontFamily: "var(--font-store-display), ui-serif, Georgia, serif" }}
        >
          The Best ₹{price} You Will Ever Spend
        </h2>

        <p className="mt-2 text-base sm:text-lg font-bold text-slate-600 italic">
          Think about it...
        </p>
      </div>

      {/* 3-Column Value Anchoring Grid */}
      <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Option 1: Plastic Toy */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 transition-all duration-200 hover:border-slate-300">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                Plastic Toy
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <X className="size-3.5" strokeWidth={2.5} />
              </span>
            </div>

            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-slate-700">
                ₹800
              </div>
              <p className="mt-1 text-xs font-semibold text-rose-600 uppercase tracking-wide">
                Wasted in 48 Hours
              </p>
            </div>

            <p className="mt-3.5 text-sm leading-relaxed text-slate-600">
              <strong className="font-extrabold text-slate-900">₹800</strong> buys a plastic toy that your child gets bored of in two days.
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/80">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <X className="size-3 text-rose-500" strokeWidth={2.5} />
              Clutter under the bed, zero learning
            </span>
          </div>
        </div>

        {/* Option 2: 10 Activity Books */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 transition-all duration-200 hover:border-slate-300">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/80 px-2.5 py-0.5 text-xs font-bold text-slate-600">
                Store Activity Books
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <X className="size-3.5" strokeWidth={2.5} />
              </span>
            </div>

            <div className="mt-4">
              <div className="text-2xl sm:text-3xl font-black text-slate-700">
                ₹1,500+
              </div>
              <p className="mt-1 text-xs font-semibold text-rose-600 uppercase tracking-wide">
                Finished in 1 Week
              </p>
            </div>

            <p className="mt-3.5 text-sm leading-relaxed text-slate-600">
              <strong className="font-extrabold text-slate-900">₹1,500+</strong> is what you would pay at the store for just 10 physical activity books.
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/80">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <X className="size-3 text-rose-500" strokeWidth={2.5} />
              Single-use only, cannot reprint
            </span>
          </div>
        </div>

        {/* Option 3: 15,000+ Printables Bundle (THE WINNER) */}
        <div className="relative flex flex-col justify-between rounded-2xl border-2 border-blue-600 bg-blue-50/30 p-5 sm:p-6 shadow-lg shadow-blue-600/5 ring-4 ring-blue-500/10 transition-all duration-200">
          {/* Winner Floating Ribbon */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
              <Sparkles className="size-3 text-amber-300 fill-amber-300" />
              The Smartest Choice
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/70 pt-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-extrabold text-blue-900">
                15,000+ Pages Bundle
              </span>
              <span className="flex size-6 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-blue-950">
                  ₹{price}
                </span>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  One-Time Only
                </span>
              </div>
              <p className="mt-1 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                4 Full Years of Screen-Free Growth
              </p>
            </div>

            <div className="mt-3.5 text-sm leading-relaxed text-slate-800">
              <strong className="font-black text-blue-950">For just ₹{price},</strong> you get{" "}
              <strong className="font-extrabold text-slate-900 underline decoration-blue-500 decoration-2">
                15,000+ printable pages
              </strong>{" "}
              that will keep your child smart, happy, and away from mobile screens for the next 4 years.
            </div>

            {/* Micro perks */}
            <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
              <li className="flex items-center gap-2">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span>Less than <strong>₹0.03</strong> per activity page</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span>Print unlimited times for all siblings</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span>Lifetime access via Google Drive &amp; WhatsApp</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-3.5 border-t border-blue-200/70">
            <StoreFinalCtaBuyButton label={`Get This Bundle for ₹${price}`} />
          </div>
        </div>
      </div>

      {/* Footer Trust Guarantee strip */}
      <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium text-center">
        <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
          <Zap className="size-3.5 text-amber-500 fill-amber-500" />
          Instant Digital Access
        </span>
        <span>•</span>
        <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          No Monthly Subscriptions
        </span>
        <span>•</span>
        <span>Unlimited Home Re-printing</span>
      </div>
    </section>
  );
}
