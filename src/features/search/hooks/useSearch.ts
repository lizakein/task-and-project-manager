import { useState, useMemo, useEffect } from "react";
import { useSearchStore } from "../model/useSearchStore";
import { useProjectsStore, useTasksStore } from "@store/hooks";
import { useDebounce } from "@hooks/useDebounce";
import { searchItems } from "../utils/searchUtils";

export function useSearch() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const { projects } = useProjectsStore();
  const { tasks } = useTasksStore();
  const { query, setQuery, clearQuery } = useSearchStore();

  const debouncedQuery = useDebounce(query, 300);

  const { projects: foundProjects, tasks: foundTasks } = searchItems(
    debouncedQuery,
    projects,
    tasks
  );

  const results = useMemo(
    () => [...foundProjects, ...foundTasks],
    [foundProjects, foundTasks]
  );

  useEffect(() => {
    setActiveIndex(-1);
  }, [debouncedQuery]);


  return {
    query,
    setQuery,
    clearQuery,
    foundProjects,
    foundTasks,
    results,
    activeIndex,
    setActiveIndex
  };
}