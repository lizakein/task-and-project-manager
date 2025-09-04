import { useNavigate } from 'react-router-dom';
import AddSquareIcon from '../assets/icons/add-square-icon.svg';
import MoreIcon from '../assets/icons/more-icon.svg';
import ArchiveIcon from '../assets/icons/archive-icon.svg';
import TrashIcon from '../assets/icons/trash-icon.svg';
import { useState } from 'react';
import { OptionsWindow } from './OptionsWindow';

export function ProjectsSection({ setProjects, projects, projectId }) {
  const [ openId, setOpenId ] = useState(null);
  const [ menuPosition, setMenuPosition ] = useState(null);

  const navigate = useNavigate();

  const createProject = () => {
    const project = {
      id: crypto.randomUUID(),
      title: 'New Project',
      color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6),
      description: "",
      createdAt: new Date().toISOString()
    };

    setProjects([...projects, project]);
    return project;
  };

  const handleCreateProject = () => {
    const newProject = createProject();
    navigate(`/project/${newProject.id}`);
  };

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
    <section className='projects-section'>
      <header className='projects-section__header'>
        <h2 className='projects-section__title'>My projects</h2>
        <button 
          className='icon-button' 
          aria-label="Add new project" 
          onClick={handleCreateProject}
        >
          <img src={AddSquareIcon} alt="" role="presentation" />
        </button>
      </header>

      <ul className="projects-list">
        {
          projects?.map((project) => {
            return (
              <li 
                key={project.id} 
                className={`projects-list__item ${project.id === projectId && `projects-list__item--active`}`}
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
                  <OptionsWindow position={menuPosition}>
                    <div className='options-window__item'>
                      <img src={ArchiveIcon} alt="" role="presentation" />
                      <span className='options-window__item-label'>Archive</span>
                    </div>
                    <div className='options-window__item'>
                      <img src={TrashIcon} alt="" role="presentation" />
                      <span className='options-window__item-label red'>Trash</span>
                    </div>
                  </OptionsWindow>  
                )}             
              </li>
            );        
          })
        }
      </ul>
    </section>
  );
}