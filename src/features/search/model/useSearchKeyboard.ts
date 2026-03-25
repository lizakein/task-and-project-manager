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

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
        break;

      case "Enter":
        if (activeIndex < 0) return;

        e.preventDefault();

        if (activeIndex < foundProjects.length) {
          const project = foundProjects[activeIndex];
          onProjectClick(project.id);
        } else {
          const task = foundTasks[activeIndex - foundProjects.length];
          onTaskClick(task.projectId, task.id);
        }
        break;

      case "Escape":
        clearQuery();
        break;
    }
  };
}