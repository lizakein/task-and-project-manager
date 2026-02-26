import { MenuPosition } from "@hooks/useContextMenu";
import { useStore } from "@store/useStore";
import { OptionsWindow } from "@ui/OptionsWindow/OptionsWindow";
import { SortSection } from "./SortSection";

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

  return (
    <OptionsWindow
      position={position}
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <div className="sort-menu">
        <SortSection
          label="Title"
          field="title"
          selectedField={null}
          selectedDirection="asc"
          onSelect={() => {}}
        />

        <SortSection
          label="Priority"
          field="priority"
          selectedField={null}
          selectedDirection="asc"
          onSelect={() => {}}
        />

        <SortSection
          label="Date"
          field="date"
          selectedField={null}
          selectedDirection="asc"
          onSelect={() => {}}
        />

        <button className="button filter-clear" onClick={clearFilters}>
          Clear filters
        </button>
      </div>
    </OptionsWindow>
  );
}
