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

  let formatedDate, isOverdue;
  if (task.dueDate) {
    formatedDate = useMemo(() => formatDueDate(task.dueDate), [task.dueDate]);
    isOverdue = new Date(task.dueDate) < new Date();
  }

  const projectsMap = useMemo(
    () => Object.fromEntries(projects.map((project) => [project.id, project])),
    [projects]
  );

  return (
    <li className="task-item">
      <h3 className="task-item__title">{task.title}</h3>

      <div className="task-item__info">
        <Button
          variant="ghost"
          className="task-item__project"
          onClick={() => {
            navigate(`/project/${task.projectId}`);
          }}
        >
          {projectsMap[task.projectId]?.title}
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
