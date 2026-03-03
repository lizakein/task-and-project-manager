import { useRef } from "react";
import { useContextMenu } from "@hooks/useContextMenu";
import FilterIcon from "@assets/icons/actions/filter-icon.svg";
import ArrowDownIcon from "@assets/icons/actions/arrow-down-icon.svg";
import ArrowUpIcon from "@assets/icons/actions/arrow-up-icon.svg";
import { Button, Icon } from "@ui/index";
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
      <Button
        ref={filterButtonRef}
        className="task-controls__button"
        onClick={(e) => handleMoreClick(e, "filter")}
        leftIcon={<Icon src={FilterIcon} />}
        rightIcon={<Icon src={isOpen ? ArrowUpIcon : ArrowDownIcon} />}
      >
        <span className="task-controls__button-name">Filter</span>
      </Button>

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
