import { MenuPosition } from "@hooks/useContextMenu";
import { useMobile } from "@hooks/useMobile";

export function getSearchPosition(rect: DOMRect): MenuPosition {
  const isMobile = useMobile(720);

  return {
    top: rect.bottom + window.scrollY + (isMobile ? 8 : 16),
    left: rect.left + window.scrollX + (isMobile ? 0 : -48),
    right: rect.right + window.scrollX
  };
}