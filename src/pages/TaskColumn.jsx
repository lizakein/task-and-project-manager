import AddPurpleIcon from '../assets/icons/add-square-purple-icon.svg';
import { TaskCard } from './TaskCard';


export function TaskColumn({ title, count, status }) {
  return (
    <div className='task-column'>
      <header className='task-column__header' data-status={status}>
        <div className='task-column__header-left'>
          <h2 className='task-column__title'>{title}</h2>
          <span className='task-column__count' aria-label='Number of tasks'>{count}</span>
        </div>
        {
          status === 'to-do' &&
          <button className='icon-button' aria-label='Add new task'>
            <img src={AddPurpleIcon} alt="" role="presentation" />
          </button>
        }      
      </header>

      <TaskCard />
    </div>
  );
}