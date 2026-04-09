import { Button, Icon } from "@ui/index";
import { FieldState } from "@app-types/fieldState";
import AddSquareIcon from "@assets/icons/actions/add-square-icon.svg";
import TrashIcon from "@assets/icons/actions/trash-icon.svg";

interface DueDateProps {
  dueDate: FieldState<string>;
  dueTime: FieldState<string>;
  hasTime: FieldState<boolean>;
}

export function DueDateSection({ dueDate, dueTime, hasTime }: DueDateProps) {
  const handleClick = () => {
    if (hasTime.value) {
      hasTime.setValue(false);
      dueTime.setValue("");
    } else {
      hasTime.setValue(true);
    }
  };

  return (
    <section className="edit-task-page__section edit-task-page__due-date-section">
      <h2 id="due-date-label" className="edit-task-page__section-title">
        Due date
      </h2>

      <div className="edit-task-page__due-date-inputs">
        <input
          type="date"
          className="input-field input-field__date"
          aria-labelledby="due-date-label"
          value={dueDate.value}
          onChange={(e) => dueDate.setValue(e.target.value)}
        />

        {hasTime.value && (
          <input
            type="time"
            className="input-field input-field__time"
            value={dueTime.value}
            onChange={(e) => dueTime.setValue(e.target.value)}
          />
        )}
      </div>

      <Button
        onClick={() => handleClick()}
        leftIcon={
          <Icon
            src={hasTime.value ? TrashIcon : AddSquareIcon}
            className="edit-task-page__due-date-icon"
          />
        }
      >
        {hasTime.value ? "Remove time" : "Add time"}
      </Button>
    </section>
  );
}
