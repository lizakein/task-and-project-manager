export interface DragItem {
  id: string;
  status: "todo" | "in-progress" | "done";
  projectId: string;
  type: "TASK";
};