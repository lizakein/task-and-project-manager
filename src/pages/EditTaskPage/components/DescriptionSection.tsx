import { FieldState } from "@app-types/fieldState";

interface DescriptionProps {
  description: FieldState<string>;
}

export function DescriptionSection({ description }: DescriptionProps) {
  return (
    <section className="edit-task-page__section edit-task-page__description-section">
      <h2 id="description-label" className="edit-task-page__section-title">
        Description
      </h2>
      <textarea
        placeholder="Task description"
        className="input-field"
        aria-labelledby="description-label"
        value={description.value}
        onChange={(e) => description.setValue(e.target.value)}
      />
    </section>
  );
}
