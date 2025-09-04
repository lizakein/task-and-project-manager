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
};

export const updateTask = (tasks, setTasks, taskId, patch) => {
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
}