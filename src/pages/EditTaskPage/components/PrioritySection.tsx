import { Task } from "@features/tasks";
import { FieldState } from "../../../types/fieldState";
import { PriorityButton } from "@features/tasks/components/PriorityButton/PriorityButton";

interface PrioritySectionProps {
  priority: FieldState<Task["priority"] | "">;
};

export function PrioritySection({ priority }: PrioritySectionProps) {
  const levels: Array<Task["priority"]> = ["low", "medium", "high"];

  return (
    <section className="edit-task-page__section edit-task-page__priority-section">
      <h2 className="edit-task-page__section-title">Priority</h2>
      <div className="edit-task-page__buttons-group">
        {levels.map(level => (
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