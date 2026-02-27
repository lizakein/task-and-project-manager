import { Task } from "features/tasks";

export const createTask = (
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  projectId: string
): Task => {
  const task: Task = {
    id: crypto.randomUUID(),
    projectId: projectId,
    title: "New task",
    description: '',
    status: "todo",
    priority: "",
    dueDate: "",
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  setTasks([...tasks, task]);
  return task;
};

export const updateTask = (
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  taskId: string,
  patch: Partial<Task>
) => {
  const updatedTasks = tasks.map(task =>
    task.id === taskId ?
      {
        ...task,
        ...patch,
        updatedAt: new Date().toISOString()
      } :
      task
  );

  setTasks(updatedTasks);
};

export const deleteTask = (
  tasks: Task[],
  setTasks: (tasks: Task[]) => void,
  id: string
) => {
  const updatedTasks = tasks.filter(t => t.id !== id);
  setTasks(updatedTasks);
};