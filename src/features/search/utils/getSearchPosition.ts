import { MenuPosition } from "@hooks/useContextMenu";

export function getSearchPosition(rect: DOMRect): MenuPosition {
  const isMobile = window.innerWidth <= 720;

  return {
    top: rect.bottom + window.scrollY + (isMobile ? 8 : 16),
    left: rect.left + window.scrollX + (isMobile ? 0 : -48),
    right: rect.right + window.scrollX
  };
}