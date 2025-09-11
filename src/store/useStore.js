import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as ProjectUtils from '../utils/projectUtils';
import * as TaskUtils from '../utils/taskUtils';

export const useStore = create(
  persist((set, get) => ({
    projects: [],
    tasks: [],
    tags: [
      { id: "1", label: "Life", color: "blue" },
      { id: "2", label: "Work", color: "red" },
      { id: "3", label: "Sport", color: "green" }
    ],


    // ========== LOAD ==========

    loadProjects: async () => {
      if (!get().projects.length) {
        const response = await axios.get('/src/data/projects.json');
        set({ projects: response.data });
      }
    },

    loadTasks: async () => {
      if (!get().tasks.length) {
        const response = await axios.get('/src/data/tasks.json');
        set({ tasks: response.data });
      }
    },


    // ========== PROJECT ==========

    addProject: () => {
      const project = ProjectUtils.createProject(
        get().projects, 
        projects => set({ projects })
      );
      return project;
    },

    updateProjectTitle: (id, title) => {
      ProjectUtils.updateProjectTitle(
        get().projects,
        projects => set({ projects }),
        id,
        title
      );
    },

    deleteProject: (id) => {
      ProjectUtils.deleteProject(
        get().projects, 
        projects => set({ projects }), 
        id
      );

      set({ tasks: get().tasks.filter(t => t.projectId !== id) });
    },


    // ========== TASK ==========

    addTask: (projectId) => {
      const task = TaskUtils.createTask(
        get().tasks, 
        tasks => set({ tasks }), 
        projectId
      );
      return task;
    },

    updateTask: (taskId, patch) => {
      TaskUtils.updateTask(
        get().tasks, 
        tasks => set({ tasks }), 
        taskId, 
        patch
      );
    },

    deleteTask: (id) => {
      TaskUtils.deleteTask(
        get().tasks, 
        tasks => set({ tasks }), 
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
      set({ tags: [...get().tags, newTag]});

      return newTag;
    },

    updateTag: (id, patch) => {
      set({
        tags: get().tags.map(tag => tag.id === id ? {...tag, ...patch} : tag)
      });
    },

    deleteTag: (id) => set((state) => {
      const newTags = state.tags.filter(tag => tag.id !== id);

      const newTasks = state.tasks.map(task => ({
        ...task,
        tags: (task.tags || []).filter(tagId => tagId !== id && tagId != null)
      }));

      return {
        tags: newTags,
        tasks: newTasks
      };
    }),

  }),
  {name: "app-storage"}
));