import { Check, Plus, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";

import { ProductStars } from "@/components/store/product-stars";
import { StoreFinalCtaBuyButton } from "@/components/store/store-buy-cta-button";
import { cloudinaryDeliveryUrl } from "@/lib/store/cloudinary";
import type { StoreProductContent } from "@/lib/store/product-content";
import { formatReviewCount } from "@/lib/store/product-format";

/**
 * Standard Store Product Details component.
 * Built directly from og_template_for_newproductPage.
 * Clean, generic, and completely free of any kids learning bundle hardcoding.
 */
export function ProductDetails({
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
          <h2>{product.includedHeadline || "What's Included"}</h2>
          {product.includedNote ? (
            <p className="store-included-note">{product.includedNote}</p>
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

      {/* About this product */}
      {(product.description && product.description.length > 0) ||
      (product.useCases && product.useCases.length > 0) ? (
        <article className="store-about">
          <h2>About this product</h2>
          {product.aboutHeadline?.trim() ? (
            <p className="store-about-headline">{product.aboutHeadline.trim()}</p>
          ) : null}
          {product.description?.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
          {product.useCases && product.useCases.length > 0 ? (
            <ul className="store-use-cases">
              {product.useCases.map((useCase) => (
                <li key={useCase.title}>
                  <Check className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  <div>
                    <strong>{useCase.title}:</strong> {useCase.description}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      ) : null}

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
                ({formatReviewCount(product.reviewCount)} reviews)
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
                    <li key={step}>
                      <span>{index + 1}</span>
                      <p>
                        {title ? (
                          <strong className="font-extrabold text-[var(--store-ink)]">
                            {title}:{" "}
                          </strong>
                        ) : null}
                        {body}
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
            100% Verified Digital Delivery
          </h3>
          <p className="mt-1 text-sm text-[var(--store-muted)]">
            Access link is generated on your screen immediately upon successful checkout and also
            emailed to you for permanent access. Encrypted 256-bit SSL transaction via Razorpay.
          </p>
        </div>
      </div>

      {/* Final Call to Action */}
      {product.finalCta ? (
        <section className="store-final-cta" aria-label="Final call to action">
          <h2 className="store-final-cta-headline">{product.finalCta.headline}</h2>
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
