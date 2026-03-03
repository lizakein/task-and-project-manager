import { useState } from "react";
import { Icon, IconButton } from "@ui/index";
import SearchIcon from "@assets/icons/ui/search-icon.svg";
import "./Search.css";

export function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <form
      className={`search ${isSearchOpen ? "search--open" : ""}`}
      role="search"
      aria-label="Site search"
      onSubmit={(e) => e.preventDefault()}
    >
      <IconButton
        className="search__toggle"
        ariaLabel={isSearchOpen ? "Close search" : "Open search"}
        onClick={() => setIsSearchOpen((prev) => !prev)}
        icon={<Icon src={SearchIcon} className="search__icon" />}
      />

      <input
        type="search"
        className="search-input"
        placeholder="Search for anything..."
        aria-label="Search"
      />
    </form>
  );
}
