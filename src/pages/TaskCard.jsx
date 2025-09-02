import MoreIcon from '../assets/icons/more-icon.svg';
import ClockIcon from '../assets/icons/clock-icon.svg';

export function TaskCard({ title, description, priority, tags, dueDate }) {
  return (
    <article className='task-card'>
      <div className='task-card__header'>
        <p className='task-card__priority' aria-label={`Priority: ${priority}`} data-priority={priority}>{priority}</p>
        <button 
          className="icon-button" 
          aria-label={`More options for task ${title}`}
        >
          <img src={MoreIcon} alt="" role="presentation" />
        </button>
      </div>

      <h3 className='task-card__title'>{title}</h3>
      { description && <p className='task-card__description'>{description}</p> }
      

      <div className='task-card__footer'>
        <div className='task-card__tags'>
          {tags.map((tag) => {
            return <span key={crypto.randomUUID()} className='task-card__tag'>{tag}</span>
          })}
        </div>
        
        {dueDate && 
          <time className='task-card__due' dateTime='2025-09-04'>
            <img src={ClockIcon} alt="" role="presentation" />
            <span>
              {new Date(dueDate).toLocaleDateString('ru-RU')}
            </span>
          </time>
        }
      </div>
    </article>
  );
}