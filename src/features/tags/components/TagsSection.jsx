import { useState } from "react";
import { useStore } from "@store/useStore";
import { getTagStyle } from "@utils/tagUtils";
import { TagsManagerModal } from "./TagsManagerModal";
import ManageTagsIcon from "@assets/icons/navigation/settings-icon.svg";

export default function TagsSection({ tags, setTags }) {
  const [ isTagsModalOpen, setIsTagsModalOpen ] = useState(false);
  const allTags = useStore(state => state.tags);
  
  const toggleTag = (tagId) => {
    setTags(prev => 
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
        {allTags.map((tag) => {
          const isActive = tags.includes(tag.id);
          const { color, backgroundColor } = getTagStyle(tag.color);
          return (
            <button 
              key={tag.id}
              type="button" 
              className={`tag tag--${tag.color} ${isActive ? 'tag--selected' : ''}`}
              style={{
                "--tag-text": color,
                "--tag-bg": backgroundColor
              }}
              aria-pressed={isActive}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.label}
            </button>
          );
        })}

        <TagsManagerModal 
          isTagsModalOpen={isTagsModalOpen}
          setIsTagsModalOpen={setIsTagsModalOpen}
        />    
      </div>
    </section>
  );
}