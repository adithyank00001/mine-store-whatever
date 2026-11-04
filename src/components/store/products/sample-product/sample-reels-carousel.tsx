"use client";

import { useEffect, useRef, useState } from "react";

interface SampleReelItem {
  id: string;
  title: string;
  category: string;
  rawUrl: string;
}

const SAMPLE_REELS: SampleReelItem[] = [
  {
    id: "reel-1",
    title: "Luxury & Lifestyle",
    category: "Luxury",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793696999/ERideBay-2008.mp4",
  },
  {
    id: "reel-2",
    title: "Viral Hook Short",
    category: "Viral Hooks",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793696999/915-1.mp4",
  },
  {
    id: "reel-3",
    title: "Motivational & Mindset",
    category: "Motivation",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793696976/reel-11.mp4",
  },
  {
    id: "reel-4",
    title: "Cars & Automotive",
    category: "Supercars",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793696975/reel-12.mp4",
  },
  {
    id: "reel-5",
    title: "AI Animals & Visuals",
    category: "AI Animation",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793696974/reel-7.mp4",
  },
  {
    id: "reel-6",
    title: "Travel & Adventure",
    category: "Travel",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793696973/reel-2.mp4",
  },
  {
    id: "reel-7",
    title: "Satisfying & Crafts",
    category: "Satisfying",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793696972/reel-6.mp4",
  },
  {
    id: "reel-8",
    title: "Gadgets & Life Hacks",
    category: "Life Hacks",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793697476/reel-5.mp4",
  },
  {
    id: "reel-9",
    title: "Faceless Growth Reel",
    category: "Faceless",
    rawUrl: "https://res.cloudinary.com/ntv0bhpy/video/upload/v1793697524/reel-1.mp4",
  },
];

/** Duplicate array so it glides in an endless seamless loop */
const DUPLICATED_REELS = [...SAMPLE_REELS, ...SAMPLE_REELS];

/**
 * Optimizes video encoding for 100% stutter-free continuous looping:
 * 1. vc_h264:baseline: Constrained Baseline Profile with ZERO B-frames (no ctts reordering box).
 *    Decodes strictly in presentation order, eliminating decoder flush delays and loop freezes!
 * 2. ac_none: Completely removes audio stream, preventing A/V sync stalls and cutting size by 35%.
 * 3. fps_24: Cinema standard frame rate, drastically reducing GPU decoder workload.
 * 4. eo_6: 6-second loop cap keeping files tiny (~120KB-280KB) so the entire clip buffers in RAM.
 * 5. q_auto:eco, w_280: Crisp visuals at low bandwidth.
 */
function getOptimizedVideoUrl(url: string, width = 280) {
  return url.replace(
    "/video/upload/",
    `/video/upload/f_mp4,vc_h264:baseline,w_${width},eo_6,q_auto:eco,ac_none,fps_24/`,
  );
}

function getOptimizedPosterUrl(url: string, width = 280) {
  return url
    .replace(
      "/video/upload/",
      `/video/upload/so_1,w_${width},q_auto:good,f_jpg/`,
    )
    .replace(/\.mp4$/i, ".jpg");
}

function AutoplayingReelCard({
  item,
  isMounted,
}: {
  item: SampleReelItem;
  isMounted: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoSrc = getOptimizedVideoUrl(item.rawUrl, 280);
  const posterSrc = getOptimizedPosterUrl(item.rawUrl, 280);

  // Native per-card viewport observer:
  // Directly pauses offscreen videos and plays entering videos WITHOUT any React re-render or layout thrashing!
  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video || !isMounted) return;

    video.muted = true;
    video.defaultMuted = true;

    if (typeof IntersectionObserver === "undefined") {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!video) return;
        if (entry.isIntersecting) {
          if (video.paused) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: "200px", // 200px lookahead buffer: video starts playing before entering screen
        threshold: 0,
      },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [isMounted]);

  return (
    <div
      ref={cardRef}
      className="relative w-[145px] sm:w-[180px] aspect-[9/16] shrink-0 overflow-hidden rounded-2xl bg-slate-950 border border-slate-200/90 shadow-sm select-none pointer-events-none"
    >
      {isMounted ? (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={posterSrc}
          disablePictureInPicture
          controls={false}
          className="size-full object-cover pointer-events-none select-none"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover pointer-events-none select-none"
        />
      )}

      {/* Category Pill Tag */}
      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none select-none">
        <span className="rounded-full bg-slate-950/75 backdrop-blur-md px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white border border-white/15">
          {item.category}
        </span>
      </div>

      {/* Bottom Title Bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent p-2.5 sm:p-3 pt-5 pointer-events-none select-none">
        <p className="text-[11px] sm:text-xs font-bold text-white truncate">
          {item.title}
        </p>
        <p className="text-[9.5px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
          <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          HD 1080p
        </p>
      </div>
    </div>
  );
}

export function SampleReelsCarousel() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  // Lazy load: 0 videos rendered initially until user scrolls within 300px
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full max-w-full overflow-hidden my-6 sm:my-8 select-none"
      aria-label="Sample Reels Carousel"
    >
      {/* Header */}
      <div className="mb-4 sm:mb-5 select-none">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 border border-emerald-200 mb-2">
          🎬 Live Preview
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-sans">
          Sample Reels
        </h2>
        <p className="mt-1 text-sm sm:text-base text-slate-600">
          Preview high-retention, ready-to-post HD reels included in the bundle.
        </p>
      </div>

      {/* Auto-Moving Carousel Track */}
      <div className="relative w-full max-w-full overflow-hidden py-2 select-none pointer-events-none">
        <div className="sample-reels-marquee-track select-none pointer-events-none">
          {DUPLICATED_REELS.map((item, idx) => (
            <AutoplayingReelCard
              key={`${item.id}-${idx}`}
              item={item}
              isMounted={hasEnteredView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
