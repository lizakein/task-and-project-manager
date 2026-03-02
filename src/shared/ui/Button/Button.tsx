import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import "./Button.css";

type ButtonVariant = "default" | "primary" | "warning";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantToClass: Record<ButtonVariant, string> = {
  default: "",
  primary: "button--primary",
  warning: "button--warning",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "default",
      leftIcon,
      rightIcon,
      className = "",
      type = "button",
      children,
      ...props
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={`button ${variantToClass[variant]} ${className}`.trim()}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  }
);
