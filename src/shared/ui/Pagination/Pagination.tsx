import { useMemo } from "react";
import { getPaginationPages } from "@utils/getPaginationPages";
import { FieldState } from "@app-types/fieldState";
import "./Pagination.css";

interface PaginationProps {
  page: FieldState<number>;
  totalPages: number;
  className?: string;
}

export default function Pagination({
  page,
  totalPages,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => getPaginationPages(page.value, totalPages),
    [page, totalPages]
  );

  if (totalPages <= 1) return null;

  return (
    <nav className={className} aria-label="Pagination">
      <ul className="pagination">
        {pages.map((p, index) => {
          const key = `${p}-${index}`;

          if (p === "...") {
            return (
              <li key={key} className="pagination__ellipsis">
                ...
              </li>
            );
          }

          return (
            <li key={key}>
              <button
                className={`pagination__button ${p === page.value ? "pagination__button--active" : ""}`}
                onClick={() => page.setValue(p)}
              >
                {p}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
