import EditIcon from '../assets/icons/edit-icon.svg';
import ShareIcon from '../assets/icons/share-icon.svg';
import FilterIcon from '../assets/icons/filter-icon.svg';
import ArrowDownIcon from '../assets/icons/arrow-down-icon.svg';
import SortIcon from '../assets/icons/sort-icon.svg';
import AddPurpleIcon from '../assets/icons/add-square-purple-icon.svg';
import MoreIcon from '../assets/icons/more-icon.svg';
import ClockIcon from '../assets/icons/clock-icon.svg';
import './ProjectPage.css';

export function ProjectPage() {
  return (
    <main className='project-page'>
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

      <section className='task-board'>
        <div className='task-column'>
          <header className='task-column__header' data-status='to-do'>
            <div className='task-column__header-left'>
              <h2 className='task-column__title'>To Do</h2>
              <span className='task-column__count' aria-label='Number of tasks'>2</span>
            </div>           
            <button className='icon-button' aria-label='Add new task'>
              <img src={AddPurpleIcon} alt="" role="presentation" />
            </button>
          </header>

          <article className='task-card'>
            <div className='task-card__header'>
              <p className='task-card__priority' aria-label='Priority: Medium' data-priority='medium'>Medium</p>
              <button 
                className="icon-button" 
                aria-label="More options for task 1"
              >
                <img src={MoreIcon} alt="" role="presentation" />
              </button>
            </div>

            <h3 className='task-card__title'>Task 1</h3>
            <p className='task-card__description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sollicitudin vulputate metus. Donec ultrices dictum dictum.</p>

            <div className='task-card__footer'>
              <span className='task-card__type'>Work</span>
              <time className='task-card__due' dateTime='2025-09-04'>
                <img src={ClockIcon} alt="" role="presentation" />
                <span>04.09.25</span>
              </time>
            </div>
          </article>
        </div>

        <div className='task-column'>
          <header className='task-column__header' data-status='on-progress'>
            <div className='task-column__header-left'>
              <h2 className='task-column__title' >On progress</h2>
              <span className='task-column__count' aria-label='Number of tasks'>0</span>
            </div>           
          </header>
        </div>

        <div className='task-column'>
          <header className='task-column__header' data-status='done'>
            <div className='task-column__header-left'>
              <h2 className='task-column__title'>Done</h2>
              <span className='task-column__count' aria-label='Number of tasks'>0</span>
            </div>           
          </header>
        </div>
      </section>    
    </main>
  );
}