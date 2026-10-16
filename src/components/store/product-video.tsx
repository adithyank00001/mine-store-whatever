"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function ProductVideo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [, setIsPlaying] = useState(false);

  // Auto-pause video when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;

          // When video scrolls out of the visible screen area (less than 20% visible), pause it automatically
          if (entry.intersectionRatio < 0.2) {
            if (!video.paused && !video.ended) {
              video.pause();
            }
          }
        });
      },
      {
        threshold: [0, 0.2, 0.5, 0.8, 1],
      },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      setHasStarted(true);
      void videoRef.current.play();
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] overflow-hidden rounded-2xl border-2 border-blue-100/90 bg-slate-950 shadow-xl shadow-blue-950/10"
      >
        <video
          ref={videoRef}
          controls={hasStarted}
          playsInline
          preload="none"
          poster="https://res.cloudinary.com/ntv0bhpy/video/upload/so_1,w_640,q_auto,f_auto/v1792167492/02_1080p_1.jpg"
          className="aspect-[9/16] w-full object-cover"
          onPlay={() => {
            setHasStarted(true);
            setIsPlaying(true);
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          {/* Eco / high compression 480p stream for instant load & ultra low data usage */}
          <source
            src="https://res.cloudinary.com/ntv0bhpy/video/upload/q_auto:eco,w_480,c_limit/v1792167492/02_1080p_1.mp4"
            type="video/mp4"
          />
          {/* Balanced 720p fallback */}
          <source
            src="https://res.cloudinary.com/ntv0bhpy/video/upload/q_auto:good,w_720,c_limit/v1792167492/02_1080p_1.mp4"
            type="video/mp4"
          />
          {/* Original source fallback */}
          <source
            src="https://res.cloudinary.com/ntv0bhpy/video/upload/v1792167492/02_1080p_1.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Custom Play Overlay (shown before initial play) */}
        {!hasStarted && (
          <button
            type="button"
            onClick={handlePlayClick}
            aria-label="Play video demo"
            className="group absolute inset-0 flex flex-col items-center justify-center bg-black/25 transition-colors hover:bg-black/35 focus:outline-none"
          >
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-16 w-16 animate-ping rounded-full bg-blue-400 opacity-40 duration-1000" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-700 to-sky-500 text-white shadow-xl shadow-blue-900/50 transition-transform group-hover:scale-110">
                <Play className="ml-1 h-7 w-7 fill-white stroke-none" />
              </div>
            </div>
            <span className="mt-3 rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-md backdrop-blur-sm transition group-hover:bg-white group-hover:text-blue-700">
              Watch Worksheets In Action
            </span>
          </button>
        )}
      </div>

      <p className="mt-2 text-center text-xs font-medium text-slate-500">
        ✨ Real worksheets in action — no screens, just pure creative fun!
      </p>
    </div>
  );
}
