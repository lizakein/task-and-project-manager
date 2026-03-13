import { useTasksStore } from "@store/hooks";
import { TaskItem } from "./TaskItem";
import "./MyTasks.css";

export default function MyTasks() {
  const { tasks } = useTasksStore();

  const filteredTasks = tasks.filter((task) => task.status !== "done");

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const valueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const valueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

    return valueA < valueB ? -1 : 1;
  });

  return (
    <section className="my-tasks" aria-labelledby="my-tasks-title">
      <h2 id="my-tasks-title" className="my-tasks__title">
        My tasks
      </h2>

      <ul className="my-tasks__list">
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}
