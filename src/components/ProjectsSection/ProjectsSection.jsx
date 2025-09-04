import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ProjectItem } from './ProjectItem';
import { createProject } from '../../utils/projectUtils';
import AddSquareIcon from '../../assets/icons/actions/add-square-icon.svg';

export function ProjectsSection({ setProjects, projects, projectId }) {
  const [ openId, setOpenId ] = useState(null);
  const [ menuPosition, setMenuPosition ] = useState(null);

  const navigate = useNavigate();

  const handleCreateProject = () => {
    const newProject = createProject(projects, setProjects);
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
                projects={projects}
                setProjects={setProjects}         
              />
            );        
          })
        }
      </ul>
    </section>
  );
}