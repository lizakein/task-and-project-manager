import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { OptionsWindow, ConfirmModal, Button, Icon } from "@ui/index";
import EditIcon from "@assets/icons/actions/edit-icon.svg";
import TrashIcon from "@assets/icons/actions/trash-icon.svg";
import MoveIcon from "@assets/icons/actions/move-icon.svg";
import { MenuPosition } from "@hooks/useContextMenu";
import { useTasksStore } from "@store/hooks";
import { Status } from "../types";
import { getAvailableMoves } from "@utils/getAvailableMoves";

interface TaskOptionsProps {
  menuPosition: MenuPosition;
  projectId: string;
  openId: string;
  title: string | null;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  status: Status;
}

export function TaskOptions({
  menuPosition,
  projectId,
  openId,
  title,
  onClose,
  triggerRef,
  status,
}: TaskOptionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { updateTask, deleteTask } = useTasksStore();

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
      {getAvailableMoves(status).map((move) => (
        <Button
          key={move.status}
          variant="ghost"
          className="options-window__item"
          role="menuitem"
          onClick={() => {
            updateTask(openId, { status: move.status });
            onClose();
          }}
          leftIcon={<Icon src={MoveIcon} />}
        >
          <span className="options-window__item-label">
            Move to {move.label}
          </span>
        </Button>
      ))}

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
