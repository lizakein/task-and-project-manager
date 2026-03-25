import { Project } from "@features/projects";
import { Task } from "@features/tasks";

export function useSearchKeyboard(
  results: (Project | Task)[],
  foundProjects: Project[],
  foundTasks: Task[],
  activeIndex: number,
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
  onProjectClick: (projectId: string) => void,
  onTaskClick: (projectId: string, taskId: string) => void,
  clearQuery: () => void
) {
  return (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    }

    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();

      if (activeIndex < foundProjects.length) {
        const project = foundProjects[activeIndex];
        onProjectClick(project.id);
      } else {
        const task = foundTasks[activeIndex - foundProjects.length];
        onTaskClick(task.projectId, task.id);
      }
    }

    if (e.key === "Escape") {
      clearQuery();
    }
  };
}