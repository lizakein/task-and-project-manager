import { Task } from "../types";
import { isToday, isThisWeek, isThisMonth } from "@utils/date/dateFilters";

export function getTasksStats(tasks: Task[]) {
  return tasks.reduce(
    (acc, task) => {
      const date = new Date(task.dueDate);

      if (isToday(date)) {
        acc.today.total++;
        if (task.status === "done") acc.today.completed++;
      }

      if (isThisWeek(date)) {
        acc.week.total++;
        if (task.status === "done") acc.week.completed++;
      }

      if (isThisMonth(date)) {
        acc.month.total++;
        if (task.status === "done") acc.month.completed++;
      }

      return acc;
    },
    {
      today: { total: 0, completed: 0 },
      week: { total: 0, completed: 0 },
      month: { total: 0, completed: 0 },
    }
  );
}