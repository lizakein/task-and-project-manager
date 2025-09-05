import { useNavigate, useParams } from 'react-router-dom';
import { OptionsWindow } from '../OptionsWindow';
import { useStore } from '../../store/useStore';
import ArchiveIcon from '../../assets/icons/actions/archive-icon.svg';
import TrashIcon from '../../assets/icons/actions/trash-icon.svg';

export function ProjectOptions({ menuPosition, openId }) {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projects = useStore(state => state.projects);
  const deleteProject = useStore(state => state.deleteProject);

  const handleDeleteProject = () => {
    deleteProject(openId);

    const isDeletedProjectActive = window.location.pathname.includes(openId);
    const updatedProjects = projects.filter(p => p.id !== openId);

    if (isDeletedProjectActive) {
      setTimeout(() => {
        navigate(`/project/${updatedProjects[0]?.id || ''}`);
      }, 0);
    } else {
      setTimeout(() => {
        navigate(`/project/${projectId}`);
      }, 0);
    }    
  };

  return (
    <OptionsWindow position={menuPosition}>
      <button className='options-window__item'>
        <img src={ArchiveIcon} alt="" role="presentation" />
        <span className='options-window__item-label'>Archive</span>
      </button>
      <button className='options-window__item' onClick={handleDeleteProject}>
        <img src={TrashIcon} alt="" role="presentation" />
        <span className='options-window__item-label red'>Trash</span>
      </button>
    </OptionsWindow>
  );
}