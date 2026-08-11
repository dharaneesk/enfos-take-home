interface LoadingStateProps {
  columns?: number;
  rows?: number;
}

export function LoadingState({ columns = 6, rows = 8 }: LoadingStateProps) {
  return (
    <div
      className="data-table-wrapper"
      aria-busy="true"
      aria-label="Loading report data"
    >
      <table className="data-table">
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <td key={columnIndex}>
                  <span
                    className="skeleton-bar"
                    style={{ width: columnIndex === 0 ? "64px" : "80%" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
