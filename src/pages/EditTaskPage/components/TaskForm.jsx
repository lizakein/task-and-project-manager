import { PrioritySection } from "./PrioritySection";
import { TagsSection } from "./TagsSection";
import { DescriptionSection } from "./DescriptionSection";
import { DueDateSection } from "./DueDateSection";
import { UploadButton } from "@ui/UploadButton";
import { FormActions } from "@ui/FormActions";

export function TaskForm({
  title, setTitle,
  description, setDescription,
  priority, setPriority,
  tags, setTags,
  dueDate, setDueDate,
  handleSave, handleCancel
}) {
  return (
    <form className="edit-task-page__form" onSubmit={handleSave}>
      <input 
        type='text'
        value={title}
        placeholder="Task title" 
        className="edit-task-page__title-input"
        aria-label="Task title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <PrioritySection priority={priority} setPriority={setPriority} />
      <TagsSection tags={tags} setTags={setTags} />
      <DescriptionSection description={description} setDescription={setDescription} />
      <DueDateSection dueDate={dueDate} setDueDate={setDueDate} />
      <UploadButton />
      <FormActions handleCancel={handleCancel} />   
    </form>
  );
}