import { Project } from "@features/projects";
import { Task } from "@features/tasks";

export function searchItems(query: string, projects: Project[], tasks: Task[]) {
  if (!query.trim()) {
    return { projects: [], tasks: [] };
  }

  const normalized = query.toLowerCase();

  const foundProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(normalized)
  );

  const foundTasks = tasks.filter((task) =>
    task.title?.toLowerCase().includes(normalized)
  );

  return {
    projects: foundProjects,
    tasks: foundTasks
  };
}