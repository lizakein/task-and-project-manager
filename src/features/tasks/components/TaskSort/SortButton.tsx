import { ToggleButton } from "@ui/index";

interface SortButtonProps {
  direction: "asc" | "desc";
  selected: boolean;
  onClick: () => void;
}

export function SortButton({ direction, selected, onClick }: SortButtonProps) {
  return (
    <ToggleButton
      className="chip sort-option"
      selected={selected}
      onClick={onClick}
    >
      {direction === "asc" ? "Ascending" : "Descending"}
    </ToggleButton>
  );
}
