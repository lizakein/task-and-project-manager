import { useEffect, useState } from 'react';
import EditIcon from '@assets/icons/actions/edit-purple-icon.svg';
import ShareIcon from '@assets/icons/actions/share-icon.svg';
import FilterIcon from '@assets/icons/actions/filter-icon.svg';
import ArrowDownIcon from '@assets/icons/actions/arrow-down-icon.svg';
import SortIcon from '@assets/icons/actions/sort-icon.svg';
import { useStore } from '@store/useStore';

interface ProjectHeaderProps {
  projectId: string;
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const currentProject = useStore(state => state.projects.find(p => p.id === projectId));
  const updateProjectTitle = useStore(state => state.updateProjectTitle);

  const [ isEditingTitle, setIsEditingTitle ] = useState(false);
  const [ title, setTitle ] = useState('');

  useEffect(() => {
    if (currentProject) setTitle(currentProject.title);
  }, [currentProject]);
 
  const editTitle = () => {
    if (!currentProject) return;

    if (isEditingTitle) {
      updateProjectTitle(projectId, title);
      setIsEditingTitle(false);
    } else {
      setIsEditingTitle(true);
    }
  };

  const updateTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => 
    setTitle(event.target.value);

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') editTitle();
    else if (event.key === 'Escape') {
      setTitle(currentProject?.title || '');
      setIsEditingTitle(false);
    }
  }

  if (!currentProject) {
    return (
      <header className="project-header">
        <span 
          className="project-header__title" 
          role='status' 
          aria-live='polite'
        >
          Загрузка...
        </span>
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
            aria-label='Project title'
            onChange={updateTitleInput}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          /> : (
          <h1 className="project-header__title">{currentProject.title}</h1>
        )}
        
        <div className='project-header__actions'>
          <button 
            type='button'
            className='icon-button' 
            aria-label='Edit project title' 
            onClick={editTitle}
          >
            <img src={EditIcon} alt="" role="presentation" />
          </button>

          <button 
            type='button'
            className='icon-button' 
            aria-label='Share project'
          >
            <img src={ShareIcon} alt="" role="presentation" />
          </button>
        </div>
      </div>
      
      <section className='task-controls' aria-label='Task controls'>
        <button 
          type='button'
          className='task-controls__button' 
        >
          <img src={FilterIcon} alt="" role="presentation" />
          <span className='task-controls__button-name'>Filter</span>
          <img src={ArrowDownIcon} alt="" role="presentation" />
        </button>

        <button 
          type='button'
          className='task-controls__button'
        >
          <img src={SortIcon} alt="" role="presentation" />
          <span className='task-controls__button-name'>Sort</span>
          <img src={ArrowDownIcon} alt="" role="presentation" />
        </button>
      </section>
    </header>
  );
}