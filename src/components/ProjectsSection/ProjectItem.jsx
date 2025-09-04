import { useNavigate } from 'react-router-dom';
import MoreIcon from '../../assets/icons/actions/more-icon.svg';
import { ProjectOptions } from './ProjectOptions';

export function ProjectItem({ 
  project, 
  isActive, 
  openId, 
  setOpenId, 
  menuPosition, 
  setMenuPosition
}) {
  const navigate = useNavigate();

  const handleMoreClick = (event,  projectId) => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX
    });

    setOpenId(openId === projectId ? null : projectId);
  };

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
        <ProjectOptions menuPosition={menuPosition} />
      )}             
    </li>
  );
}