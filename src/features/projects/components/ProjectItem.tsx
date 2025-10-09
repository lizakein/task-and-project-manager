import { useNavigate } from 'react-router-dom';
import MoreIcon from '@assets/icons/actions/more-icon.svg';
import { ProjectOptions } from './ProjectOptions';
import { useContextMenu } from '@hooks/useContextMenu';
import { Project } from '../types';
import { useRef } from 'react';

interface ProjectItemProps {
  project: Project;
  isActive: boolean;
}

export function ProjectItem({ project, isActive }: ProjectItemProps) {
  const navigate = useNavigate();
  const { openId, menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <li 
      className={`projects-list__item ${isActive && 
        `projects-list__item--active`}`}
      style={{ "--marker-color": project.color } as React.CSSProperties }
      onClick={() => {navigate(`/project/${project.id}`)}}
    >
      <span className='projects-list__name'>{project.title}</span>
      <button 
        ref={buttonRef}
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
          onClose={closeMenu}
          triggerRef={buttonRef}
        />
      )}
    </li>
  );
}