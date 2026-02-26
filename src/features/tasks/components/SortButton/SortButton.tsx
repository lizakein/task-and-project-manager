interface SortButtonProps {
  direction: "asc" | "desc";
  selected: boolean;
  onClick: () => void;
}

export function SortButton({ direction, selected, onClick }: SortButtonProps) {
  return (
    <button
      type="button"
      className={` 
        sort-option
        ${selected ? "sort-option--selected" : ""}
      `}
      aria-pressed={selected}
      onClick={onClick}
    >
      {direction === "asc" ? "Ascending" : "Descending"}
    </button>
  );
}
