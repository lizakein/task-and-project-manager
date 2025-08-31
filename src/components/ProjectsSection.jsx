import axios from 'axios';
import AddSquareIcon from '../assets/icons/add-square-icon.svg';
import MoreIcon from '../assets/icons/more-icon.svg';
import { useState } from 'react';

export function ProjectsSection() {
  const [ projects, setProjects] = useState([]);

  const fetchProjectsData = async () => {
    const response = await axios.get('/src/data/projects.json');

    setProjects(response.data);
  };

  fetchProjectsData();

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

        

        {/* <li className="projects-list__item" data-color="blue"> 
          <span className='projects-list__name'>Project 2</span>
          <button 
            className="icon-button" 
            aria-label="More options for Project 2"
          >
            <img src={MoreIcon} alt="" role="presentation" />
          </button>   
        </li>

        <li className="projects-list__item" data-color="green">
          <span className='projects-list__name'>Project 3</span>
          <button 
            className="icon-button" 
            aria-label="More options for Project 3"
          >
            <img src={MoreIcon} alt="" role="presentation" />
          </button>   
        </li>*/}
      </ul>
    </section>
  );
}