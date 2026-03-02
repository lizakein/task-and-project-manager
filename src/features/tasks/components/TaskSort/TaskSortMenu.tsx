import { MenuPosition } from "@hooks/useContextMenu";
import { OptionsWindow } from "@ui/OptionsWindow/OptionsWindow";
import { SortSection } from "./SortSection";
import { useSortStore } from "@store/hooks";

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
  const { sort, setSort, clearSort } = useSortStore();

  const handleSelect = (
    field: "title" | "priority" | "date",
    direction: "asc" | "desc"
  ) => {
    setSort({ field, direction });
  };

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
          selectedField={sort.field}
          selectedDirection={sort.direction}
          onSelect={handleSelect}
        />

        <SortSection
          label="Priority"
          field="priority"
          selectedField={sort.field}
          selectedDirection={sort.direction}
          onSelect={handleSelect}
        />

        <SortSection
          label="Date"
          field="date"
          selectedField={sort.field}
          selectedDirection={sort.direction}
          onSelect={handleSelect}
        />

        <button className="button sort-clear" onClick={clearSort}>
          Clear sorting
        </button>
      </div>
    </OptionsWindow>
  );
}
