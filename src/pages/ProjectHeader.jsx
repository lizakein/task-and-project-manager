import EditIcon from '../assets/icons/edit-icon.svg';
import ShareIcon from '../assets/icons/share-icon.svg';
import FilterIcon from '../assets/icons/filter-icon.svg';
import ArrowDownIcon from '../assets/icons/arrow-down-icon.svg';
import SortIcon from '../assets/icons/sort-icon.svg';

export function ProjectHeader() {
  return (
    <header className='project-header'>
      <div className='project-header__left'>
        <h1 className="project-header__title">Project 1</h1>

        <div className='project-header__actions'>
          <button className='icon-button' aria-label='Edit project title'>
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