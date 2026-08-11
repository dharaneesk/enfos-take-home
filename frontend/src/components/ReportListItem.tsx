import { Link } from "react-router-dom";
import type { ReportMetadata } from "../types/report";
import { ReportIcon } from "./ReportIcon";

interface ReportListItemProps {
  report: ReportMetadata;
}

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
      <span className="report-list-item__icon">
        <ReportIcon reportId={report.id} />
      </span>
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
