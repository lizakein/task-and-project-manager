import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useStore } from '@store/useStore';
import { TaskCard } from './TaskCard';
import AddPurpleIcon from '@assets/icons/actions/add-square-purple-icon.svg';

export default function TaskColumn({ title, status, projectId }) {
  const navigate = useNavigate();
  const addTask = useStore(state => state.addTask);
  const updateTask = useStore(state => state.updateTask);
  const tasks = useStore(state => state.tasks);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        updateTask(item.id, { status })
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const filteredTasks = tasks.filter((task) => task.projectId === projectId && task.status === status);

  const handleAddTask = () => {
    const newTask = addTask(projectId);
    navigate(`/project/${projectId}/${newTask.id}`);
  };

  return (
    <div
      ref={drop}
      className='task-column'
      style={{ background: isOver ? "#5020E520" : "#f9f9f9" }}
      role='list'
      aria-label={`Column ${title}`}
    >
      <header className='task-column__header' data-status={status}>
        <div className='task-column__header-left'>
          <h2 className='task-column__title'>{title}</h2>
          <span className='task-column__count' aria-label='Number of tasks'>{filteredTasks.length}</span>
        </div>
        {
          status === 'todo' &&
          <button 
            className='icon-button' 
            aria-label='Add new task'
            onClick={handleAddTask}
          >
            <img src={AddPurpleIcon} alt="" role="presentation" />
          </button>
        }      
      </header>

      <div className='task-list'>
        {
          filteredTasks.map((task) => {
            return <TaskCard 
                    key={task.id} 
                    {...task} 
                    projectId={projectId}
                    status={status}
                  />
          })
        }
      </div>
    </div>
  );
}