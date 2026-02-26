import { MenuPosition } from "@hooks/useContextMenu";
import { OptionsWindow } from "@ui/OptionsWindow/OptionsWindow";

interface TaskSortMenuProps {
  position: MenuPosition;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function TaskSortMenu({
  position,
  onClose,
  triggerRef,
}: TaskSortMenuProps) {
  return <OptionsWindow></OptionsWindow>;
}
