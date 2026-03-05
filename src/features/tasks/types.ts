export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in-progress" | "done";

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