import { MenuPosition } from "@hooks/useContextMenu";
import { OptionsWindow } from "@ui/OptionsWindow/OptionsWindow";
import { PriorityButton } from "../PriorityButton/PriorityButton";
import { TagButton } from "../TagButton/TagButton";
import { Priority } from "@features/tasks/types";
import { useFiltersStore, useTagStore } from "@store/hooks";

interface TaskFilterMenuProps {
  position: MenuPosition;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function TaskFilterMenu({
  position,
  onClose,
  triggerRef,
}: TaskFilterMenuProps) {
  const { tags } = useTagStore();
  const { filters, setFilters, clearFilters } = useFiltersStore();

  const levels: Priority[] = ["low", "medium", "high"];

  const togglePriority = (priority: Priority) => {
    const updated = filters.priorities.includes(priority)
      ? filters.priorities.filter((p) => p !== priority)
      : [...filters.priorities, priority];

    setFilters({ priorities: updated });
  };

  const toggleTag = (tagId: string) => {
    const updated = filters.tags.includes(tagId)
      ? filters.tags.filter((t) => t !== tagId)
      : [...filters.tags, tagId];

    setFilters({ tags: updated });
  };

  return (
    <OptionsWindow
      position={position}
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <div className="filter-menu">
        <div className="filter-section">
          <h3 className="filter-section__label">Priority</h3>
          <div className="filter-section__options">
            {levels.map((p) => (
              <PriorityButton
                key={p}
                level={p}
                selected={filters.priorities.includes(p)}
                onClick={() => togglePriority(p)}
              />
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h3 className="filter-section__label">Tag</h3>
          <div className="filter-section__options">
            {tags.map((t) => (
              <TagButton
                key={t.id}
                tag={t}
                selected={filters.tags.includes(t.id)}
                onClick={() => toggleTag(t.id)}
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
