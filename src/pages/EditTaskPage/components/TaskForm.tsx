import { PrioritySection } from "./PrioritySection";
import { TagsSection } from "@features/tags";
import { DescriptionSection } from "./DescriptionSection";
import { DueDateSection } from "./DueDateSection";
import { UploadButton } from "./UploadButton";
import { FormActions } from "./FormActions";
import type { FieldState } from "../../../types/fieldState";
import { Status, Task } from "@features/tasks";
import { StatusSection } from "./StatusSection";

interface TaskFormProps {
  title: FieldState<string>;
  description: FieldState<string>;
  priority: FieldState<Task["priority"] | "">;
  tags: FieldState<string[]>;
  dueDate: FieldState<string>;
  dueTime: FieldState<string>;
  hasTime: FieldState<boolean>;
  status: FieldState<Status>;
  handleSave: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
}

export function TaskForm({
  title,
  description,
  priority,
  tags,
  dueDate,
  dueTime,
  hasTime,
  status,
  handleSave,
  handleCancel,
}: TaskFormProps) {
  return (
    <form className="edit-task-page__form" onSubmit={handleSave}>
      <label htmlFor="task-title" className="sr-only">
        Task title
      </label>

      <input
        type="text"
        id="task-title"
        value={title.value}
        placeholder="Task title"
        className="edit-task-page__title-input"
        aria-label="Task title"
        onChange={(e) => title.setValue(e.target.value)}
      />

      <PrioritySection priority={priority} />
      <TagsSection tags={tags} />
      <DescriptionSection description={description} />
      <DueDateSection dueDate={dueDate} dueTime={dueTime} hasTime={hasTime} />
      <StatusSection status={status} />
      <UploadButton />
      <FormActions handleCancel={handleCancel} />
    </form>
  );
}
