"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

function getOptimizedVideoUrl(url: string, width = 360) {
  return url.replace(
    "/video/upload/",
    `/video/upload/f_mp4,vc_h264:baseline,w_${width},eo_8,q_auto:eco,ac_none,fps_24/`,
  );
}

function getOptimizedPosterUrl(url: string, width = 320) {
  return url
    .replace(
      "/video/upload/",
      `/video/upload/so_1,w_${width},q_auto:good,f_jpg/`,
    )
    .replace(/\.mp4$/i, ".jpg");
}

// ---------------------------------------------------------------------------
// Poster card — just an image, zero video cost
// ---------------------------------------------------------------------------
function ReelPosterCard({
  item,
  onPlay,
}: {
  item: SampleReelItem;
  onPlay: (item: SampleReelItem) => void;
}) {
  const posterSrc = getOptimizedPosterUrl(item.rawUrl, 320);

  return (
    <button
      type="button"
      onClick={() => onPlay(item)}
      className="relative w-[130px] sm:w-[160px] aspect-[9/16] shrink-0 overflow-hidden rounded-2xl bg-slate-950 border border-slate-200/90 shadow-sm select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      aria-label={`Play ${item.title}`}
    >
      {/* Poster image — lazy loaded, zero video cost */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt={item.title}
        loading="lazy"
        decoding="async"
        className="size-full object-cover"
      />

      {/* Play overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/10 transition-colors">
        <div className="size-10 sm:size-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 sm:size-6 text-slate-900 ml-0.5"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Category pill */}
      <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none select-none">
        <span className="rounded-full bg-slate-950/75 backdrop-blur-md px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white border border-white/15">
          {item.category}
        </span>
      </div>

      {/* Bottom title bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent p-2.5 sm:p-3 pt-5 pointer-events-none select-none">
        <p className="text-[11px] sm:text-xs font-bold text-white truncate">
          {item.title}
        </p>
        <p className="text-[9.5px] text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
          <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          HD 1080p
        </p>
      </div>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Lightbox modal — renders exactly 1 video, only when open
// ---------------------------------------------------------------------------
function VideoModal({
  item,
  onClose,
}: {
  item: SampleReelItem;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoSrc = getOptimizedVideoUrl(item.rawUrl, 360);
  const posterSrc = getOptimizedPosterUrl(item.rawUrl, 320);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    // Prevent body scroll while modal open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Autoplay as soon as the modal mounts
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false; // allow sound in modal
    v.play().catch(() => {
      // Autoplay blocked — that's fine, controls are shown
    });
  }, []);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing: ${item.title}`}
    >
      {/* Modal panel — stop click propagation so clicks inside don't close */}
      <div
        className="relative w-full max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          loop
          playsInline
          controls
          preload="auto"
          className="size-full object-contain bg-black"
        />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 size-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close video"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {/* Title bar at bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-4 py-3 pointer-events-none">
          <p className="text-sm font-bold text-white">{item.title}</p>
          <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
            {item.category} · HD 1080p
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main exported component
// ---------------------------------------------------------------------------
export function SampleReelsCarousel() {
  const [activeReel, setActiveReel] = useState<SampleReelItem | null>(null);

  const handlePlay = useCallback((item: SampleReelItem) => {
    setActiveReel(item);
  }, []);

  const handleClose = useCallback(() => {
    setActiveReel(null);
  }, []);

  return (
    <>
      <section
        className="w-full my-6 sm:my-8 select-none"
        aria-label="Sample Reels Preview"
      >
        {/* Header */}
        <div className="mb-4 sm:mb-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wider text-emerald-800 border border-emerald-200 mb-2">
            🎬 Live Preview
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 font-sans">
            Sample Reels
          </h2>
          <p className="mt-1 text-sm sm:text-base text-slate-600">
            Tap any reel to preview it — high-retention, ready-to-post HD reels included in the bundle.
          </p>
        </div>

        {/* Scrollable poster grid — no videos, no lag */}
        <div className="overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6">
          <div className="flex gap-3 sm:gap-4 w-max">
            {SAMPLE_REELS.map((item) => (
              <ReelPosterCard key={item.id} item={item} onPlay={handlePlay} />
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-400 text-center">
          👆 Tap a reel to preview · {SAMPLE_REELS.length} sample reels shown
        </p>
      </section>

      {/* Single video — only rendered when a card is tapped */}
      {activeReel && (
        <VideoModal item={activeReel} onClose={handleClose} />
      )}
    </>
  );
}

