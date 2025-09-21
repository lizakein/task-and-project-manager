import { PrioritySection } from "./PrioritySection";
import { TagsSection } from "@features/tags";
import { DescriptionSection } from "./DescriptionSection";
import { DueDateSection } from "./DueDateSection";
import { UploadButton } from "@ui/UploadButton";
import { FormActions } from "@ui/FormActions";
import type { FieldState } from "../../../types/fieldState";
import { Task } from "@features/tasks";

interface TaskFormProps {
  title: FieldState<string>;
  description: FieldState<string>;
  priority: FieldState<Task["priority"] | "">;
  tags: FieldState<string[]>;
  dueDate: FieldState<string>;
  handleSave: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
};

export function TaskForm({
  title,
  description,
  priority,
  tags,
  dueDate,
  handleSave, 
  handleCancel
}: TaskFormProps) {
  return (
    <form className="edit-task-page__form" onSubmit={handleSave}>
      <input 
        type='text'
        value={title.value}
        placeholder="Task title" 
        className="edit-task-page__title-input"
        aria-label="Task title"
        onChange={(e) => title.setValue(e.target.value)}
      />

      <PrioritySection priority={priority} />
      <TagsSection tags={tags} />
      <DescriptionSection description={description} />
      <DueDateSection dueDate={dueDate} />
      <UploadButton />
      <FormActions handleCancel={handleCancel} />   
    </form>
  );
}