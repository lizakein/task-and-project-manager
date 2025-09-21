import { FieldState } from "../../../types/fieldState";

interface PrioritySectionProps {
  priority: FieldState<string>;
};

export function PrioritySection({ priority }: PrioritySectionProps) {
  const levels = ["low", "medium", "high"];

  return (
    <section className="edit-task-page__section edit-task-page__priority-section">
      <h2 className="edit-task-page__section-title">Priority</h2>
      <div className="edit-task-page__buttons-group">
        {levels.map(level => (
          <button 
            key={level}
            type="button" 
            className={`priority priority--${level} ${
              priority.value === level ? "priority--selected" : ""
            }`}
            data-priority={`${level}`}
            aria-pressed={priority.value === level}
            onClick={() => priority.setValue(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </section>
  );
}