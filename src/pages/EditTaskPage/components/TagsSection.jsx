import { useEffect, useState, useRef } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import AddIcon from "../../../assets/icons/actions/add-square-icon.svg";

export function TagsSection({ tags, setTags }) {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ newTag, setNewTag ] = useState('');
  const [ allTags, setAllTags ] = useLocalStorage("tags", ["Life", "Work", "Sport"]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current)
      inputRef.current.focus();
  }, [isEditing]);
  
  const toggleTag = (tag) => {
    setTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const addTag = () => {
    if (isEditing) {
      const newTagTrim = newTag.trim();
      if (newTag && !allTags.includes(newTag))
        setAllTags([...allTags, newTagTrim]);
      setIsEditing(false);
      setNewTag('');
    } else {
      setIsEditing(true);
    }
  };

  const updateTagsInput = event => setNewTag(event.target.value);

  const handleTagsKeyDown = (event) => {
    if (event.key === 'Enter') addTag();
    else if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <section className="edit-task-page__section edit-task-page__tags-section">
      <h2 className="edit-task-page__section-title">Tag</h2>
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
        { isEditing ?          
          <input
            ref={inputRef}
            type='text'
            className="input-field"
            onChange={updateTagsInput}
            onKeyDown={handleTagsKeyDown}
          /> : (
            <button 
            type="button" 
            className="icon-button" 
            aria-label="Add tag"
            onClick={addTag}
            >
              <img src={AddIcon} alt="" role="presentation" />
            </button>
        )}        
      </div>
    </section>
  );
}