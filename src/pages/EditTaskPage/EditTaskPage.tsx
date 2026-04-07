import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TaskForm } from "./components/TaskForm";
import { ConfirmModal } from "@ui/ConfirmModal/ConfirmModal";
import type { Task, Status } from "@features/tasks";
import "./EditTaskPage.css";
import { Layout } from "@layout/Layout/Layout";
import { useTagStore, useTasksStore } from "@store/hooks";

type PriorityValue = Task["priority"] | "";

export function EditTaskPage() {
  const { projectId, taskId } = useParams<{
    projectId: string;
    taskId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const { tasks, updateTask } = useTasksStore();
  const task = tasks.find((t) => t.id === taskId);
  const { tags: allTags } = useTagStore();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<PriorityValue>(task?.priority || "");
  const [tags, setTags] = useState(task?.tags || []);

  const [dueDate, setDueDate] = useState(task?.dueDate?.split("T")[0] || "");
  const [dueTime, setDueTime] = useState(task?.dueDate?.split("T")[1] || "");
  const [hasTime, setHasTime] = useState(!!task?.dueDate?.includes("T"));

  const [status, setStatus] = useState<Status>(task?.status || "todo");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!task) return;

    const [date = "", time = ""] = task.dueDate ? task.dueDate.split("T") : [];
    setDueDate(date);
    setDueTime(time);
    setHasTime(!!time);

    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setPriority(task?.priority || "");
    setTags(task?.tags || []);
    setStatus(task?.status || "todo");
  }, [taskId]);

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!taskId || !projectId) return;

    const validTags = tags.filter((id) => allTags.some((tag) => tag.id === id));
    const normalizedDueDate = dueDate
      ? hasTime && dueTime
        ? `${dueDate}T${dueTime}`
        : dueDate
      : "";

    const patch: Partial<Task> = {
      title: title.trim() || "Untitled Task",
      description,
      tags: validTags,
      dueDate: normalizedDueDate,
      ...(priority ? { priority } : {}),
      status,
    };
    updateTask(taskId, patch);
    navigate(from || `/project/${projectId}`);
  };

  const handleConfirmLeave = () => {
    navigate(from || `/project/${projectId}`);
  };

  const handleCancel = () => {
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="edit-task-page__content">
        <TaskForm
          title={{ value: title, setValue: setTitle }}
          description={{ value: description, setValue: setDescription }}
          priority={{ value: priority, setValue: setPriority }}
          tags={{ value: tags, setValue: setTags }}
          dueDate={{ value: dueDate, setValue: setDueDate }}
          dueTime={{ value: dueTime, setValue: setDueTime }}
          hasTime={{ value: hasTime, setValue: setHasTime }}
          status={{ value: status, setValue: setStatus }}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Stop editing"
        message="Are you sure you want to stop editing? The changes will be lost."
        onConfirm={handleConfirmLeave}
        onCancel={() => setIsModalOpen(false)}
      />
    </Layout>
  );
}
