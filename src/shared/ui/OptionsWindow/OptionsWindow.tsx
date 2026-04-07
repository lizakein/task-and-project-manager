import { MenuPosition } from "@hooks/useContextMenu";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./OptionsWindow.css";

interface OptionsWindowProps {
  children: React.ReactNode;
  position: MenuPosition;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  role?: string;
  ariaLabel?: string;
  shouldReturnFocus?: boolean;
  disableAutoFocus?: boolean;
}

export function OptionsWindow({
  children,
  position,
  onClose,
  triggerRef,
  role = "menu",
  ariaLabel = "Options menu",
  shouldReturnFocus = true,
  disableAutoFocus = false,
}: OptionsWindowProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [computedLeft, setComputedLeft] = useState(position.left);

  useLayoutEffect(() => {
    if (!menuRef.current) return;

    const menuWidth = menuRef.current.offsetWidth;
    const viewportWidth = window.innerWidth;
    const padding = 8;

    let newLeft = position.left;

    if (newLeft + menuWidth > viewportWidth - padding) {
      newLeft = position.right - menuWidth;
    }

    if (newLeft < padding) {
      newLeft = padding;
    }

    setComputedLeft(newLeft);
  }, [position]);

  useEffect(() => {
    if (!disableAutoFocus) {
      const firstButton =
        menuRef.current?.querySelector<HTMLButtonElement>("button");
      firstButton?.focus();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        onClose?.();
    };

    const handleResize = () => {
      onClose?.();
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("resize", handleResize);

      if (shouldReturnFocus) triggerRef.current?.focus();
    };
  }, [onClose, triggerRef, shouldReturnFocus, disableAutoFocus]);

  return createPortal(
    <div
      ref={menuRef}
      className="options-window"
      role={role}
      aria-label={ariaLabel}
      style={{
        top: position.top,
        left: computedLeft,
        position: "absolute",
        zIndex: 500,
      }}
    >
      {children}
    </div>,
    document.body
  );
}
