export function DescriptionSection({ description, setDescription }) {
  return (
    <section className="edit-task-page__section edit-task-page__description-section">
      <h2 className="edit-task-page__section-title">Description</h2>
      <textarea 
        type="text"               
        placeholder="Task description" 
        className="input-field"
        aria-label="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </section>
  );
}