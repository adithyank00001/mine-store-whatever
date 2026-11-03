import { cn } from "@/lib/utils";

export function RazorpayLogo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "store-razorpay-logo-sm inline-flex items-center gap-1.5",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        focusable="false"
        className="size-4 shrink-0"
      >
        <path
          fill="#072654"
          d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z"
        />
      </svg>
      <span className="font-semibold tracking-tight text-[#072654]">
        Razorpay
      </span>
    </span>
  );
}

