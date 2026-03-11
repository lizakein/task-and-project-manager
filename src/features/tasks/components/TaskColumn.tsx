import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "./TaskCard";
import AddPurpleIcon from "@assets/icons/actions/add-square-purple-icon.svg";
import { useFiltersStore, useSortStore, useTasksStore } from "@store/hooks";
import { Icon, IconButton } from "@ui/index";
import { createTask } from "@utils/taskUtils";
import { getVisibleTasks } from "../model/getVisibleTasks";
import { useTaskDrop } from "../hooks/useTaskDrop";
import { Status } from "../types";

interface TaskColumnProps {
  title: string;
  status: Status;
  projectId: string;
}

export default function TaskColumn({
  title,
  status,
  projectId,
}: TaskColumnProps) {
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasksStore();
  const { filters } = useFiltersStore();
  const { sort } = useSortStore();

  const [liveMessage, setLiveMessage] = useState("");

  const [{ isOver }, drop] = useTaskDrop(
    status,
    title,
    updateTask,
    setLiveMessage
  );

  const divRef = useRef<HTMLDivElement | null>(null);
  drop(divRef);

  const visibleTasks = useMemo(() => {
    return getVisibleTasks(tasks, projectId, status, filters, sort);
  }, [tasks, filters, sort, projectId, status]);

  const handleAddTask = () => {
    const newTask = createTask(projectId);
    addTask(newTask);
    navigate(`/project/${projectId}/${newTask.id}`);
  };

  return (
    <section
      ref={divRef}
      className="task-column"
      style={{ background: isOver ? "#5020E520" : "#f9f9f9" }}
      role="list"
      aria-labelledby={`column-title-${status}`}
    >
      <header className="task-column__header" data-status={status}>
        <div className="task-column__header-left">
          <h2 id={`column-title-${status}`} className="task-column__title">
            {title}
          </h2>
          <span className="task-column__count" aria-label="Number of tasks">
            {visibleTasks.length}
          </span>
        </div>
        {status === "todo" && (
          <IconButton
            ariaLabel="Add new task"
            onClick={handleAddTask}
            icon={<Icon src={AddPurpleIcon} />}
          />
        )}
      </header>

      <div className="task-list">
        {visibleTasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              {...task}
              projectId={projectId}
              status={status}
            />
          );
        })}
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>
    </section>
  );
}
