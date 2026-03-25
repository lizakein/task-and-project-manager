import { useEffect, useState } from "react";
import { getSearchPosition } from "../utils/getSearchPosition";
import { MenuPosition } from "@hooks/useContextMenu";

export function useSearchPosition(inputRef: React.RefObject<HTMLInputElement | null>, query: string) {
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    setMenuPosition(getSearchPosition(rect));
  }, [query]);

  return menuPosition;
}