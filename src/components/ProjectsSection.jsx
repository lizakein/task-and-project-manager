import AddSquareIcon from '../assets/icons/add-square-icon.svg';
import MoreIcon from '../assets/icons/more-icon.svg';

export function ProjectsSection({ setProjectId, projects }) {
  

  return (
    <section className='projects-section'>
      <header className='projects-section__header'>
        <h2 className='projects-section__title'>My projects</h2>
        <button 
          className='icon-button' 
          aria-label="Add new project" 
        >
          <img src={AddSquareIcon} alt="" role="presentation" />
        </button>
      </header>

      <ul className="projects-list">
        {
          projects.map((project) => {
            return (
              <li 
                key={project.id} 
                className="projects-list__item" 
                style={{ "--marker-color": project.color }}
                onClick={() => {setProjectId(project.id)}}
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