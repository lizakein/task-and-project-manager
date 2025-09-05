import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as ProjectUtils from '../utils/projectUtils';
import * as TaskUtils from '../utils/taskUtils';

export const useStore = create(
  persist((set, get) => ({
    projects: [],
    tasks: [],


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
    }
  }),
  {name: "app-storage"}
));