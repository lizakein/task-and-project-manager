import { MenuPosition } from "@hooks/useContextMenu";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./OptionsWindow.css";

interface OptionsWindowProps {
  children: React.ReactNode;
  position: MenuPosition;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  shouldReturnFocus?: boolean;
  disableAutoFocus?: boolean;
};

export function OptionsWindow({ 
  children, 
  position, 
  onClose, 
  triggerRef,
  shouldReturnFocus = true, 
  disableAutoFocus = false
}: OptionsWindowProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!disableAutoFocus) {
      const firstButton = menuRef.current?.querySelector<HTMLButtonElement>("button");
      firstButton?.focus();
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        onClose?.();
    };

    const handleScrollOrResize = () => {
      onClose?.();
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);

      if (shouldReturnFocus)
        triggerRef.current?.focus();
    };
  }, [onClose, triggerRef, shouldReturnFocus, disableAutoFocus]);

  return createPortal(
    <div
      ref={menuRef}
      className="options-window"
      role="menu"
      aria-label="Options menu"
      style={{
        top: position.top,
        left: position.left,
        position: "absolute",
        zIndex: 1000,
      }}
    >
      {children}
    </div>,
    document.body
  );
}