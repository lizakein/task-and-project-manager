import { Task } from "@features/tasks/types";
import { TimelineItem } from "./TimelineItem";
import { formatTime } from "@utils/date/format";

interface TimelineProps {
  tasks: Task[];
}

export function Timeline({ tasks }: TimelineProps) {
  if (!tasks.length) {
    return <p className="timeline__empty">No tasks for this day</p>;
  }
  return (
    <ul className="timeline">
      {tasks.map((task) => (
        <TimelineItem
          key={task.id}
          time={formatTime(task.dueDate)}
          title={task.title}
          description={task.description}
        />
      ))}
    </ul>
  );
}
