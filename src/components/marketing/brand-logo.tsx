import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md";

const sizeClasses: Record<LogoSize, string> = {
  xs: "text-sm font-bold",
  sm: "text-base font-bold",
  md: "text-xl font-bold",
};

export function BrandLogo({
  href,
  size = "sm",
  className,
}: {
  href?: string;
  size?: LogoSize;
  className?: string;
}) {
  const text = (
    <span className={cn(sizeClasses[size], "tracking-tight text-[var(--store-ink,#112437)]", className)}>
      growscaleX
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline">
        {text}
      </Link>
    );
  }

  return text;
}
