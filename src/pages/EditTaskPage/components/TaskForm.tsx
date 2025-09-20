import { PrioritySection } from "./PrioritySection";
import { TagsSection } from "@features/tags";
import { DescriptionSection } from "./DescriptionSection";
import { DueDateSection } from "./DueDateSection";
import { UploadButton } from "@ui/UploadButton";
import { FormActions } from "@ui/FormActions";
import { Dispatch, SetStateAction } from "react";

interface TaskFormProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  priority: string;
  setPriority: Dispatch<SetStateAction<string>>;
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  dueDate: string;
  setDueDate: Dispatch<SetStateAction<string>>;
  handleSave: (event: React.FormEvent<HTMLFormElement>) => void;
  handleCancel: () => void;
};

export function TaskForm({
  title, setTitle,
  description, setDescription,
  priority, setPriority,
  tags, setTags,
  dueDate, setDueDate,
  handleSave, handleCancel
}: TaskFormProps) {
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