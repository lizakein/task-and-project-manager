import { useState } from 'react';

export type MenuPosition = {
  top: number; 
  left: number;
};

export function useContextMenu() {
  const [ openId, setOpenId ] = useState<string | null>(null);
  const [ menuPosition, setMenuPosition ] = useState<MenuPosition | null>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLButtonElement>,  id: string) => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    });

    setOpenId(openId === id ? null : id);
  };

  const closeMenu = () => {
    setOpenId(null);
    setMenuPosition(null);
  };

  return { openId, menuPosition, handleMoreClick, closeMenu };
}