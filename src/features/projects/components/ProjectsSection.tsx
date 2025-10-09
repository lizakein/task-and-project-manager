import { useNavigate } from 'react-router-dom';
import { ProjectItem } from './ProjectItem';
import AddSquareIcon from '@assets/icons/actions/add-square-icon.svg';
import { useStore } from '@store/useStore';

interface ProjectsSection {
  projectId: string | null;
}

export default function ProjectsSection({ projectId }: ProjectsSection) {
  const navigate = useNavigate();

  const { projects } = useStore();
  const addNewProject = useStore(state => state.addProject);

  const handleCreateProject = () => {
    const newProject = addNewProject();
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
              />
            );        
          })
        }
      </ul>
    </section>
  );
}