import { useNavigate } from "react-router-dom";
import { OptionsWindow } from "../../components/OptionsWindow";
import EditIcon from '../../assets/icons/actions/edit-icon.svg';
import TrashIcon from '../../assets/icons/actions/trash-icon.svg';
import { deleteTask } from "../../utils/taskUtils";


export function TaskOptions({ menuPosition, projectId, openId, tasks, setTasks }) {
  const navigate = useNavigate();

  const handleEditTask = () => {
    navigate(`/project/${projectId}/${openId}`);
  };

  const handleDeleteTask = () => {
    deleteTask(tasks, setTasks, openId);
  };

  return(
    <OptionsWindow position={menuPosition}>
      <button className='options-window__item' onClick={handleEditTask}>
        <img src={EditIcon} alt="" role="presentation" />
        <span className='options-window__item-label'>Edit</span>
      </button>
      <button className='options-window__item' onClick={handleDeleteTask}>
        <img src={TrashIcon} alt="" role="presentation" />
        <span className='options-window__item-label red'>Trash</span>
      </button>
    </OptionsWindow>
  );
}