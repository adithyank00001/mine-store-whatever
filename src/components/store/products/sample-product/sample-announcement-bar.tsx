"use client";

export function SampleAnnouncementBar() {
  function scrollToBuy() {
    const buyEl = document.getElementById("buy");
    if (buyEl) {
      buyEl.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <aside
      onClick={scrollToBuy}
      className="relative z-20 w-full cursor-pointer bg-black border-b border-white/10 py-2.5 sm:py-3 px-3 sm:px-4 text-center text-[14.5px] sm:text-[16px] font-bold text-white shadow-md tracking-wide transition-all hover:bg-neutral-900 active:scale-[0.99] select-none"
      role="alert"
      aria-label="Launch offer announcement"
    >
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 font-bold leading-snug">
        <span>
          🎉 Launch offer{" "}
          <span className="text-red-500 font-black">Expiring</span> in 24 Hours.
        </span>
        <span>
          Instant Google Drive Access,{" "}
          <span className="text-red-500 font-black">Hurry Up!</span>
        </span>
      </div>
    </aside>
  );
}
