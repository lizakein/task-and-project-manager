import { useEffect } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import AddPurpleIcon from '../../assets/icons/actions/add-square-purple-icon.svg';
import { TaskCard } from './TaskCard';


export function TaskColumn({ title, status, projectId }) {
  const [ tasks, setTasks ] = useLocalStorage("tasks", []);

  useEffect(() => {
    if (!tasks.length) {
      const fetchTasksData = async () => {
        const response = await axios.get('/src/data/tasks.json');
        setTasks(response.data);
      };

      fetchTasksData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredTasks = tasks.filter((task) => task.projectId === projectId && task.status === status);

  return (
    <div className='task-column'>
      <header className='task-column__header' data-status={status}>
        <div className='task-column__header-left'>
          <h2 className='task-column__title'>{title}</h2>
          <span className='task-column__count' aria-label='Number of tasks'>{filteredTasks.length}</span>
        </div>
        {
          status === 'todo' &&
          <button className='icon-button' aria-label='Add new task'>
            <img src={AddPurpleIcon} alt="" role="presentation" />
          </button>
        }      
      </header>

      <div className='task-list'>
        {
          filteredTasks.map((task) => {
            return <TaskCard key={task.id} {...task} />
          })
        }
      </div>
    </div>
  );
}