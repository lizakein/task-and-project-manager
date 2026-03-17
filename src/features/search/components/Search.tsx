import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon, IconButton, OptionsWindow } from "@ui/index";
import SearchIcon from "@assets/icons/ui/search-icon.svg";
import { useSearchStore } from "../model/useSearchStore";
import { useDebounce } from "@hooks/useDebounce";
import type { MenuPosition } from "@hooks/useContextMenu";
import { useMobile } from "@hooks/useMobile";
import { useProjectsStore, useTasksStore } from "@store/hooks";
import { searchItems } from "../utils/searchUtils";
import { getSearchPosition } from "../utils/getSearchPosition";
import "./Search.css";

export function Search() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const isMobile = useMobile(720); // Размер в media query

  const { projects } = useProjectsStore();
  const { tasks } = useTasksStore();
  const { query, setQuery, clearQuery } = useSearchStore();

  const projectsMap = useMemo(
    () => Object.fromEntries(projects.map((project) => [project.id, project])),
    [projects]
  );

  const debouncedQuery = useDebounce(query, 300);
  const { projects: foundProjects, tasks: foundTasks } = searchItems(
    debouncedQuery,
    projects,
    tasks
  );

  useEffect(() => {
    if (!inputRef.current) return;

    const rect = inputRef.current.getBoundingClientRect();
    setMenuPosition(getSearchPosition(rect));
  }, [query]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
    clearQuery();
  };

  const handleTaskClick = (projectId: string, taskId: string) => {
    navigate(`/project/${projectId}/${taskId}`);
    clearQuery();
  };

  return (
    <form
      className={`search ${isSearchOpen ? "search--open" : ""}`}
      role="search"
      aria-label="Site search"
      onSubmit={(e) => e.preventDefault()}
    >
      {isMobile ? (
        <IconButton
          className="search__toggle"
          ariaLabel={isSearchOpen ? "Close search" : "Open search"}
          onClick={() => setIsSearchOpen((prev) => !prev)}
          icon={<Icon src={SearchIcon} className="search__icon" />}
        />
      ) : (
        <Icon src={SearchIcon} className="search__toggle" />
      )}

      <input
        ref={inputRef}
        id="search"
        name="search"
        type="search"
        className="search__input"
        placeholder="Search for anything..."
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && menuPosition && (
        <OptionsWindow
          triggerRef={inputRef}
          position={menuPosition}
          onClose={() => clearQuery()}
          disableAutoFocus
          shouldReturnFocus={false}
        >
          {foundProjects.length > 0 && (
            <>
              <p className="search__group-title">Projects</p>

              {foundProjects.map((project) => (
                <Button
                  key={project.id}
                  variant="ghost"
                  className="search__item"
                  onClick={() => handleProjectClick(project.id)}
                >
                  {project.title}
                </Button>
              ))}
            </>
          )}

          {foundTasks.length > 0 && (
            <>
              <p className="search__group-title">Tasks</p>

              {foundTasks.map((task) => (
                <Button
                  key={task.id}
                  variant="ghost"
                  className="search__item"
                  onClick={() => handleTaskClick(task.projectId, task.id)}
                >
                  <span className="search__task-title">{task.title}</span>
                  <span className="search__task-project">
                    /{projectsMap[task.projectId]?.title}
                  </span>
                </Button>
              ))}
            </>
          )}

          {foundProjects.length === 0 && foundTasks.length === 0 && (
            <p className="search__empty">Nothing was found for your query.</p>
          )}
        </OptionsWindow>
      )}
    </form>
  );
}
