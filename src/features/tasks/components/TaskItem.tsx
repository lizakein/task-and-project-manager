import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { formatDueDate } from "@utils/formatDueDate";
import { useProjectsStore } from "@store/hooks";
import { Button, Icon } from "@ui/index";
import ClockIcon from "@assets/icons/ui/clock-icon.svg";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const navigate = useNavigate();
  const { projects } = useProjectsStore();

  const formatedDate = useMemo(
    () => (task.dueDate ? formatDueDate(task.dueDate) : null),
    [task.dueDate]
  );

  const isOverdue = task.dueDate ? new Date(task.dueDate) < new Date() : false;

  const projectsMap = useMemo(
    () => Object.fromEntries(projects.map((project) => [project.id, project])),
    [projects]
  );
  const projectTitle = projectsMap[task.projectId]?.title;

  return (
    <li className="task-item">
      <h3 className="task-item__title">
        <Button
          variant="ghost"
          className="task-item__title-button"
          onClick={() => {
            navigate(`/project/${task.projectId}/${task.id}`);
          }}
          aria-label={`Go to edit ${task.title} page`}
        >
          {task.title}
        </Button>
      </h3>

      <div className="task-item__info">
        <Button
          variant="ghost"
          className="task-item__project"
          onClick={() => {
            navigate(`/project/${task.projectId}`);
          }}
          aria-label={`Go to ${projectTitle} project page`}
        >
          {projectTitle}
        </Button>

        {formatedDate && (
          <time className="task-item__deadline" dateTime={formatedDate.isoDate}>
            <Icon src={ClockIcon} />

            <span
              className={`task-item__date ${isOverdue ? "task-item__date--overdue" : ""}`}
            >
              {formatedDate.formatted}
            </span>
          </time>
        )}
      </div>
    </li>
  );
}
