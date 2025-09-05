import { useNavigate } from "react-router-dom";
import { OptionsWindow } from "../../components/OptionsWindow";
import EditIcon from '../../assets/icons/actions/edit-icon.svg';
import TrashIcon from '../../assets/icons/actions/trash-icon.svg';
import { useStore } from "../../store/useStore";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useState } from "react";

export function TaskOptions({ menuPosition, projectId, openId, title }) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const navigate = useNavigate();
  const deleteTask = useStore(state => state.deleteTask);

  const handleEditTask = () => {
    navigate(`/project/${projectId}/${openId}`);
  };

  const handleConfirmDelete = () => {
    deleteTask(openId);
    setIsModalOpen(false);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  return(
    <OptionsWindow position={menuPosition}>
      <button className='options-window__item' onClick={handleEditTask}>
        <img src={EditIcon} alt="" role="presentation" />
        <span className='options-window__item-label'>Edit</span>
      </button>
      <button className='options-window__item' onClick={handleDeleteClick}>
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