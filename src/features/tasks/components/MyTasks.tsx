import { TaskItem } from "./TaskItem";
import "./MyTasks.css";

export default function MyTasks() {
  return (
    <section className="my-tasks" aria-labelledby="my-tasks-title">
      <h2 id="my-tasks-title" className="my-tasks__title">
        My tasks
      </h2>

      <ul className="my-tasks__list">
        <TaskItem title="Task 1" project="Project 1" deadline="28.06.25" />
        <TaskItem title="Task 2" project="Project 1" deadline="29.06.25" />
        <TaskItem title="Task 3" project="Project 2" deadline="30.06.25" />
      </ul>
    </section>
  );
}
