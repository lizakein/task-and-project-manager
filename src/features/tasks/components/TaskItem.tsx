import { useMemo } from "react";
import { formatDueDate } from "@utils/formatDueDate";
import { useProjectsStore } from "@store/hooks";
import { Icon } from "@ui/index";
import ClockIcon from "@assets/icons/ui/clock-icon.svg";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const { projects } = useProjectsStore();

  const projectsMap = useMemo(
    () => Object.fromEntries(projects.map((project) => [project.id, project])),
    [projects]
  );

  return (
    <li className="task-item">
      <h3 className="task-item__title">{task.title}</h3>

      <div className="task-item__info">
        <p className="task-item__project">
          {projectsMap[task.projectId]?.title}
        </p>

        <time className="task-item__deadline">
          <Icon src={ClockIcon} />

              {task.dueDate}
        </time>
      </div>
    </li>
  );
}
