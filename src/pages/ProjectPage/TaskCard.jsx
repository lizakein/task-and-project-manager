import { useContextMenu } from '../../hooks/useContextMenu';
import { TaskOptions } from '../ProjectPage/TaskOptions';
import MoreIcon from '../../assets/icons/actions/more-icon.svg';
import ClockIcon from '../../assets/icons/ui/clock-icon.svg';


export function TaskCard({ id, title, description, priority, tags, dueDate, projectId }) {
  const { openId, menuPosition, handleMoreClick } = useContextMenu();

  let formatedDate;
  
  if (dueDate.length > 10) {
    const options = {
      hour: "numeric",
      minute: "numeric"
    };
    formatedDate = new Date(dueDate).toLocaleDateString('ru-RU', options);
  } else 
    formatedDate = new Date(dueDate).toLocaleDateString('ru-RU');

  return (
    <article className='task-card'>
      <div className='task-card__header'>
        <p className='priority' aria-label={`Priority: ${priority}`} data-priority={priority}>{priority}</p>
        <button 
          className="icon-button" 
          aria-label={`More options for task ${title}`}
          onClick={(e) => handleMoreClick(e, id)}
        >
          <img src={MoreIcon} alt="" role="presentation" />
        </button>

        {openId === id && menuPosition && (
          <TaskOptions menuPosition={menuPosition} projectId={projectId} openId={openId} />
        )}
      </div>

      <h3 className='task-card__title'>{title}</h3>
      { description && <p className='task-card__description'>{description}</p> }
      

      <div className='task-card__footer'>
        <div className='task-card__tags'>
          {tags.map((tag) => {
            return <span key={crypto.randomUUID()} className='tag tag--blue'>{tag}</span>
          })}
        </div>
        
        {dueDate && 
          <time className='task-card__due' dateTime={formatedDate}>
            <img src={ClockIcon} alt="" role="presentation" />
            <span>
              {formatedDate}
            </span>
          </time>
        }
      </div>
    </article>
  );
}