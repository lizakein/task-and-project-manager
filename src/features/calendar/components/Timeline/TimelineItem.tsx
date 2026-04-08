import { Task } from "@features/tasks";
import { formatTimelineTime } from "@utils/date/format";
import { useNavigate } from "react-router-dom";

interface TimelineItemProps {
  task: Task;
}

export function TimelineItem({ task }: TimelineItemProps) {
  const navigate = useNavigate();

  return (
    <li className="timeline__item">
      <time className="timeline__time">
        {formatTimelineTime(task.dueDate).formatted}
      </time>

      <article className="timeline__card">
        <button
          type="button"
          className="timeline__card-button"
          onClick={() =>
            navigate(`/project/${task.projectId}/${task.id}`, {
              state: { from: "/" },
            })
          }
        >
          <h3 className="timeline__title">{task.title}</h3>
          {task.description && (
            <p className="timeline__description">{task.description}</p>
          )}
        </button>
      </article>
    </li>
  );
}
