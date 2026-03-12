import { Icon } from "@ui/index";
import ClockIcon from "@assets/icons/ui/clock-icon.svg";

interface TaskItemProps {
  title: string;
  project: string;
  deadline: string;
}

export function TaskItem({ title, project, deadline }: TaskItemProps) {
  return (
    <li className="task-item">
      <h3 className="task-item__title">{title}</h3>
      <p className="task-item__project">{project}</p>

      <time className="task-item__deadline">
        <Icon src={ClockIcon} />

        <span className="task-item__date">{deadline}</span>
      </time>
    </li>
  );
}
