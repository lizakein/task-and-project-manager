import { SortButton } from "../SortButton/SortButton";

interface SortSectionProps {
  label: string;
  field: "title" | "priority" | "date";
  selectedField: string | null;
  selectedDirection: "asc" | "desc";
  onSelect: (
    field: "title" | "priority" | "date",
    direction: "asc" | "desc"
  ) => void;
}

export function SortSection({
  label,
  field,
  selectedField,
  selectedDirection,
  onSelect,
}: SortSectionProps) {
  const directions: Array<"asc" | "desc"> = ["asc", "desc"];

  return (
    <div className="sort-section">
      <h3 className="sort-section__label">{label}</h3>
      <div className="sort-section__options">
        {directions.map((direction) => (
          <SortButton
            key={direction}
            direction={direction}
            selected={
              selectedDirection === direction && selectedField === field
            }
            onClick={() => onSelect(field, direction)}
          />
        ))}
      </div>
    </div>
  );
}
