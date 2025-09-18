export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};