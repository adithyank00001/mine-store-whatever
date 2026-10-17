"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cloudinaryDeliveryUrl } from "@/lib/store/cloudinary";
import type { ProductSampleItem } from "@/lib/store/product-content";

export const DEFAULT_SAMPLES: ProductSampleItem[] = [
  {
    title: "Alphabet Adventure",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211951/1.png.webp",
    badge: "🔤 Letters & Phonics",
    description: "Letter tracing, phonics sounds & fun coloring activities",
  },
  {
    title: "Match the Babies",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211951/6.png.webp",
    badge: "🐣 Animal Pairs",
    description: "Match mommy and baby animals while building logic",
  },
  {
    title: "Count and Write",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211951/8.png.webp",
    badge: "🔢 Numbers & Math",
    description: "Early counting, number tracing and pencil control",
  },
  {
    title: "Maze Game",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211952/15.png",
    badge: "🧩 Logic & Focus",
    description: "Exciting maze paths to sharpen concentration and problem solving",
  },
  {
    title: "Learn Number",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211952/18.png",
    badge: "✨ Early Math",
    description: "Fun number recognition with visual objects and counting",
  },
  {
    title: "Sight Word",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211952/21.png",
    badge: "📖 Reading Skills",
    description: "Essential sight words that jumpstart early reading readiness",
  },
  {
    title: "Count & Circle",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211952/12.png",
    badge: "🎯 Observation",
    description: "Find, count, and circle objects to boost visual attention",
  },
  {
    title: "Read & Learn Words",
    image: "https://res.cloudinary.com/ntv0bhpy/image/upload/v1792211952/22.png",
    badge: "🎨 Vocabulary",
    description: "Connect pictures with words to expand active vocabulary",
  },
];

export function ProductSamplesCarousel({
  samples = DEFAULT_SAMPLES,
}: {
  samples?: ProductSampleItem[];
}) {
  const items = samples && samples.length > 0 ? samples : DEFAULT_SAMPLES;
  const [currentIndex, setCurrentIndex] = useState(0);

  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Continuous auto-sliding every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [items.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentSample = items[currentIndex];

  return (
    <section
      id="product-samples-section"
      aria-label="Worksheet Samples"
      className="my-8 sm:my-10"
    >
      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200/80">
          Worksheet Samples
        </span>
        <h2
          className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#1e40af]"
          style={{ fontFamily: "var(--font-store-display), Fredoka, ui-rounded, sans-serif" }}
        >
          Look Inside the Worksheets
        </h2>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600">
          Swipe through a few printable activities included in your bundle.
        </p>
      </div>

      {/* Sliding Carousel Stage */}
      <div className="mt-6 mx-auto w-full max-w-md sm:max-w-lg">
        <div className="relative rounded-3xl p-4 sm:p-6 store-carousel-3d-box">
          {/* Card Header: Badge + Counter */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">
              {currentSample.badge ?? "Sample Activity"}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {currentIndex + 1} of {items.length}
            </span>
          </div>

          {/* Sliding Viewport */}
          <div
            className="relative mt-4 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-[inset_0_2px_6px_rgba(15,23,42,0.04)]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Sliding Track */}
            <div
              className="flex h-full transition-transform duration-500 ease-in-out"
              style={{
                width: `${items.length * 100}%`,
                transform: `translateX(-${(currentIndex * 100) / items.length}%)`,
              }}
            >
              {items.map((sample, idx) => (
                <div
                  key={sample.title}
                  style={{ width: `${100 / items.length}%` }}
                  className="flex h-full shrink-0 items-center justify-center p-3 sm:p-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cloudinaryDeliveryUrl(sample.image, {
                      width: 700,
                      quality: "good",
                    })}
                    alt={sample.title}
                    className="size-full rounded-xl object-contain select-none drop-shadow-md"
                    loading={idx === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            {/* Left Prev Arrow */}
            <button
              type="button"
              id="samples-prev-button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 flex size-9 sm:size-10 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-md border border-slate-200 hover:scale-105 active:scale-95 transition cursor-pointer z-10"
              aria-label="Previous worksheet sample"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Right Next Arrow */}
            <button
              type="button"
              id="samples-next-button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex size-9 sm:size-10 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-md border border-slate-200 hover:scale-105 active:scale-95 transition cursor-pointer z-10"
              aria-label="Next worksheet sample"
            >
              <ChevronRight className="size-5" />
            </button>

          </div>

          {/* Slide Details */}
          <div className="mt-4 text-center">
            <h3 className="text-base sm:text-lg font-black text-slate-900">
              {currentSample.title}
            </h3>
            {currentSample.description && (
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                {currentSample.description}
              </p>
            )}
          </div>

          {/* Minimal Dot Indicators */}
          <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-6 bg-blue-600"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Go to sample ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

export { ProductSamplesCarousel as ProductSamplesSection };
