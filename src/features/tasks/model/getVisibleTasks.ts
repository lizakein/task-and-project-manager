import { FilterState, SortState } from "@store/types";
import { Task } from "../types";

export function getVisibleTasks(
  tasks: Task[],
  projectId: string,
  status: Task["status"],
  filters: FilterState,
  sort: SortState
) {
  const filtered = tasks.filter((task) => {
    const matchesProject = task.projectId === projectId;
    const matchesStatus = task.status === status;

    const matchesPriority =
      filters.priorities.length === 0 ||
      filters.priorities.includes(task.priority);

    const matchesTags =
      filters.tags.length === 0 ||
      task.tags?.some((tagId) => filters.tags.includes(tagId));

    return matchesProject && matchesStatus && matchesPriority && matchesTags;
  });

  if (!sort.field) return filtered;

  return [...filtered].sort((a, b) => {
    let valueA;
    let valueB;

    switch (sort.field) {
      case "title":
        valueA = a.title.toLowerCase();
        valueB = b.title.toLowerCase();
        break;

      case "priority": {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        valueA = priorityOrder[a.priority];
        valueB = priorityOrder[b.priority];
        break;
      }

      case "date":
        valueA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        valueB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        break;

      default:
        return 0;
    }

    if (valueA < valueB) return sort.direction === "asc" ? -1 : 1;
    if (valueA > valueB) return sort.direction === "asc" ? 1 : -1;
    return 0;
  });
}