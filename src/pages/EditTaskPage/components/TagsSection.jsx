import { useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import ManageTagsIcon from "../../../assets/icons/navigation/settings-icon.svg";
import { TagsManagerModal } from "./TagsManagerModal";

export function TagsSection({ tags, setTags }) {
  const [ isTagsModalOpen, setIsTagsModalOpen ] = useState(false);
  const [ allTags, setAllTags ] = useLocalStorage("tags", ["Life", "Work", "Sport"]);
  
  const toggleTag = (tag) => {
    setTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section className="edit-task-page__section edit-task-page__tags-section">
      <h2 className="edit-task-page__section-title">Tag</h2>
      <button
        type="button" 
        className="icon-button" 
        aria-label="Manage tags"
        onClick={() => setIsTagsModalOpen(true)}
      >
        <img src={ManageTagsIcon} alt="" role="presentation" />
      </button>
      <div className="edit-task-page__buttons-group">
        {allTags.map((tag) => {
          const isActive = tags.includes(tag);
          return (
            <button 
              key={tag}
              type="button" 
              className={`tag tag--blue ${isActive ? 'tag--selected' : ''}`}
              aria-pressed={isActive}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          );
        })}

        <TagsManagerModal 
          isTagsModalOpen={isTagsModalOpen}
          setIsTagsModalOpen={setIsTagsModalOpen} 
          allTags={allTags} 
          setAllTags={setAllTags}
        />    
      </div>
    </section>
  );
}