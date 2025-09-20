import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "@layout/Header/Header";
import { Sidepanel } from "@layout/Sidepanel/Sidepanel";
import { TaskForm } from "./components/TaskForm";
import { ConfirmModal } from "@ui/ConfirmModal/ConfirmModal";
import { useStore } from "@store/useStore";
import type { Task } from "@features/tasks";
import './EditTaskPage.css';

interface EditTaskPageProps {
  projectId: string;
  taskId: string;
}

export function EditTaskPage() {
  const { projectId, taskId } = useParams<{ projectId: string; taskId: string }>();
  const navigate = useNavigate();

  const updateTask = useStore(state => state.updateTask);
  const task = useStore(state => state.tasks.find(t => t.id === taskId));
  const allTags = useStore(state => state.tags);

  const [ title, setTitle ] = useState(task?.title || '');
  const [ description, setDescription ] = useState(task?.description || '');
  const [ priority, setPriority ] = useState(task?.priority || '');
  const [ tags, setTags ] = useState(task?.tags || []);
  const [ dueDate, setDueDate ] = useState(task?.dueDate || '');
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  useEffect(() => {
    setTags(task?.tags || []);
  }, [task?.tags]);
  
  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!taskId || !projectId) return;
    
    const validTags = tags.filter(id => allTags.some(tag => tag.id === id));
    const patch: Partial<Task> = { title, description, priority, tags: validTags, dueDate };
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
      <Sidepanel projectId={projectId || ''} />

      <div className='content edit-task-page__content'>
        <TaskForm
          title={{ value: title, setValue: setTitle }}
          description={{ value: description, setValue: setDescription }}
          priority={{ value: priority, setValue: setPriority }}
          tags={{ value: tags, setValue: setTags }}
          dueDate={{ value: dueDate, setValue: setDueDate }}
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