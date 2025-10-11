interface PriorityButtonProps {
  level: "low" | "medium" | "high";
  selected: boolean;
  onClick: () => void;
};

export function PriorityButton({ level, selected, onClick }: PriorityButtonProps) {
  return (
    <button
      type="button" 
      className={`
        priority 
        priority--${level} 
        ${ selected ? "priority--selected" : "" }
      `}
      data-priority={level}
      aria-pressed={selected}
      onClick={onClick}
    >
      {level}
    </button>
  );
}