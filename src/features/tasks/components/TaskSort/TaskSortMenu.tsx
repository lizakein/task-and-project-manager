import { MenuPosition } from "@hooks/useContextMenu";
import { useStore } from "@store/useStore";
import { OptionsWindow } from "@ui/OptionsWindow/OptionsWindow";
import { SortButton } from "../SortButton/SortButton";

interface TaskSortMenuProps {
  position: MenuPosition;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function TaskSortMenu({
  position,
  onClose,
  triggerRef,
}: TaskSortMenuProps) {
  const clearFilters = useStore((state) => state.clearFilters);
  const directions: Array<"asc" | "desc"> = ["asc", "desc"];

  return (
    <OptionsWindow
      position={position}
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <div className="sort-menu">
        <div className="sort-section">
          <h3 className="sort-section__label">Title</h3>
          <div className="sort-section__options">
            {directions.map((direction) => (
              <SortButton
                key={direction}
                direction={direction}
                selected={false}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        <div className="sort-section">
          <h3 className="sort-section__label">Priority</h3>
          <div className="sort-section__options">
            {directions.map((direction) => (
              <SortButton
                key={direction}
                direction={direction}
                selected={false}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        <div className="sort-section">
          <h3 className="sort-section__label">Date</h3>
          <div className="sort-section__options">
            {directions.map((direction) => (
              <SortButton
                key={direction}
                direction={direction}
                selected={false}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>

        <button className="button filter-clear" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    </OptionsWindow>
  );
}
