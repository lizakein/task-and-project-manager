import { useDrop } from "react-dnd";
import { DragItem } from "types/dnd";
import { Status, Task } from "../types";

export function useTaskDrop(
  status: Status,
  title: string,
  updateTask: (taskId: string, patch: Partial<Task>) => void,
  setLiveMessage: (value: string) => void
) {
  return useDrop<DragItem, void, { isOver: boolean }>(
    () => ({
      accept: "TASK",
      drop: (item) => {
        if (item.status !== status) {
          updateTask(item.id, { status });
          setLiveMessage(`Task moved to ${title} column`);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    })
  );
}