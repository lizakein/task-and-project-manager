import { MenuPosition } from "@hooks/useContextMenu";

export function getSearchPosition(rect: DOMRect): MenuPosition {
  const screenWidth = window.innerWidth;

  const isMobile = screenWidth <= 720;     // <45rem
  const isTablet = screenWidth > 720 && screenWidth < 1232; // 45rem–77rem

  if (isMobile) {
    return {
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      right: rect.right + window.scrollX,
    };
  }

  if (isTablet) {
    const dropdownWidth = screenWidth * 0.6;

    return {
      top: rect.bottom + window.scrollY + 16,
      left: window.scrollX + (screenWidth - dropdownWidth) / 2,
      right: window.scrollX + (screenWidth + dropdownWidth) / 2,
    };
  }

  // desktop
  return {
    top: rect.bottom + window.scrollY + 16,
    left: rect.left + window.scrollX - 48,
    right: rect.right + window.scrollX,
  };
}
