import { MenuPosition } from "@hooks/useContextMenu";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface OptionsWindowProps {
  children: React.ReactNode;
  position: MenuPosition;
  onClose: () => void;
};

export function OptionsWindow({ children, position, onClose }: OptionsWindowProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
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
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={ref}
      className="options-window"
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