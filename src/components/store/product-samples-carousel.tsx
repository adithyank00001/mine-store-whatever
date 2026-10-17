"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
  FileText,
  Printer,
  Heart,
  Pause,
  Play,
  Sparkles,
  Layers,
} from "lucide-react";

import { cloudinaryDeliveryUrl } from "@/lib/store/cloudinary";
import type { ProductSampleItem } from "@/lib/store/product-content";
import { cn } from "@/lib/utils";

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

const AUTO_PLAY_INTERVAL = 4000; // 4 seconds

export function ProductSamplesCarousel({
  samples = DEFAULT_SAMPLES,
}: {
  samples?: ProductSampleItem[];
}) {
  const items = samples && samples.length > 0 ? samples : DEFAULT_SAMPLES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Automatic slide advance
  useEffect(() => {
    if (isPaused || lightboxOpen) return;

    const timer = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(timer);
  }, [isPaused, lightboxOpen, nextSlide]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, prevSlide, nextSlide]);

  const currentSample = items[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <>
      <section
        id="product-samples-section"
        aria-label="Samples"
        className="store-samples-section pt-4"
      >
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50/70 px-3.5 py-1 text-xs font-bold text-blue-700">
            <Layers className="size-3.5 text-blue-600" />
            <span>Interactive Gallery Preview</span>
          </div>

          <h2
            className="mt-2.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
            style={{
              fontFamily: "var(--font-store-display), ui-serif, Georgia, serif",
            }}
          >
            Samples
          </h2>

          <p className="mt-1.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Take a look inside the actual worksheets. Professionally illustrated for high-contrast, crystal-clear printing at home.
          </p>
        </div>

        {/* Single Image Carousel Stage */}
        <div
          className="mt-8 mx-auto w-full max-w-md sm:max-w-lg"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xl shadow-slate-100 transition-all duration-300">
            {/* Top Bar of Card */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-200/80 bg-blue-50/80 px-3 py-1 text-xs font-extrabold text-blue-800">
                {currentSample.badge ?? "Featured Worksheet"}
              </span>

              <div className="flex items-center gap-2.5">
                {/* Dot Indicators without numbers */}
                <div className="flex items-center gap-1" aria-hidden="true">
                  {items.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        dotIdx === currentIndex
                          ? "w-4 bg-blue-600"
                          : "w-1.5 bg-slate-200",
                      )}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIsPaused((p) => !p)}
                  className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition text-[10px] cursor-pointer"
                  title={isPaused ? "Play auto-slideshow" : "Pause auto-slideshow"}
                  aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                >
                  {isPaused ? (
                    <Play className="size-3 fill-current ml-0.5" />
                  ) : (
                    <Pause className="size-3 fill-current" />
                  )}
                </button>
              </div>
            </div>

            {/* Single Image Frame with Slide Window */}
            <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/70 shadow-inner group">
              {/* Sliding Track */}
              <div
                className="flex h-full w-full transition-transform duration-500 ease-out cursor-pointer"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onClick={() => setLightboxOpen(true)}
              >
                {items.map((sample, idx) => (
                  <div
                    key={sample.title}
                    className="relative flex h-full w-full shrink-0 items-center justify-center p-3 sm:p-4"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cloudinaryDeliveryUrl(sample.image, {
                        width: 700,
                        quality: "good",
                      })}
                      alt={sample.title}
                      className="size-full rounded-xl object-contain shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
                      loading={idx === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>

              {/* Floating Left Arrow */}
              <button
                type="button"
                id="samples-single-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-md backdrop-blur-xs transition hover:scale-110 hover:bg-white active:scale-95 cursor-pointer z-10 border border-slate-200"
                aria-label="Previous sample"
              >
                <ChevronLeft className="size-5" />
              </button>

              {/* Floating Right Arrow */}
              <button
                type="button"
                id="samples-single-next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-md backdrop-blur-xs transition hover:scale-110 hover:bg-white active:scale-95 cursor-pointer z-10 border border-slate-200"
                aria-label="Next sample"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Zoom Cue floating badge */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/85 backdrop-blur-xs px-3 py-1.5 text-xs font-semibold text-white shadow-md transition hover:bg-slate-900 cursor-pointer z-10"
                aria-label="Zoom sample image"
              >
                <ZoomIn className="size-3.5" />
                <span>Tap to enlarge</span>
              </button>
            </div>

            {/* Caption Section */}
            <div className="mt-4 text-center">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight transition-all">
                {currentSample.title}
              </h3>

              {currentSample.description ? (
                <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  {currentSample.description}
                </p>
              ) : null}

              <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Printer className="size-3.5 text-blue-600" />
                  Print at Home PDF
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <Heart className="size-3.5 fill-emerald-600 text-emerald-600" />
                  Fun &amp; Engaging
                </span>
              </div>
            </div>
          </div>

          {/* Quick Category Chips Strip (No numbers) */}
          <div className="mt-4.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {items.map((sample, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={sample.title}
                  type="button"
                  id={`sample-category-chip-${idx}`}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer border",
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm scale-105"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50",
                  )}
                  aria-label={`Show ${sample.title}`}
                  aria-pressed={isSelected}
                >
                  <span>{sample.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-Screen Zoom Lightbox Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentSample.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-xl flex-col rounded-3xl bg-white p-5 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-800">
                  {currentSample.badge ?? `Sample Preview`}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {currentIndex + 1} of {items.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:scale-105 active:scale-95 cursor-pointer"
                aria-label="Close sample preview"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 border border-slate-200/80 p-3 min-h-[340px] max-h-[58vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cloudinaryDeliveryUrl(currentSample.image, {
                  width: 1200,
                  quality: "good",
                })}
                alt={currentSample.title}
                className="max-h-[54vh] w-auto rounded-lg object-contain shadow-md"
              />

              {/* Prev / Next buttons inside modal */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur-xs transition hover:scale-110 hover:bg-white active:scale-95 cursor-pointer"
                aria-label="Previous sample"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-md backdrop-blur-xs transition hover:scale-110 hover:bg-white active:scale-95 cursor-pointer"
                aria-label="Next sample"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            {/* Modal Caption */}
            <div className="mt-4">
              <h3 className="text-xl font-extrabold text-slate-900">
                {currentSample.title}
              </h3>
              {currentSample.description ? (
                <p className="mt-1 text-sm text-slate-600">
                  {currentSample.description}
                </p>
              ) : null}

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <FileText className="size-3.5 text-blue-600" />
                  Instant Download · PDF Format
                </span>
                <span className="font-semibold text-emerald-600">
                  Ready to Print
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
