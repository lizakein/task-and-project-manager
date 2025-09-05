import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../components/Header";
import { Sidepanel } from "../../components/Sidepanel";
import { TaskForm } from "./components/TaskForm";
import './EditTaskPage.css';
import { useStore } from "../../store/useStore";

export function EditTaskPage() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const updateTask = useStore(state => state.updateTask);
  const task = useStore(state => state.tasks.find(t => t.id === taskId));

  const [ title, setTitle ] = useState(task.title);
  const [ description, setDescription ] = useState(task.description);
  const [ priority, setPriority ] = useState(task.priority);
  const [ tags, setTags ] = useState(task.tags || []);
  const [ dueDate, setDueDate ] = useState(task.dueDate);
  
  const handleSave = (event) => {
    event.preventDefault();
    const patch = { title, description, priority, tags, dueDate };
    updateTask(taskId, patch);
    navigate(`/project/${projectId}`);
  }

  const handleCancel = () => {
    navigate(`/project/${projectId}`);
  }

  return (
    <main className='edit-task--page page'>
      <Header />
      <Sidepanel 
        projectId={projectId} 
      />

      <div className='content edit-task-page__content'>
        <TaskForm
          title={title} setTitle={setTitle}
          description={description} setDescription={setDescription}
          priority={priority} setPriority={setPriority}
          tags={tags} setTags={setTags}
          dueDate={dueDate} setDueDate={setDueDate}
          handleSave={handleSave} handleCancel={handleCancel}
        />
      </div>
    </main>
  );
}