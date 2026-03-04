import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OptionsWindow, ConfirmModal, Button, Icon } from "@ui/index";
import EditIcon from "@assets/icons/actions/edit-icon.svg";
import TrashIcon from "@assets/icons/actions/trash-icon.svg";
import { MenuPosition } from "@hooks/useContextMenu";
import { useTasksStore } from "@store/hooks";

interface TaskOptionsProps {
  menuPosition: MenuPosition;
  projectId: string;
  openId: string;
  title: string | null;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function TaskOptions({
  menuPosition,
  projectId,
  openId,
  title,
  onClose,
  triggerRef,
}: TaskOptionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { deleteTask } = useTasksStore();

  const handleEditTask = () => {
    navigate(`/project/${projectId}/${openId}`);
  };

  const handleConfirmDelete = () => {
    deleteTask(openId);
    setIsModalOpen(false);
    onClose?.();
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  return (
    <OptionsWindow
      position={menuPosition}
      onClose={onClose}
      triggerRef={triggerRef}
    >
      <Button
        variant="ghost"
        className="options-window__item"
        role="menuitem"
        onClick={handleEditTask}
        leftIcon={<Icon src={EditIcon} />}
      >
        <span className="options-window__item-label">Edit</span>
      </Button>
      <Button
        variant="ghost"
        className="options-window__item"
        role="menuitem"
        onClick={handleDeleteClick}
        leftIcon={<Icon src={TrashIcon} />}
      >
        <span className="options-window__item-label red">Trash</span>
      </Button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete task"
        message={`Are you sure you want to delete the task: ${title}`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </OptionsWindow>
  );
}
