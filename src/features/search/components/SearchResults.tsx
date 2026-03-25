import { Button } from "@ui/index";
import { Project } from "@features/projects";
import { Task } from "@features/tasks";

interface SearchResultsProps {
  foundProjects: Project[];
  foundTasks: Task[];
  activeIndex: number;
  onProjectClick: (projectId: string) => void;
  onTaskClick: (projectId: string, taskId: string) => void;
  projectsMap: {
    [k: string]: Project;
  };
}

export function SearchResults({
  foundProjects,
  foundTasks,
  activeIndex,
  onProjectClick,
  onTaskClick,
  projectsMap,
}: SearchResultsProps) {
  return (
    <div className="search__group" id="search-results">
      {foundProjects.length > 0 && (
        <div
          className="search__group-projects"
          role="group"
          aria-label="Projects"
        >
          <p className="search__group-title">Projects</p>

          {foundProjects.map((project, index) => (
            <Button
              key={project.id}
              id={`search-option-${index}`}
              variant="ghost"
              className={`search__item ${index === activeIndex ? "search__item--active" : ""}`}
              role="option"
              aria-selected={index === activeIndex}
              onClick={() => onProjectClick(project.id)}
            >
              <span className="search__project-title">{project.title}</span>
            </Button>
          ))}
        </div>
      )}

      {foundTasks.length > 0 && (
        <div className="search__group-tasks" role="group" aria-label="Projects">
          <p className="search__group-title">Tasks</p>

          {foundTasks.map((task, index) => {
            const globalIndex = foundProjects.length + index;

            return (
              <Button
                key={task.id}
                id={`search-option-${globalIndex}`}
                variant="ghost"
                className={`search__item ${globalIndex === activeIndex ? "search__item--active" : ""}`}
                role="option"
                aria-selected={globalIndex === activeIndex}
                onClick={() => onTaskClick(task.projectId, task.id)}
              >
                <span className="search__task-title">{task.title}</span>
                <span className="search__task-project">
                  /{projectsMap[task.projectId]?.title}
                </span>
              </Button>
            );
          })}
        </div>
      )}

      {foundProjects.length === 0 && foundTasks.length === 0 && (
        <p className="search__empty" role="status" aria-live="polite">
          Nothing was found for your query.
        </p>
      )}
    </div>
  );
}
