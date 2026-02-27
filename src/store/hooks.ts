import { shallow } from "zustand/shallow";
import { useStore } from "./useStore";

export const useTasksStore = () =>
  useStore(
    (state) => ({
      tasks: state.tasks,
      addTask: state.addTask,
      updateTask: state.updateTask,
      deleteTask: state.deleteTask
    }),
    shallow
  );

export const useProjectsStore = () =>
  useStore(
    (state) => ({
      projects: state.projects,
      addProject: state.addProject,
      updateProjectTitle: state.updateProjectTitle,
      deleteProject: state.deleteProject
    }),
    shallow
  );

export const useTagStore = () =>
  useStore(
    (state) => ({
      tags: state.tags,
      addTag: state.addTag,
      updateTag: state.updateTag,
      deleteTag: state.deleteTag
    }),
    shallow
  );

export const useFiltersStore = () =>
  useStore(
    (state) => ({
      filters: state.filters,
      setFilters: state.setFilters,
      clearFilters: state.clearFilters
    }),
    shallow
  );

export const useSortStore = () =>
  useStore(
    (state) => ({
      sort: state.sort,
      setSort: state.setSort,
      clearSort: state.clearSort
    }),
    shallow
  );
