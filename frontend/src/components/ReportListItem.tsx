import { Link } from "react-router-dom";
import type { ReportId, ReportMetadata } from "../types/report";

interface ReportListItemProps {
  report: ReportMetadata;
}

const ICONS: Record<ReportId, JSX.Element> = {
  users: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7.5" cy="6.5" r="2.75" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M2.75 16c.6-2.8 2.6-4.25 4.75-4.25S12.15 13.2 12.75 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="7" r="2.1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13 11.6c1.85.1 3.5 1.4 4 4.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  departments: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="3" width="9" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6.5H10M7 9.5H10M7 12.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 8H16.25V17H13" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  projects: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M2.75 5.5C2.75 4.67 3.42 4 4.25 4H7.5L9 5.75H15.75C16.58 5.75 17.25 6.42 17.25 7.25V14.5C17.25 15.33 16.58 16 15.75 16H4.25C3.42 16 2.75 15.33 2.75 14.5V5.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffSec = Math.round(diffMs / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.round(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.round(diffHour / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.round(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  const diffYear = Math.round(diffMonth / 12);
  return `${diffYear}y ago`;
}

export function ReportListItem({ report }: ReportListItemProps) {
  return (
    <Link
      to={`/reports/${report.id}`}
      className="report-list-item"
      aria-label={`Open ${report.name} report`}
    >
      <span className="report-list-item__icon">{ICONS[report.id]}</span>
      <span className="report-list-item__body">
        <span className="report-list-item__name">{report.name}</span>
        <span className="report-list-item__description">
          {report.description}
        </span>
      </span>
      <span className="report-list-item__count mono">
        {report.rowCount.toLocaleString()}
        <span className="report-list-item__count-label">rows</span>
      </span>
      <span className="report-list-item__updated mono">
        updated {formatRelativeTime(report.lastUpdated)}
      </span>
    </Link>
  );
}
