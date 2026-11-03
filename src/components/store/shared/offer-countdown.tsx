"use client";

import { useOfferTimer } from "@/lib/store/hooks/use-offer-timer";
import { cn } from "@/lib/utils";

export function OfferCountdown({
  className,
  title = "Offer ending soon",
}: {
  className?: string;
  title?: string;
}) {
  const { formattedTime } = useOfferTimer();

  return (
    <div
      className={cn(
        "store-offer-timer mx-auto flex flex-col items-center justify-center text-center",
        className,
      )}
      aria-live="polite"
    >
      <p className="store-offer-timer-title text-center">{title}</p>
      <p
        className="store-offer-timer-digits text-center"
        suppressHydrationWarning
      >
        {formattedTime}
      </p>
    </div>
  );
}

