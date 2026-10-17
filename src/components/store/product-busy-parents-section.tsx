"use client";

import { Check, Clock, Printer, FolderCheck } from "lucide-react";

export function ProductBusyParentsSection() {
  return (
    <section aria-label="No Free Time? No Problem." className="w-full">
      {/* Standardized Header */}
      <div className="text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold text-blue-700 border border-blue-200/80 mb-2.5">
          <Clock className="size-3.5 text-blue-600" />
          Designed For Busy Parents
        </span>

        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#1e40af]"
          style={{ fontFamily: "var(--font-store-display), Fredoka, ui-rounded, sans-serif" }}
        >
          No Free Time? No Problem.
        </h2>

        <p className="mt-2 text-sm sm:text-base font-medium text-slate-600 leading-relaxed">
          You don&apos;t need hours of free time or teaching experience. Here is how easy it is:
        </p>
      </div>

      {/* 3 Standardized Benefit Cards with 3D Box Style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
        {/* Card 1: 15 Minutes a Day */}
        <div className="store-3d-box flex flex-col justify-between rounded-3xl p-5 sm:p-6">
          <div>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 shadow-xs mb-3.5">
              <Clock className="size-5" />
            </div>

            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Just 15 Minutes a Day
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
              Auto-engaging and easy to follow. Your child naturally builds skills without you having to explain a thing, giving you time to focus on your day.
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <Check className="size-3.5 text-emerald-600 shrink-0" strokeWidth={3} />
            <span>Zero phone tantrums, pure focus</span>
          </div>
        </div>

        {/* Card 2: Super Cheap to Print */}
        <div className="store-3d-box flex flex-col justify-between rounded-3xl p-5 sm:p-6">
          <div>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200/80 shadow-xs mb-3.5">
              <Printer className="size-5" />
            </div>

            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Super Cheap to Print
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
              Just print at home or any local print shop in standard Black &amp; White. No expensive color ink needed!
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-700">
            <Check className="size-3.5 text-blue-600 shrink-0" strokeWidth={3} />
            <span>Print anywhere for ~₹0.50 / page</span>
          </div>
        </div>

        {/* Card 3: Find Pages Instantly */}
        <div className="store-3d-box flex flex-col justify-between rounded-3xl p-5 sm:p-6">
          <div>
            <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs mb-3.5">
              <FolderCheck className="size-5" />
            </div>

            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              Find Pages Instantly
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed font-medium">
              No messy files. Everything is neatly sorted by age for 1-click access.
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-amber-800">
            <Check className="size-3.5 text-amber-700 shrink-0" strokeWidth={3} />
            <span>Organized folders, ready in seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}
