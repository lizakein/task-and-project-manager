import { useRef } from "react";
import { useContextMenu } from "@hooks/useContextMenu";
import FilterIcon from "@assets/icons/actions/filter-icon.svg";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import ArrowUpIcon from "@assets/icons/actions/arrow-up-icon.svg";
import { TaskFilterMenu } from "./TaskFilterMenu";
import "./TaskFilter.css";

interface TaskFilterProps {
  contextMenu: ReturnType<typeof useContextMenu>;
}

export function TaskFilter({ contextMenu }: TaskFilterProps) {
  const { openId, menuPosition, handleMoreClick, closeMenu } = contextMenu;

  const filterButtonRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = openId === "filter";

  return (
    <>
      <button
        ref={filterButtonRef}
        type="button"
        className="task-controls__button"
        onClick={(e) => handleMoreClick(e, "filter")}
      >
        <img src={FilterIcon} alt="" role="presentation" />
        <span className="task-controls__button-name">Filter</span>
        <img
          src={isOpen ? ArrowUpIcon : ArrowDownIcon}
          alt=""
          role="presentation"
        />
      </button>

      {isOpen && menuPosition && (
        <TaskFilterMenu
          position={menuPosition}
          onClose={() => closeMenu()}
          triggerRef={filterButtonRef}
        />
      )}
    </>
  );
}
