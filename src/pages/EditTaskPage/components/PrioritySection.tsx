import { FieldState } from "../../../types/fieldState";
import { PriorityButton } from "@features/tasks/components/PriorityButton/PriorityButton";
import { Priority } from "@features/tasks/types";

interface PrioritySectionProps {
  priority: FieldState<Priority | "">;
}

export function PrioritySection({ priority }: PrioritySectionProps) {
  const levels: Priority[] = ["low", "medium", "high"];

  return (
    <section className="edit-task-page__section edit-task-page__priority-section">
      <h2 className="edit-task-page__section-title">Priority</h2>
      <div className="edit-task-page__buttons-group">
        {levels.map((level) => (
          <PriorityButton
            key={level}
            level={level}
            selected={priority.value === level}
            onClick={() => priority.setValue(level)}
          />
        ))}
      </div>
    </section>
  );
}
