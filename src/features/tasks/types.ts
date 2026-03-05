export const TASK_STATUS = {
  todo: {
    label: "To Do",
    moves: ["done", "in-progress"],
  },
  "in-progress": {
    label: "In Progress",
    moves: ["todo", "done"],
  },
  done: {
    label: "Done",
    moves: ["in-progress", "todo"]
  },
} as const;

export type Priority = "low" | "medium" | "high";
export type Status = keyof typeof TASK_STATUS;

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};