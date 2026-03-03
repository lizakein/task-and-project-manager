import { useRef } from "react";
import { useContextMenu } from "@hooks/useContextMenu";
import { TaskSortMenu } from "./TaskSortMenu";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import ArrowUpIcon from "@assets/icons/actions/arrow-up-icon.svg";
import SortIcon from "@assets/icons/actions/sort-icon.svg";
import { Button, Icon } from "@ui/index";
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
      <Button
        ref={sortButtonRef}
        className="task-controls__button"
        onClick={(e) => handleMoreClick(e, "sort")}
        leftIcon={<Icon src={SortIcon} />}
        rightIcon={<Icon src={isOpen ? ArrowUpIcon : ArrowDownIcon} />}
      >
        <span className="task-controls__button-name">Sort</span>
      </Button>

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
