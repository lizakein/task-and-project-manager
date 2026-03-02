import type { CSSProperties, ImgHTMLAttributes } from "react";

interface IconProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> {
  src: string;
  alt?: string;
  size?: number | string;
  decorative?: boolean;
}

export function Icon({
  src,
  alt = "",
  size = "1.25rem",
  decorative = true,
  style,
  ...props
}: IconProps) {
  const iconStyle: CSSProperties = {
    width: size,
    height: size,
    ...style,
  };

  return (
    <img
      src={src}
      alt={decorative ? "" : alt}
      role={decorative ? "presentation" : undefined}
      aria-hidden={decorative ? true : undefined}
      style={iconStyle}
      {...props}
    />
  );
}
