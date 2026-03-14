import { useMemo, useRef, useState } from "react";
import { useTasksPerPage } from "@features/tasks/hooks/useTasksPerPage";
import { getPaginationPages } from "@utils/getPaginationPages";
import { useTasksStore, useProjectsStore } from "@store/hooks";
import { TaskItem } from "./TaskItem";
import "./MyTasks.css";

export default function MyTasks() {
  const [page, setPage] = useState(1);

  const { tasks } = useTasksStore();
  const { projects } = useProjectsStore();

  const projectsMap = useMemo(
    () => Object.fromEntries(projects.map((project) => [project.id, project])),
    [projects]
  );

  const containerRef = useRef<HTMLUListElement>(null);
  const tasksPerPage = useTasksPerPage(containerRef);

  const sortedTasks = useMemo(() => {
    return tasks
      .filter((task) => task.status !== "done")
      .sort((a, b) => {
        const valueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const valueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

        return valueA - valueB;
      });
  }, [tasks]);

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  const visibleTasks = useMemo(() => {
    const start = (page - 1) * tasksPerPage;
    const end = start + tasksPerPage;

    return sortedTasks.slice(start, end);
  }, [sortedTasks, page, tasksPerPage]);

  const pages = useMemo(
    () => getPaginationPages(page, totalPages),
    [page, totalPages]
  );

  return (
    <section className="my-tasks" aria-labelledby="my-tasks-title">
      <h2 id="my-tasks-title" className="my-tasks__title">
        My tasks
      </h2>

      <ul ref={containerRef} className="my-tasks__list">
        {visibleTasks.map((task) => (
          <TaskItem key={task.id} task={task} projectsMap={projectsMap} />
        ))}
      </ul>

      {totalPages > 1 && (
        <nav className="my-tasks__pagination" aria-label="Tasks pagination">
          <ul className="pagination">
            {pages.map((p, index) => {
              if (p === "...") {
                return (
                  <li key={index} className="pagination__ellipsis">
                    ...
                  </li>
                );
              }

              return (
                <li key={p}>
                  <button
                    className={`pagination__button ${p === page ? "pagination__button--active" : ""}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </section>
  );
}
