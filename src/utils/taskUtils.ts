import { Task } from "features/tasks";

export const createTask = (
  tasks: Task[],
  projectId: string
): Task[] => {
  const now = new Date().toISOString();

  const task: Task = {
    id: crypto.randomUUID(),
    projectId: projectId,
    title: "New task",
    description: '',
    status: "todo",
    priority: "low",
    dueDate: "",
    tags: [],
    createdAt: now,
    updatedAt: now
  };

  return [...tasks, task];
};

export const updateTask = (
  tasks: Task[],
  taskId: string,
  patch: Partial<Task>
): Task[] => {
  return tasks.map(task =>
    task.id === taskId ?
      {
        ...task,
        ...patch,
        updatedAt: new Date().toISOString()
      } :
      task
  );
};

export const deleteTask = (
  tasks: Task[],
  id: string
): Task[] => {
  return tasks.filter(t => t.id !== id);
};