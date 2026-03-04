import { Priority } from "@features/tasks/types";
import { ToggleButton } from "@ui/index";

interface PriorityButtonProps {
  level: Priority;
  selected: boolean;
  onClick: () => void;
}

export default function PriorityButton({
  level,
  selected,
  onClick,
}: PriorityButtonProps) {
  return (
    <ToggleButton
      className={`
        chip
        priority 
        priority--${level} 
      `}
      data-priority={level}
      selected={selected}
      onClick={onClick}
    >
      {level}
    </ToggleButton>
  );
}
