import type { ReportMetadata } from "../types/report";
import { ReportListItem } from "./ReportListItem";

interface ReportListProps {
  reports: ReportMetadata[];
}

export function ReportList({ reports }: ReportListProps) {
  return (
    <div className="report-list">
      {reports.map((report) => (
        <ReportListItem key={report.id} report={report} />
      ))}
    </div>
  );
}
