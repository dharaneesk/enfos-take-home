import { useMemo, useState, type ReactNode } from "react";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number | null;
  sticky?: boolean;
  mono?: boolean;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
}

type SortDirection = "asc" | "desc";
interface SortState {
  key: string;
  direction: SortDirection;
}

function compareValues(a: string | number | null, b: string | number | null): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1;
  if (b === null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
}

export function DataTable<T>({ columns, rows, getRowId }: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(null);

  const sortColumn = sort ? columns.find((c) => c.key === sort.key) : undefined;

  const sortedRows = useMemo(() => {
    if (!sort || !sortColumn?.sortValue) return rows;
    const { sortValue } = sortColumn;
    const direction = sort.direction === "asc" ? 1 : -1;
    return [...rows].sort(
      (a, b) => compareValues(sortValue(a), sortValue(b)) * direction,
    );
  }, [rows, sort, sortColumn]);

  function handleSortClick(column: DataTableColumn<T>) {
    if (!column.sortValue) return;
    setSort((current) => {
      if (current?.key !== column.key) return { key: column.key, direction: "asc" };
      if (current.direction === "asc") return { key: column.key, direction: "desc" };
      return null;
    });
  }

  return (
    <div className="data-table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => {
              const isSortable = !!column.sortValue;
              const activeDirection = sort?.key === column.key ? sort.direction : undefined;
              return (
                <th
                  key={column.key}
                  className={column.sticky ? "sticky-col" : undefined}
                  aria-sort={
                    activeDirection
                      ? activeDirection === "asc"
                        ? "ascending"
                        : "descending"
                      : isSortable
                        ? "none"
                        : undefined
                  }
                >
                  {isSortable ? (
                    <button
                      type="button"
                      className={`sort-button${activeDirection ? " sort-button--active" : ""}`}
                      onClick={() => handleSortClick(column)}
                    >
                      {column.header}
                      <span className="sort-icon" aria-hidden="true">
                        {activeDirection === "desc" ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : activeDirection === "asc" ? (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 6.5L5 3.5L8 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 4L5 1.5L8 4M2 6L5 8.5L8 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row) => (
            <tr key={getRowId(row)}>
              {columns.map((column) => {
                const classNames = [
                  column.sticky ? "sticky-col" : "",
                  column.mono ? "mono-cell" : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                return (
                  <td key={column.key} className={classNames || undefined}>
                    {column.accessor(row)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
