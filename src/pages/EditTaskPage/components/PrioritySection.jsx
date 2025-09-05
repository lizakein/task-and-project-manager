export function PrioritySection({ priority, setPriority }) {
  const levels = ["low", "medium", "high"];

  return (
    <section className="edit-task-page__section edit-task-page__priority-section">
      <h2 className="edit-task-page__section-title">Priority</h2>
      <div className="edit-task-page__buttons-group">
        {levels.map(level => (
          <button 
            key={level}
            type="button" 
            className={`priority priority--${level} ${
              priority === level ? "priority--selected" : ""
            }`}
            data-priority={`${level}`}
            aria-pressed={priority === level}
            onClick={() => setPriority(level)}
          >
            {level}
          </button>
        ))}
      </div>
    </section>
  );
}