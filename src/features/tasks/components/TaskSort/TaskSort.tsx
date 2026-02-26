import { useRef, useState } from "react";
import { useContextMenu } from "@hooks/useContextMenu";
import { TaskSortMenu } from "./TaskSortMenu";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import ArrowUpIcon from "@assets/icons/actions/arrow-up-icon.svg";
import SortIcon from "@assets/icons/actions/sort-icon.svg";

export function TaskSort() {
  const { menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  const sortButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSortClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMoreClick(e, "sort");
    setIsSortOpen((prev) => !prev);
  };

  return (
    <>
      <button
        ref={sortButtonRef}
        type="button"
        className="task-controls__button"
        onClick={handleSortClick}
      >
        <img src={SortIcon} alt="" role="presentation" />
        <span className="task-controls__button-name">Sort</span>
        <img
          src={isSortOpen ? ArrowUpIcon : ArrowDownIcon}
          alt=""
          role="presentation"
        />
      </button>

      {isSortOpen && menuPosition && (
        <TaskSortMenu
          position={menuPosition}
          onClose={() => {
            setIsSortOpen(false);
            closeMenu();
          }}
          triggerRef={sortButtonRef}
        />
      )}
    </>
  );
}
