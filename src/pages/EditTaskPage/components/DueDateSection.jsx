export function DueDateSection({ dueDate, setDueDate }) {
  return (
    <section className="edit-task-page__section edit-task-page__due-date-section">
      <h2 className="edit-task-page__section-title">Due date</h2>
      <input 
        type="datetime-local" 
        className="input-field input-field--date" 
        aria-label="Due date" 
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
    </section>
  );
}