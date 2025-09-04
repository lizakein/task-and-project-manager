import { useNavigate } from 'react-router-dom';
import AddSquareIcon from '../assets/icons/add-square-icon.svg';
import MoreIcon from '../assets/icons/more-icon.svg';

export function ProjectsSection({ setProjects, projects, projectId }) {
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
                >
                  <img src={MoreIcon} alt="" role="presentation" />
                </button>     
              </li>
            );        
          })
        }
      </ul>
    </section>
  );
}