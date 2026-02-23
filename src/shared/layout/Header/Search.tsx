import { useState } from "react";
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
      <button
        type="button"
        className="search__toggle icon-button"
        aria-label={isSearchOpen ? "Close search" : "Open search"}
        onClick={() => setIsSearchOpen((prev) => !prev)}
      >
        <img
          src={SearchIcon}
          alt=""
          role="presentation"
          className="search__icon"
        />
      </button>

      <input
        type="search"
        className="search-input"
        placeholder="Search for anything..."
        aria-label="Search"
      />
    </form>
  );
}
