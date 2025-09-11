import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Sidepanel } from "../../components/Sidepanel";
import { TaskForm } from "./components/TaskForm";
import { ConfirmModal } from "../../components/ConfirmModal";
import { useStore } from "../../store/useStore";
import './EditTaskPage.css';

export function EditTaskPage() {
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  const updateTask = useStore(state => state.updateTask);
  const task = useStore(state => state.tasks.find(t => t.id === taskId));
  const allTags = useStore(state => state.tags);

  const [ title, setTitle ] = useState(task.title);
  const [ description, setDescription ] = useState(task.description);
  const [ priority, setPriority ] = useState(task.priority);
  const [ tags, setTags ] = useState(task.tags || []);
  const [ dueDate, setDueDate ] = useState(task.dueDate);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  useEffect(() => {
    setTags(task.tags || []);
  }, [task.tags]);
  
  const handleSave = (event) => {
    event.preventDefault();
    const validTags = tags.filter(id => allTags.some(tag => tag.id === id));
    const patch = { title, description, priority, tags: validTags, dueDate };
    updateTask(taskId, patch);
    navigate(`/project/${projectId}`);
  }

  const handleConfirmLeave = () => {
    navigate(`/project/${projectId}`);
  }

  const handleCancel = () => {
    setIsModalOpen(true);
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

      <ConfirmModal 
        isOpen={isModalOpen}
        title="Stop editing"
        message="Are you sure you want to stop editing? The changes will be lost."
        onConfirm={handleConfirmLeave}
        onCancel={() => setIsModalOpen(false)}
      />
    </main>
  );
}