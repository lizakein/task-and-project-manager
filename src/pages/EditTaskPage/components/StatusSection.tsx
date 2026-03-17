import { Status, TASK_STATUS } from "@features/tasks";
import { ToggleButton } from "@ui/index";
import { FieldState } from "types/fieldState";

interface StatusSectionProps {
  status: FieldState<Status>;
}

export function StatusSection({ status }: StatusSectionProps) {
  return (
    <section className="edit-task-page__section edit-task-page__status-section">
      <h2 className="edit-task-page__section-title">Status</h2>
      <div className="edit-task-page__buttons-group">
        {Object.entries(TASK_STATUS).map((s) => (
          <ToggleButton
            key={s[0]}
            className="chip"
            selected={status.value === s[0]}
            onClick={() => status.setValue(s[0] as Status)}
          >
            {s[1].label}
          </ToggleButton>
        ))}
      </div>
    </section>
  );
}
