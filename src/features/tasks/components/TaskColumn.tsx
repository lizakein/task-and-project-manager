import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useStore } from '@store/useStore';
import { TaskCard } from './TaskCard';
import { DragItem } from 'types/dnd';
import AddPurpleIcon from '@assets/icons/actions/add-square-purple-icon.svg';

interface TaskColumnProps {
  title: string;
  status: "todo" | "in-progress" | "done";
  projectId: string;
}

export default function TaskColumn({ title, status, projectId }: TaskColumnProps) {
  const navigate = useNavigate();
  const addTask = useStore(state => state.addTask);
  const updateTask = useStore(state => state.updateTask);
  const tasks = useStore(state => state.tasks);

  const [ liveMessage, setLiveMessage ] = useState("");

  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: "TASK",
    drop: (item) => {
      if (item.status !== status) {
        updateTask(item.id, { status });
        setLiveMessage(`Task moved to ${title} column`);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const divRef = useRef<HTMLDivElement | null>(null);
  drop(divRef);

  const filteredTasks = tasks.filter((task) => task.projectId === projectId && task.status === status);

  const handleAddTask = () => {
    const newTask = addTask(projectId);
    navigate(`/project/${projectId}/${newTask.id}`);
  };

  return (
    <section
      ref={divRef}
      className='task-column'
      style={{ background: isOver ? "#5020E520" : "#f9f9f9" }}
      role='list'
      aria-labelledby={`column-title-${status}`}
    >
      <header className='task-column__header' data-status={status}>
        <div className='task-column__header-left'>
          <h2 
            id={`column-title-${status}`} 
            className='task-column__title'
          >
            {title}
          </h2>
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

      <div
        aria-live='polite'
        aria-atomic="true"
        className="sr-only"
      >
        {liveMessage}
      </div>
    </section>
  );
}