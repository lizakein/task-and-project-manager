import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, IconButton, OptionsWindow } from "@ui/index";
import SearchIcon from "@assets/icons/ui/search-icon.svg";
import { useSearch } from "../model/useSearch";
import { useSearchKeyboard } from "../model/useSearchKeyboard";
import { SearchResults } from "./SearchResults";
import "./Search.css";
import { useSearchPosition } from "../model/useSearchPosition";
import { SearchInput } from "./SearchInput";

export function Search() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { query, setQuery, clearQuery, foundProjects, foundTasks, results } =
    useSearch();

  const isMobile = window.innerWidth <= 720; // Размер в media query

  const projectsMap = useMemo(
    () =>
      Object.fromEntries(foundProjects.map((project) => [project.id, project])),
    [foundProjects]
  );

  const isOpen = !!query && results.length > 0;
  const menuPosition = useSearchPosition(inputRef, query);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
    clearQuery();
  };

  const handleTaskClick = (projectId: string, taskId: string) => {
    navigate(`/project/${projectId}/${taskId}`);
    clearQuery();
  };

  const { activeIndex, onKeyDown } = useSearchKeyboard(
    results,
    foundProjects,
    foundTasks,
    handleProjectClick,
    handleTaskClick,
    clearQuery
  );

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

      <SearchInput
        inputRef={inputRef}
        isOpen={isOpen}
        activeIndex={activeIndex}
        query={query}
        setQuery={setQuery}
        onKeyDown={onKeyDown}
      />

      {query && menuPosition && (
        <OptionsWindow
          triggerRef={inputRef}
          position={menuPosition}
          onClose={() => clearQuery()}
          role="listbox"
          ariaLabel="Search results"
          disableAutoFocus
          shouldReturnFocus={false}
        >
          <SearchResults
            foundProjects={foundProjects}
            foundTasks={foundTasks}
            activeIndex={activeIndex}
            onProjectClick={handleProjectClick}
            onTaskClick={handleTaskClick}
            projectsMap={projectsMap}
          />
        </OptionsWindow>
      )}
    </form>
  );
}
