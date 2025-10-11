import { useState } from "react";
import { useStore } from "@store/useStore";
import { TagsManagerModal } from "./TagsManagerModal";
import ManageTagsIcon from "@assets/icons/navigation/settings-icon.svg";
import { FieldState } from "../../../types/fieldState";
import { TagButton } from "@features/tasks/components/TagButton/TagButton";

interface TagsSectionProps {
  tags: FieldState<string[]>;
};

export default function TagsSection({ tags }: TagsSectionProps) {
  const [ isTagsModalOpen, setIsTagsModalOpen ] = useState(false);
  const allTags = useStore(state => state.tags);
  
  const toggleTag = (tagId: string) => {
    tags.setValue(prev => 
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  return (
    <section className="edit-task-page__section edit-task-page__tags-section">
      <div className="edit-task-page__header">
        <h2 className="edit-task-page__section-title">Tag</h2>
        <button
          type="button" 
          className="icon-button" 
          aria-label="Manage tags"
          onClick={() => setIsTagsModalOpen(true)}
        >
          <img src={ManageTagsIcon} alt="" role="presentation" />
        </button>
      </div>
      
      <div className="edit-task-page__buttons-group">
        {allTags.map((tag) => (
          <TagButton 
            key={tag.id}
            tag={tag} 
            selected={tags.value.includes(tag.id)}
            onClick={() => toggleTag(tag.id)}
          />
        ))}

        <TagsManagerModal 
          isTagsModalOpen={{ value: isTagsModalOpen, setValue: setIsTagsModalOpen }}
        />    
      </div>
    </section>
  );
}