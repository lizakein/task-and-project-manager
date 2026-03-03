import { Priority } from "@features/tasks/types";
import { Button } from "@ui/index";

interface PriorityButtonProps {
  level: Priority;
  selected: boolean;
  onClick: () => void;
}

export function PriorityButton({
  level,
  selected,
  onClick,
}: PriorityButtonProps) {
  return (
    <Button
      className={`
        priority 
        priority--${level} 
        ${selected ? "priority--selected" : ""}
      `}
      data-priority={level}
      aria-pressed={selected}
      onClick={onClick}
    >
      {level}
    </Button>
  );
}
