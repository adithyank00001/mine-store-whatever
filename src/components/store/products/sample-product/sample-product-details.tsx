import { Check, Plus, ShieldCheck, X } from "lucide-react";
import type { ReactNode } from "react";

import { ProductStars } from "@/components/store/product-stars";
import { StoreFinalCtaBuyButton } from "@/components/store/store-buy-cta-button";
import { cloudinaryDeliveryUrl } from "@/lib/store/cloudinary";
import type { StoreProductContent } from "@/lib/store/product-content";
import { formatReviewCount } from "@/lib/store/product-format";

import { SampleReelsCarousel } from "./sample-reels-carousel";

/**
 * Isolated Sample Product Details.
 *
 * Dedicated to /store/product/sample-product.
 * You can freely edit sections, styling, copy, and components here without affecting any other product!
 */
export function SampleProductDetails({
  product,
  children,
}: {
  product: StoreProductContent;
  children?: ReactNode;
}) {
  return (
    <section className="store-details" aria-label="Product details">
      {/* What's included section */}
      {(product.included && product.included.length > 0) ||
      (product.bonusIncluded && product.bonusIncluded.length > 0) ? (
        <article className="store-included">
          <h2 className="!font-sans !font-black !tracking-tight text-2xl sm:text-3xl lg:text-4xl !text-slate-900">
            {product.includedHeadline || "What you will get"}
          </h2>
          {product.includedNote ? (
            <p className="store-included-note !text-slate-600 font-medium text-base sm:text-lg mb-6">
              {product.includedNote}
            </p>
          ) : null}

          {product.included && product.included.length > 0 ? (
            <ul className="store-category-grid">
              {product.included.map((item) => {
                const labelLower = item.label.toLowerCase();
                const isMore =
                  labelLower.includes("and many more") ||
                  labelLower.includes("and so much more") ||
                  labelLower.includes("bonus");
                return (
                  <li
                    key={item.label}
                    className={isMore ? "store-category-more" : undefined}
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-emerald-600"
                      strokeWidth={2.5}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-1.5 flex-1">
                      <span>{item.label}</span>
                      {typeof item.value === "number" ? (
                        <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                          Worth {product.currencySymbol}
                          {item.value}
                        </span>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {product.bonusIncluded && product.bonusIncluded.length > 0 ? (
            <div className="store-bonus-wrap mt-6">
              <p className="store-bonus-surprise">
                Exclusive Bonus Pack Included
                <span className="store-bonus-surprise-emoji" aria-hidden="true">
                  {" "}
                  🎁👇
                </span>
              </p>
              <div className="store-bonus">
                <div className="store-bonus-heading">
                  <span className="store-bonus-emoji" aria-hidden="true">
                    ⚡
                  </span>
                  <div className="store-bonus-heading-text">
                    <p className="store-bonus-title">Included Free Bonuses</p>
                    <p className="store-bonus-urgency">(Limited Edition Bonus Pack)</p>
                  </div>
                </div>
                <ul className="store-bonus-list">
                  {product.bonusIncluded.map((item) => (
                    <li key={item.label}>
                      <span className="store-bonus-item-emoji" aria-hidden="true">
                        🔥
                      </span>
                      <div className="flex flex-wrap items-center justify-between gap-2 flex-1">
                        <span>{item.label}</span>
                        {typeof item.value === "number" ? (
                          <span className="store-category-value text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                            Value: {product.currencySymbol}
                            {item.value}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </article>
      ) : null}

      {/* Sample Reels Section */}
      <SampleReelsCarousel />

      {/* Target Audience Section: This Is For You If You Are... - 3D Box Style */}
      <section
        className="store-3d-box rounded-3xl p-6 sm:p-8 lg:p-10 my-8 sm:my-10"
        aria-label="This Is For You If You Are..."
      >
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-300 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] mb-3">
            🎯 Target Audience
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 font-sans">
            This Is For You If You Are...
          </h2>
          <p className="mt-2 text-sm sm:text-base font-medium text-slate-700">
            Whether you are starting from zero or scaling an existing brand, this bundle saves you hundreds of hours.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Content Creators */}
          <div className="flex flex-col rounded-2xl border-2 border-slate-900 bg-amber-50/50 p-5 sm:p-6 shadow-[3px_4px_0px_0px_#0f172a] hover:shadow-[5px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-200 text-2xl mb-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              📱
            </div>
            <h3 className="text-lg font-black text-slate-950 tracking-tight">
              Content Creators
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium flex-1">
              Never run out of viral ideas again. Post multiple times a day effortlessly and watch your engagement skyrocket.
            </p>
          </div>

          {/* Card 2: Theme Page Owners */}
          <div className="flex flex-col rounded-2xl border-2 border-slate-900 bg-orange-50/50 p-5 sm:p-6 shadow-[3px_4px_0px_0px_#0f172a] hover:shadow-[5px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex size-12 items-center justify-center rounded-xl bg-orange-200 text-2xl mb-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              🚀
            </div>
            <h3 className="text-lg font-black text-slate-950 tracking-tight">
              Theme Page Owners
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium flex-1">
              The fastest way to build faceless Instagram pages in multiple niches and monetize your following.
            </p>
          </div>

          {/* Card 3: Freelancers & Agencies */}
          <div className="flex flex-col rounded-2xl border-2 border-slate-900 bg-blue-50/50 p-5 sm:p-6 shadow-[3px_4px_0px_0px_#0f172a] hover:shadow-[5px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-200 text-2xl mb-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              💼
            </div>
            <h3 className="text-lg font-black text-slate-950 tracking-tight">
              Freelancers & Agencies
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium flex-1">
              Provide instant, high-quality, high-retention content to your social media management clients without spending hours editing.
            </p>
          </div>

          {/* Card 4: Business Owners */}
          <div className="flex flex-col rounded-2xl border-2 border-slate-900 bg-emerald-50/50 p-5 sm:p-6 shadow-[3px_4px_0px_0px_#0f172a] hover:shadow-[5px_6px_0px_0px_#0f172a] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-200 text-2xl mb-4 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
              📈
            </div>
            <h3 className="text-lg font-black text-slate-950 tracking-tight">
              Business Owners
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 font-medium flex-1">
              Drive massive, free organic traffic to your products and services by staying consistent on the algorithm.
            </p>
          </div>
        </div>
      </section>

      {/* Before vs. After Section - Clean & Unboxed */}
      <section className="w-full my-8 sm:my-10" aria-label="Before versus After">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-800 border border-slate-200 mb-3">
            ⚖️ The Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-sans">
            Still doing it the hard way? Not anymore
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            See the difference between burning out creating content from scratch versus scaling on autopilot.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Before: The Old, Slow Way */}
          <div className="flex flex-col rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 border border-rose-200 font-bold">
                <X className="size-5" strokeWidth={2.5} />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-rose-950 tracking-tight">
                  Before (The Old, Slow Way)
                </h3>
                <p className="text-xs font-medium text-rose-700">Painful, slow & exhausting</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-medium text-slate-700 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-200/80 text-rose-700 mt-0.5">
                  <X className="size-3.5" strokeWidth={3} />
                </span>
                <span>Spending hours brainstorming content ideas.</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-medium text-slate-700 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-200/80 text-rose-700 mt-0.5">
                  <X className="size-3.5" strokeWidth={3} />
                </span>
                <span>Wasting time sourcing clips and editing in Premiere or CapCut.</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-medium text-slate-700 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-200/80 text-rose-700 mt-0.5">
                  <X className="size-3.5" strokeWidth={3} />
                </span>
                <span>Struggling to post daily and missing algorithm boosts.</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-medium text-slate-700 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-rose-200/80 text-rose-700 mt-0.5">
                  <X className="size-3.5" strokeWidth={3} />
                </span>
                <span>Low video views and terrible audience retention.</span>
              </li>
            </ul>
          </div>

          {/* After: The Smart, Fast Way */}
          <div className="flex flex-col rounded-2xl border-2 border-emerald-500 bg-emerald-50/60 p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-teal-600 text-white text-[11px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              Recommended
            </div>

            <div className="flex items-center gap-2 mb-5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-300 font-bold">
                <Check className="size-5" strokeWidth={3} />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-emerald-950 tracking-tight">
                  After (The Smart, Fast Way)
                </h3>
                <p className="text-xs font-semibold text-emerald-700">Effortless, fast & viral-ready</p>
              </div>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 mt-0.5">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>Instantly access 1,000,000+ high-quality, viral-proven reels.</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 mt-0.5">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>Upload directly to Instagram, YouTube Shorts, or Facebook in seconds.</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 mt-0.5">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>Post 3x a day consistently to trigger explosive follower growth.</span>
              </li>
              <li className="flex items-start gap-3 text-sm sm:text-[15px] font-semibold text-slate-900 leading-snug">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-emerald-800 mt-0.5">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>Establish a premium, professional brand identity in your niche.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Real Earnings Shared By Our Customers Section - Clean & Unboxed */}
      <section className="w-full my-8 sm:my-10" aria-label="Real Earnings Shared By Our Customers">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-sans">
            Real Earnings Shared By Our Customers
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Real payouts and monetization milestones achieved using content from this mega bundle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {[
            {
              imageUrl: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793697962/97fd4b57-89f8-42f1-9ffe-c74db89d4988.png",
              caption: "Earned $1,075 from YouTube",
            },
            {
              imageUrl: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793697208/e5d19b4c-8986-48ed-a1d0-30246ce86a88.png",
              caption: "Earned $547 from Facebook",
            },
            {
              imageUrl: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793697817/de9a0b81-76d9-475f-bb7a-38fff2dcb4b2.png",
              caption: "Earned $129 from YouTube",
            },
            {
              imageUrl: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1793697212/10a73364-b346-44c8-ae0e-f59663e4b708.png",
              caption: "Earned $27 from YouTube",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cloudinaryDeliveryUrl(item.imageUrl, { width: 600, quality: "good" })}
                alt={item.caption}
                loading="lazy"
                className="w-full h-auto rounded-xl sm:rounded-2xl border border-black shadow-xs"
              />
              <p className="mt-2 text-center text-xs sm:text-sm font-extrabold text-emerald-600">
                {item.caption}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      {product.reviews && product.reviews.length > 0 ? (
        <section className="store-reviews" aria-label="Customer reviews">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="!mb-1">Customer Reviews</h2>
              <p className="text-sm text-[var(--store-muted)]">
                Verified feedback from real purchasers
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 shadow-xs">
              <ProductStars rating={product.rating} />
              <span className="text-sm font-bold text-[var(--store-ink)]">
                {product.rating.toFixed(1)} / 5.0
              </span>
              <span className="text-xs text-[var(--store-muted)]">
                ({formatReviewCount(product.reviewCount)} Customers)
              </span>
            </div>
          </div>
          <ul className="store-reviews-list">
            {product.reviews.map((review, i) => (
              <li key={`${review.name}-${i}`} className="store-review">
                <div className="store-review-head">
                  <div className="store-review-avatar">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cloudinaryDeliveryUrl(review.avatar, {
                        width: 72,
                        height: 72,
                      })}
                      alt={review.name}
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <p className="store-review-name">{review.name}</p>
                    <ProductStars rating={review.rating ?? 5} />
                  </div>
                </div>
                <p className="store-review-quote">&ldquo;{review.quote}&rdquo;</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* How it works & FAQ split */}
      {(product.howItWorks && product.howItWorks.length > 0) ||
      (product.faqs && product.faqs.length > 0) ? (
        <div className="store-details-split">
          {product.howItWorks && product.howItWorks.length > 0 ? (
            <article>
              <h2>How it works</h2>
              <ol>
                {product.howItWorks.map((step, index) => {
                  const colonIdx = step.indexOf(":");
                  const hasColon = colonIdx !== -1;
                  const title = hasColon ? step.slice(0, colonIdx).trim() : null;
                  const body = hasColon ? step.slice(colonIdx + 1).trim() : step;
                  return (
                    <li key={step} className="!items-center">
                      <span>{index + 1}</span>
                      <p className="font-bold text-[var(--store-ink)]">
                        {title ? (
                          <>
                            <strong className="font-extrabold text-[var(--store-ink)]">
                              {title}:{" "}
                            </strong>
                            {body}
                          </>
                        ) : (
                          body
                        )}
                      </p>
                    </li>
                  );
                })}
              </ol>
            </article>
          ) : null}

          {product.faqs && product.faqs.length > 0 ? (
            <div className="store-faq">
              <h2>Frequently Asked Questions</h2>
              <div className="divide-y divide-[var(--store-line)]">
                {product.faqs.map((faq) => (
                  <details key={faq.question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-[var(--store-ink)] marker:content-none [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <Plus className="size-4 shrink-0 transition group-open:rotate-45" />
                    </summary>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--store-muted)]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Guaranteed Purchase Box */}
      <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
          <ShieldCheck className="size-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--store-ink)]">
            100% Money-Back Guaranteed
          </h3>
          <p className="mt-1 text-sm text-[var(--store-muted)]">
            Access link is generated on your screen immediately upon successful checkout and also
            emailed to you for permanent access. If you don&apos;t get access, you will receive a
            full refund — so there is no risk for you.
          </p>
        </div>
      </div>

      {/* Final Call to Action */}
      {product.finalCta ? (
        <section className="store-final-cta !mt-0 !text-center" aria-label="Final call to action">
          <h2 className="store-final-cta-headline">{product.finalCta.headline}</h2>
          <p className="store-final-cta-body !mx-auto">{product.finalCta.body}</p>
          <div className="store-final-cta-actions">
            <StoreFinalCtaBuyButton
              buttonClassName="min-h-[3.25rem] text-sm sm:text-base lg:text-lg font-black tracking-wide uppercase px-4 sm:px-6"
            >
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
            </StoreFinalCtaBuyButton>
            <div className="flex justify-center items-center pt-2">
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
            <p className="store-final-cta-note">{product.footerNote}</p>
          </div>
        </section>
      ) : null}

      {children}
    </section>
  );
}

