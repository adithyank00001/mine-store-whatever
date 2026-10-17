import { Check, Plus, ShieldCheck, Star } from "lucide-react";
import type { ReactNode } from "react";

import { ProductBusyParentsSection } from "@/components/store/product-busy-parents-section";
import { ProductReviewFormLazy } from "@/components/store/product-review-form-lazy";
import { ProductSamplesCarousel } from "@/components/store/product-samples-carousel";
import { ProductStars } from "@/components/store/product-stars";
import { ProductValueComparison } from "@/components/store/product-value-comparison";
import { StoreFinalCtaBuyButton } from "@/components/store/store-buy-cta-button";
import { cloudinaryDeliveryUrl } from "@/lib/store/cloudinary";
import type { StoreProductContent } from "@/lib/store/product-content";

export function ProductDetails({
  product,
  children,
}: {
  product: StoreProductContent;
  children?: ReactNode;
}) {
  return (
    <section className="store-details" aria-label="Product details">
      <article className="store-included">
        <h2>What&apos;s included in the learning bundle?</h2>
        <p className="store-included-headline">{product.includedHeadline}</p>
        <p className="store-included-note">{product.includedNote}</p>
        <ul className="store-category-grid">
          {product.included.map((item) => {
            const labelLower = item.label.toLowerCase();
            const isMore =
              labelLower.includes("and many more") ||
              labelLower.includes("more than 200");
            return (
              <li
                key={item.label}
                className={isMore ? "store-category-more" : undefined}
              >
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
        {product.bonusIncluded.length > 0 ? (
          <div className="store-bonus-wrap">
            <p className="store-bonus-surprise">
              Wait… we have a surprise for you.
              <span className="store-bonus-surprise-emoji" aria-hidden="true">
                😉👇
              </span>
            </p>
            <div className="store-bonus">
              <div className="store-bonus-heading">
                <span className="store-bonus-emoji" aria-hidden="true">
                  🎁
                </span>
                <div className="store-bonus-heading-text">
                  <p className="store-bonus-title">Exclusive Free Bonuses</p>
                  <p className="store-bonus-urgency">(Only Available Today)</p>
                </div>
              </div>
              <ul className="store-bonus-list">
                {product.bonusIncluded.map((item) => {
                  const isMore = item.label
                    .toLowerCase()
                    .includes("many more");
                  return (
                    <li
                      key={item.label}
                      className={isMore ? "store-bonus-more" : undefined}
                    >
                      <span
                        className="store-bonus-item-emoji"
                        aria-hidden="true"
                      >
                        🔥
                      </span>
                      <span>
                        {item.label}
                        {typeof item.value === "number" ? (
                          <>
                            {" "}
                            <span className="store-category-value">
                              Value : Rs {item.value}
                            </span>
                          </>
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : null}
      </article>

      {product.samples && product.samples.length > 0 ? (
        <ProductSamplesCarousel samples={product.samples} />
      ) : null}

      {product.description.length > 0 || product.useCases.length > 0 ? (
        <article className="store-about">
          <h2>About this product</h2>
          {product.aboutHeadline?.trim() ? (
            <p className="store-about-headline">{product.aboutHeadline.trim()}</p>
          ) : null}
          {product.description.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {product.useCases.length > 0 ? (
            <ul className="store-use-cases">
              {product.useCases.map((useCase) => (
                <li key={useCase.title}>
                  <Check className="mt-0.5 size-4 shrink-0 text-[var(--store-accent)]" />
                  <div>
                    <strong>{useCase.title}:</strong> {useCase.description}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ) : null}

      {product.reviews.length > 0 ? (
        <section
          className="store-reviews"
          aria-label="Why Parents & Teachers Love This Bundle"
        >
          {/* High-Converting Testimonials Heading & Trust Badge */}
          <div className="mb-8 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 text-center shadow-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-200/80">
              <ShieldCheck className="size-3.5 text-emerald-600" />
              Verified Community Feedback
            </span>

            <h2
              className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-store-display), ui-serif, Georgia, serif" }}
            >
              Why Parents &amp; Teachers Love This Bundle ❤️
            </h2>

            {/* Standardized Trust Badge */}
            <div className="mt-4 inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 rounded-2xl border border-amber-200/90 bg-amber-50/70 px-4 sm:px-6 py-2.5 shadow-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-500">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-xs font-black text-amber-950">4.9 / 5.0</span>
              </div>

              <span className="hidden sm:inline text-amber-300">•</span>

              <p className="text-xs sm:text-sm font-extrabold text-amber-950 tracking-tight">
                ⭐⭐⭐⭐⭐ Trusted by 2400+ Happy Indian Parents &amp; 200+ Pre-Schools
              </p>
            </div>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1 text-emerald-700">
                <Check className="size-3.5 text-emerald-600" strokeWidth={2.5} />
                100% Genuine Reviews
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-600">
                Direct WhatsApp &amp; Email Feedback
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-700">
                Pan-India Community
              </span>
            </div>
          </div>
          <ul className="store-reviews-list">
            {product.reviews.map((review) => (
              <li
                key={`${review.name}-${review.avatar}`}
                className="store-review"
              >
                <div className="store-review-head">
                  <div className="store-review-avatar">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cloudinaryDeliveryUrl(review.avatar, {
                        width: 72,
                        height: 72,
                      })}
                      alt=""
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
                <p className="store-review-quote">{review.quote}</p>
              </li>
            ))}
          </ul>
          <ProductReviewFormLazy />
        </section>
      ) : null}

      <ProductBusyParentsSection />

      <ProductValueComparison price={product.price} />

      <div className="store-details-split">
        <article>
          <h2>How it works</h2>
          <ol>
            {product.howItWorks.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </article>

        <div className="store-faq">
          <h2>FAQ</h2>
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
      </div>

      {product.finalCta ? (
        <section className="store-final-cta" aria-label="Final call to action">
          <h2 className="store-final-cta-headline">
            {product.finalCta.headline}
          </h2>
          <p className="store-final-cta-body">{product.finalCta.body}</p>
          <div className="store-final-cta-actions">
            <StoreFinalCtaBuyButton label={product.buyButtonLabel} />
            <p className="store-final-cta-note">{product.footerNote}</p>
          </div>
        </section>
      ) : null}

      {children}
    </section>
  );
}
