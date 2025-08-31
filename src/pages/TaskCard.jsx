import MoreIcon from '../assets/icons/more-icon.svg';
import ClockIcon from '../assets/icons/clock-icon.svg';

export function TaskCard() {
  return (
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
  );
}