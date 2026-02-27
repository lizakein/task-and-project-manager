import axios from 'axios';
import { StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import * as ProjectUtils from '../utils/projectUtils';
import * as TaskUtils from '../utils/taskUtils';

import { StateStore } from './types';
import type { Project } from '../features/projects';
import type { Task } from '../features/tasks';
import type { Tag } from '../features/tags';
import type { Priority } from '@features/tasks/types';

const storeCreator: StateCreator<StateStore> = (set, get) => ({
  projects: [] as Project[],
  tasks: [] as Task[],
  tags: [
    { id: "1", label: "Life", color: "blue" },
    { id: "2", label: "Work", color: "red" },
    { id: "3", label: "Sport", color: "green" }
  ] as Tag[],
  filters: {
    priorities: [] as Priority[],
    tags: [] as string[]
  },
  sort: {
    field: null,
    direction: "asc"
  },


  // ========== LOAD ==========

  loadProjects: async () => {
    if (!get().projects.length) {
      const response = await axios.get<Project[]>('/src/data/projects.json');
      set({ projects: response.data });
    }
  },

  loadTasks: async () => {
    if (!get().tasks.length) {
      const response = await axios.get<Task[]>('/src/data/tasks.json');
      set({ tasks: response.data });
    }
  },


  // ========== PROJECT ==========

  addProject: () => {
    const project = ProjectUtils.createProject(
      get().projects,
      (projects: Project[]) => set({ projects })
    );
    return project;
  },

  updateProjectTitle: (id, title) => {
    ProjectUtils.updateProjectTitle(
      get().projects,
      (projects: Project[]) => set({ projects }),
      id,
      title
    );
  },

  deleteProject: (id) => {
    ProjectUtils.deleteProject(
      get().projects,
      (projects: Project[]) => set({ projects }),
      id
    );

    set({ tasks: get().tasks.filter(t => t.projectId !== id) });
  },


  // ========== TASK ==========

  addTask: (projectId) => {
    const task = TaskUtils.createTask(
      get().tasks,
      (tasks: Task[]) => set({ tasks }),
      projectId
    );
    return task;
  },

  updateTask: (taskId, patch) => {
    TaskUtils.updateTask(
      get().tasks,
      (tasks: Task[]) => set({ tasks }),
      taskId,
      patch
    );
  },

  deleteTask: (id) => {
    TaskUtils.deleteTask(
      get().tasks,
      (tasks: Task[]) => set({ tasks }),
      id
    );
  },


  // ========== TAGS ==========

  addTag: (label, color) => {
    const newTag = {
      id: crypto.randomUUID(),
      label,
      color
    };
    set({ tags: [...get().tags, newTag] });

    return newTag;
  },

  updateTag: (id, patch) => {
    set({
      tags: get().tags.map(tag => tag.id === id ? { ...tag, ...patch } : tag)
    });
  },

  deleteTag: (id) => {
    const newTags = get().tags.filter(tag => tag.id !== id);

    const newTasks = get().tasks.map(task => ({
      ...task,
      tags: (task.tags || []).filter(tagId => tagId !== id && tagId != null)
    }));

    set({ tags: newTags, tasks: newTasks });

    return { tags: newTags, tasks: newTasks };
  },


  // ========== FILTERS ==========

  setFilters: (newFilters) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...newFilters
      }
    }));
  },

  clearFilters: () => {
    set({
      filters: {
        priorities: [],
        tags: []
      }
    });
  },

  // ========== SORT ==========
  setSort: (newSort) => {
    set(state => ({
      sort: {
        ...state.sort,
        ...newSort
      }
    }));
  },

  clearSort: () => {
    set({
      sort: {
        field: null,
        direction: "asc"
      }
    });
  }
});

export const useStore = createWithEqualityFn<StateStore>()(
  persist(storeCreator, { name: "app-storage" })
);