import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./IconButton.css";

interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: ReactNode;
  ariaLabel: string;
  children?: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, ariaLabel, className = "", type = "button", children, ...props },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={`icon-button ${className}`.trim()}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
        {children}
      </button>
    );
  }
);
