import { getAvailableMoves } from "@utils/getAvailableMoves";
import { Status, Task } from "../types";

export function MoveTaskWithKeyboard(
  event: React.KeyboardEvent<HTMLElement>,
  status: Status,
  id: string,
  updateTask: (taskId: string, patch: Partial<Task>) => void
) {
  const moves = getAvailableMoves(status);

  if (event.key === "ArrowRight") {
    event.preventDefault();

    updateTask(id, { status: moves[1].status });
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    updateTask(id, { status: moves[0].status });
  }
}