import { Project } from "../features/projects/types";
import { Tag } from "../features/tags/types";
import { Task } from "../features/tasks/types";

export type SortField = "title" | "priority" | "date";
export type SortDirection = "asc" | "desc";

export interface FilterState {
  priorities: string[];
  tags: string[];
}

export interface SortState {
  field: SortField | null;
  direction: SortDirection;
}

export interface StateStore {
  projects: Project[];
  tasks: Task[];
  tags: Tag[];

  filters: FilterState;
  sort: SortState;

  loadProjects: () => Promise<void>;
  loadTasks: () => Promise<void>;

  addProject: (project: Project) => void;
  updateProjectTitle: (id: string, title: string) => void;
  deleteProject: (id: string) => void;

  addTask: (task: Task) => void;
  updateTask: (taskId: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  addTag: (label: string, color: string) => void;
  updateTag: (id: string, patch: Partial<Tag>) => void;
  deleteTag: (id: string) => void;

  setFilters: (filters: Partial<StateStore["filters"]>) => void;
  clearFilters: () => void;

  setSort: (sort: Partial<SortState>) => void;
  clearSort: () => void;
};