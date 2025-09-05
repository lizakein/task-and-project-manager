import { useEffect, useState } from 'react';
import EditIcon from '../../assets/icons/actions/edit-purple-icon.svg';
import ShareIcon from '../../assets/icons/actions/share-icon.svg';
import FilterIcon from '../../assets/icons/actions/filter-icon.svg';
import ArrowDownIcon from '../../assets/icons/actions/arrow-down-icon.svg';
import SortIcon from '../../assets/icons/actions/sort-icon.svg';

export function ProjectHeader({ projects, projectId, setProjects }) {
  const currentProject = projects.find(project => project.id === projectId);

  const [ isEditingTitle, setIsEditingTitle ] = useState(false);
  const [ title, setTitle ] = useState('');

  useEffect(() => {
    if (currentProject) setTitle(currentProject.title);
  }, [currentProject]);
 
  const editTitle = () => {
    if (!currentProject) return;

    if (isEditingTitle) {
      setProjects(project => 
        project.map(p => p.id === projectId ? {...p, title} : p)
      );
      setIsEditingTitle(false);
    } else {
      setIsEditingTitle(true);
    }
  };

  const updateTitleInput = event => setTitle(event.target.value);

  const handleTitleKeyDown = (event) => {
    if (event.key === 'Enter') editTitle();
    else if (event.key === 'Escape') {
      setTitle(currentProject.title);
      setIsEditingTitle(false);
    }
  }

  if (!currentProject) {
    return (
      <header className="project-header">
        <h1 className="project-header__title">Загрузка...</h1>
      </header>
    );
  }

  return (
    <header className='project-header'>
      <div className='project-header__left'>
        { isEditingTitle ? 
          <input 
            type='text' 
            className='project-header__title-input' 
            value={title}
            onChange={updateTitleInput}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          /> : (
          <h1 className="project-header__title">{currentProject.title}</h1>
        )}
        
        <div className='project-header__actions'>
          <button className='icon-button' aria-label='Edit project title' onClick={editTitle}>
            <img src={EditIcon} alt="" role="presentation" />
          </button>

          <button className='icon-button' aria-label='Share project'>
            <img src={ShareIcon} alt="" role="presentation" />
          </button>
        </div>
      </div>
      
      <section className='task-controls'>
        <button className='task-controls__button' aria-label='Filter tasks'>
          <img src={FilterIcon} alt="" role="presentation" />
          <span className='task-cintrols__button-name'>Filter</span>
          <img src={ArrowDownIcon} alt="" role="presentation" />
        </button>

        <button className='task-controls__button' aria-label='Sort tasks'>
          <img src={SortIcon} alt="" role="presentation" />
          <span className='task-cintrols__button-name'>Sort</span>
          <img src={ArrowDownIcon} alt="" role="presentation" />
        </button>
      </section>
    </header>
  );
}