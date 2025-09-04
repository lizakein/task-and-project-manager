import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ProjectItem } from './ProjectItem';
import AddSquareIcon from '../../assets/icons/add-square-icon.svg';

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
              <ProjectItem
                key={project.id}
                project={project} 
                isActive={project.id === projectId}    
                openId={openId}
                setOpenId={setOpenId}
                menuPosition={menuPosition}
                setMenuPosition={setMenuPosition}           
              />
            );        
          })
        }
      </ul>
    </section>
  );
}