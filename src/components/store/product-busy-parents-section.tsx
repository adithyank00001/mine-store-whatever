"use client";

import { Check, Clock, Printer, FolderCheck, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { StoreFinalCtaBuyButton } from "@/components/store/store-buy-cta-button";

export function ProductBusyParentsSection() {
  return (
    <section
      aria-label="No Free Time? No Problem."
      className="relative my-6 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-sm"
    >
      {/* Soft ambient background accent */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-blue-50/50 blur-3xl"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 border border-blue-200/80">
          <Clock className="size-3.5 text-blue-600" />
          Designed For Busy Parents
        </span>

        <h2
          className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900"
          style={{ fontFamily: "var(--font-store-display), ui-serif, Georgia, serif" }}
        >
          No Free Time? No Problem.
        </h2>

        <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
          You don&apos;t need hours of free time or teaching experience. Here is how easy it is:
        </p>
      </div>

      {/* 3 Standardized Benefit Cards */}
      <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {/* Card 1: 15 Minutes a Day */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 sm:p-6 transition-all duration-300 hover:bg-white hover:border-emerald-300 hover:shadow-md">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-xs">
                <Clock className="size-5" />
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-emerald-800 border border-emerald-200/70">
                Self-Guided
              </span>
            </div>

            <h3 className="mt-4 flex items-center gap-2 text-base sm:text-lg font-black text-slate-900 tracking-tight">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              Just 15 Minutes a Day
            </h3>

            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
              No teaching needed. Your child plays and learns independently while you relax.
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <Check className="size-3.5 text-emerald-600" strokeWidth={3} />
            <span>Zero phone tantrums, pure focus</span>
          </div>
        </div>

        {/* Card 2: Super Cheap to Print */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 sm:p-6 transition-all duration-300 hover:bg-white hover:border-blue-300 hover:shadow-md">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 shadow-xs">
                <Printer className="size-5" />
              </div>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-blue-800 border border-blue-200/70">
                Pocket Friendly
              </span>
            </div>

            <h3 className="mt-4 flex items-center gap-2 text-base sm:text-lg font-black text-slate-900 tracking-tight">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              Super Cheap to Print
            </h3>

            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
              Just print at any local shop in normal black-and-white. No expensive color ink needed!
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-bold text-blue-700">
            <Check className="size-3.5 text-blue-600" strokeWidth={3} />
            <span>Print anywhere for ~₹0.50/page</span>
          </div>
        </div>

        {/* Card 3: Find Pages Instantly */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-slate-50/60 p-5 sm:p-6 transition-all duration-300 hover:bg-white hover:border-amber-300 hover:shadow-md">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs">
                <FolderCheck className="size-5" />
              </div>
              <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-amber-800 border border-amber-200/70">
                Ages 2–7 Yrs
              </span>
            </div>

            <h3 className="mt-4 flex items-center gap-2 text-base sm:text-lg font-black text-slate-900 tracking-tight">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              Find Pages Instantly
            </h3>

            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
              No messy files. Everything is neatly sorted by age (2–7 Yrs) for fast, 1-click printing.
            </p>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/80 flex items-center gap-1.5 text-xs font-bold text-amber-800">
            <Check className="size-3.5 text-amber-700" strokeWidth={3} />
            <span>Organized folders, ready in seconds</span>
          </div>
        </div>
      </div>

      {/* High-Converting CTA Box */}
      <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-sm sm:max-w-md">
          <StoreFinalCtaBuyButton label="Get This Bundle For My Child" />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Zap className="size-3.5 text-amber-500 fill-amber-500" />
            Instant WhatsApp &amp; Drive Delivery
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Sparkles className="size-3.5 text-blue-600" />
            Lifetime Access &amp; Free Updates
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="size-3.5 text-emerald-600" />
            100% Safe Checkout
          </span>
        </div>
      </div>
    </section>
  );
}
