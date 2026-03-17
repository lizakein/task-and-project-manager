import { Status, TASK_STATUS } from "@features/tasks";

export function getAvailableMoves(status: Status) {
  return TASK_STATUS[status].moves.map((target) => ({
    status: target,
    label: TASK_STATUS[target].label
  }))
}