import { useRef, useState } from 'react';
import FilterIcon from '@assets/icons/actions/filter-icon.svg';
import ArrowDownIcon from '@assets/icons/actions/arrow-down-icon.svg';
import ArrowUpIcon from '@assets/icons/actions/arrow-up-icon.svg';
import { useContextMenu } from '@hooks/useContextMenu';
import { TaskFilterMenu } from './TaskFilterMenu';
import "./TaskFilter.css";

export function TaskFilter() {
  const { menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);

  const [ isFilterOpen, setIsFilterOpen ] = useState(false);

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMoreClick(e, "filter");
    setIsFilterOpen(prev => !prev);
  }

  return (
    <>
      <button 
        ref={filterButtonRef}
        type='button'
        className='task-controls__button' 
        onClick={handleFilterClick}
      >
        <img src={FilterIcon} alt="" role="presentation" />
        <span className='task-controls__button-name'>Filter</span>
        <img src={ isFilterOpen? ArrowUpIcon : ArrowDownIcon} alt="" role="presentation" />
      </button>

      { isFilterOpen && menuPosition && (
        <TaskFilterMenu 
          position={menuPosition}
          onClose={() => { setIsFilterOpen(false); closeMenu(); }}
          triggerRef={filterButtonRef}
        />
      )}
    </>
  );
}