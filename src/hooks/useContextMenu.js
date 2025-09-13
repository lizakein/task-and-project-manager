import { useState } from 'react';

export function useContextMenu() {
  const [ openId, setOpenId ] = useState(null);
  const [ menuPosition, setMenuPosition ] = useState(null);

  const handleMoreClick = (event,  id) => {
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