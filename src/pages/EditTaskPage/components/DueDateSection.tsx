import { FieldState } from "../../../types/fieldState";

interface DueDateProps {
  dueDate: FieldState<string>;
}

export function DueDateSection({ dueDate }: DueDateProps) {
  return (
    <section className="edit-task-page__section edit-task-page__due-date-section">
      <h2 id="due-date-label" className="edit-task-page__section-title">
        Due date
      </h2>
      <input
        type="datetime-local"
        className="input-field input-field__date"
        aria-labelledby="due-date-label"
        value={dueDate.value}
        onChange={(e) => dueDate.setValue(e.target.value)}
      />
    </section>
  );
}
