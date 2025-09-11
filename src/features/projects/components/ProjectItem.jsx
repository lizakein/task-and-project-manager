import { useNavigate } from 'react-router-dom';
import MoreIcon from '@assets/icons/actions/more-icon.svg';
import { ProjectOptions } from './ProjectOptions';
import { useContextMenu } from '@hooks/useContextMenu';

export function ProjectItem({ project, isActive }) {
  const navigate = useNavigate();
  const { openId, menuPosition, handleMoreClick } = useContextMenu();

  return (
    <li 
      className={`projects-list__item ${isActive && 
        `projects-list__item--active`}`}
      style={{ "--marker-color": project.color }}
      onClick={() => {navigate(`/project/${project.id}`)}}
    >
      <span className='projects-list__name'>{project.title}</span>
      <button 
        className="icon-button" 
        aria-label={`More options for Project ${project.title}`}
        onClick={(e) => handleMoreClick(e, project.id)}
      >
        <img src={MoreIcon} alt="" role="presentation" />
      </button>

      {openId === project.id && menuPosition && (
        <ProjectOptions 
          menuPosition={menuPosition} 
          openId={openId}
          title={project.title}
        />
      )}             
    </li>
  );
}