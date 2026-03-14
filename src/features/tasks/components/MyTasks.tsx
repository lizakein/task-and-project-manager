import { useMemo } from "react";
import { useTasksStore, useProjectsStore } from "@store/hooks";
import { TaskItem } from "./TaskItem";
import "./MyTasks.css";

export default function MyTasks() {
  const { tasks } = useTasksStore();
  const { projects } = useProjectsStore();

  const filteredTasks = tasks.filter((task) => task.status !== "done");

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const valueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const valueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

    return valueA < valueB ? -1 : 1;
  });

  const projectsMap = useMemo(
    () => Object.fromEntries(projects.map((project) => [project.id, project])),
    [projects]
  );

  return (
    <section className="my-tasks" aria-labelledby="my-tasks-title">
      <h2 id="my-tasks-title" className="my-tasks__title">
        My tasks
      </h2>

      <ul className="my-tasks__list">
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} projectsMap={projectsMap} />
        ))}
      </ul>
    </section>
  );
}
