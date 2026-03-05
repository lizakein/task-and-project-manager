import { Status, Task } from "../types";

export function MoveTaskWithKeyboard(
  event: React.KeyboardEvent<HTMLElement>,
  status: Status,
  id: string,
  updateTask: (taskId: string, patch: Partial<Task>) => void
) {
  if (event.key === "ArrowRight") {
    event.preventDefault();

    if (status === "todo") updateTask(id, { status: "in-progress" });
    else if (status === "in-progress") updateTask(id, { status: "done" });
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    if (status === "done") updateTask(id, { status: "in-progress" });
    else if (status === "in-progress") updateTask(id, { status: "todo" });
  }
}