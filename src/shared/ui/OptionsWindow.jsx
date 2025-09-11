import { createPortal } from "react-dom";

export function OptionsWindow({ children, position }) {
  return createPortal(
    <div
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