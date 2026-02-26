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
  const sort = useStore((state) => state.sort);
  const setSort = useStore((state) => state.setSort);
  const clearSort = useStore((state) => state.clearSort);

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
