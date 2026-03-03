import type { ImgHTMLAttributes } from "react";

interface IconProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> {
  src: string;
  alt?: string;
  decorative?: boolean;
}

export function Icon({
  src,
  alt = "",
  decorative = true,
  ...props
}: IconProps) {
  return (
    <img
      src={src}
      alt={decorative ? "" : alt}
      role={decorative ? "presentation" : undefined}
      aria-hidden={decorative ? true : undefined}
      {...props}
    />
  );
}
