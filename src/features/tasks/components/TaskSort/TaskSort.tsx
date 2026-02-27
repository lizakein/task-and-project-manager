import { useRef } from "react";
import { useContextMenu } from "@hooks/useContextMenu";
import { TaskSortMenu } from "./TaskSortMenu";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import ArrowUpIcon from "@assets/icons/actions/arrow-up-icon.svg";
import SortIcon from "@assets/icons/actions/sort-icon.svg";
import "./TaskSort.css";

interface TaskSortProps {
  contextMenu: ReturnType<typeof useContextMenu>;
}

export function TaskSort({ contextMenu }: TaskSortProps) {
  const { openId, menuPosition, handleMoreClick, closeMenu } = contextMenu;

  const sortButtonRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = openId === "sort";

  return (
    <>
      <button
        ref={sortButtonRef}
        type="button"
        className="task-controls__button"
        onClick={(e) => handleMoreClick(e, "sort")}
      >
        <img src={SortIcon} alt="" role="presentation" />
        <span className="task-controls__button-name">Sort</span>
        <img
          src={isOpen ? ArrowUpIcon : ArrowDownIcon}
          alt=""
          role="presentation"
        />
      </button>

      {isOpen && menuPosition && (
        <TaskSortMenu
          position={menuPosition}
          onClose={() => closeMenu()}
          triggerRef={sortButtonRef}
        />
      )}
    </>
  );
}
