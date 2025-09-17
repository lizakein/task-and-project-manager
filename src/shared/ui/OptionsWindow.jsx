import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function OptionsWindow({ children, position, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target))
        onClose?.();
    };

    const handleScrollOrResize = () => {
      onClose?.();
    };

    const handleEsc = (event) => {
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