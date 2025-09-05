import AddIcon from "../../../assets/icons/actions/add-square-icon.svg";

export function TagsSection({ tags, setTags }) {
  const allTags = ["Life", "Work", "Sport"];
  
  const toggleTag = (tag) => {
    setTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
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
        <button type="button" className="icon-button" aria-label="Add tag">
          <img src={AddIcon} alt="" role="presentation" />
        </button>
      </div>
    </section>
  );
}