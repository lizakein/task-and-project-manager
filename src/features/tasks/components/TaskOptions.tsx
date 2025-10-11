import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useStore } from "@store/useStore";
import { OptionsWindow } from "@ui/OptionsWindow/OptionsWindow";
import { ConfirmModal } from "@ui/ConfirmModal/ConfirmModal";
import EditIcon from '@assets/icons/actions/edit-icon.svg';
import TrashIcon from '@assets/icons/actions/trash-icon.svg';
import { MenuPosition } from "@hooks/useContextMenu";

interface TaskOptionsProps {
  menuPosition: MenuPosition;
  projectId: string;
  openId: string;
  title: string | null;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

export function TaskOptions({ menuPosition, projectId, openId, title, onClose, triggerRef }: TaskOptionsProps) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const navigate = useNavigate();
  const deleteTask = useStore(state => state.deleteTask);

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

  return(
    <OptionsWindow position={menuPosition} onClose={onClose} triggerRef={triggerRef}>
      <button 
        className='options-window__item'
        role="menuitem" 
        type="button"
        onClick={handleEditTask}
      >
        <img src={EditIcon} alt="" role="presentation" />
        <span className='options-window__item-label'>Edit</span>
      </button>
      <button 
        className='options-window__item'
        role="menuitem" 
        type="button"
        onClick={handleDeleteClick}
      >
        <img src={TrashIcon} alt="" role="presentation" />
        <span className='options-window__item-label red'>Trash</span>
      </button>

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