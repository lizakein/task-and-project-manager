export const createTask = (tasks, setTasks, projectId) => {
  const task = {
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
}