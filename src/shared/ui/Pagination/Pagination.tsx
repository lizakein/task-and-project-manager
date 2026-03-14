import { useMemo } from "react";
import { getPaginationPages } from "@utils/getPaginationPages";
import "./Pagination.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => getPaginationPages(page, totalPages),
    [page, totalPages]
  );

  if (totalPages <= 1) return null;

  return (
    <nav className={className} aria-label="Pagination">
      <ul className="pagination">
        {pages.map((p, index) => {
          if (p === "...") {
            return (
              <li key={index} className="pagination__ellipsis">
                ...
              </li>
            );
          }

          return (
            <li key={p}>
              <button
                className={`pagination__button ${p === page ? "pagination__button--active" : ""}`}
                onClick={() => onPageChange(p)}
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
