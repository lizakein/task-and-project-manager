interface SearchInputProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  isOpen: boolean;
  activeIndex: number;
  query: string;
  setQuery: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchInput({
  inputRef,
  isOpen,
  activeIndex,
  query,
  setQuery,
  onKeyDown,
}: SearchInputProps) {
  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        ref={inputRef}
        id="search"
        name="search"
        type="search"
        value={query}
        className="search__input"
        placeholder="Search for anything..."
        aria-label="Search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={isOpen ? "search-results" : undefined}
        aria-activedescendant={
          activeIndex >= 0 ? `search-option-${activeIndex}` : undefined
        }
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </>
  );
}
