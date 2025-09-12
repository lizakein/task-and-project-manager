import { useDrag } from 'react-dnd';
import { useStore } from '@store/useStore';
import { useContextMenu } from '@hooks/useContextMenu';
import { getTagStyle } from "@utils/tagUtils";
import { TaskOptions } from './TaskOptions';
import MoreIcon from '@assets/icons/actions/more-icon.svg';
import ClockIcon from '@assets/icons/ui/clock-icon.svg';

export function TaskCard({ 
  id, 
  title, 
  description, 
  priority, 
  tags, 
  dueDate, 
  projectId
}) {
  const { openId, menuPosition, handleMoreClick } = useContextMenu();
  const allTags = useStore(state => state.tags);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id, status, projectId},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

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
    <article 
      ref={drag}
      className='task-card'
      style={{ opacity: isDragging ? 0.5 : 1}}
    >
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
          <TaskOptions 
            menuPosition={menuPosition} 
            projectId={projectId} 
            openId={openId}
            title={title}
          />
        )}
      </div>

      <h3 className='task-card__title'>{title}</h3>
      { description && <p className='task-card__description'>{description}</p> }
      

      <div className='task-card__footer'>
        <div className='task-card__tags'>
          {tags.map((tagId) => {
            const tag = allTags.find(t => t.id === tagId);
            if (!tag) return null;
            return (
              <span 
                key={tag.id} 
                className={`tag tag--${tag.color}`} 
                style={getTagStyle(tag.color)}
              >
                {tag.label}
              </span>
            );
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