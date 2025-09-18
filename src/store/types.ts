import { Project } from "../features/projects/types";
import { Tag } from "../features/tags/types";
import { Task } from "../features/tasks/types";

export interface StateStore {
  projects: Project[];
  tasks: Task[];
  tags: Tag[];

  loadProjects: () => Promise<void>;
  loadTasks: () => Promise<void>;

  addProject: () => Project;
  updateProjectTitle: (id: string, title: string) => void;
  deleteProject: (id: string) => void;

  addTask: (projectId: string) => Task;
  updateTask: (taskId: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  addTag: (label: string, color: string) => Tag;
  updateTag: (id: string, patch: Partial<Tag>) => void;
  deleteTag: (id: string) => {
    tags: Tag[], 
    tasks: Task[]
  };
};