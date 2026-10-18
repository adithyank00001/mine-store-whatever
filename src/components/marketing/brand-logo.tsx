import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md";

export function BrandLogo({
  href,
  size = "sm",
  className,
}: {
  href?: string;
  size?: LogoSize;
  className?: string;
}) {
  const heightClass =
    size === "xs"
      ? "h-[22px] sm:h-[25px]"
      : size === "sm"
        ? "h-[25px] sm:h-[28px]"
        : "h-[28px] sm:h-[32px]";

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/byepanda-logo.png"
      alt="byepanda.com"
      width={1024}
      height={190}
      className={cn(
        heightClass,
        "w-auto shrink-0 select-none object-contain",
        className,
      )}
      style={{
        aspectRatio: "1024 / 190",
        maxWidth: "none",
      }}
      loading="eager"
      decoding="async"
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 items-center no-underline"
        aria-label="ByePanda Home"
      >
        {image}
      </Link>
    );
  }

  return image;
}
