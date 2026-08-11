import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { ReportList } from "../components/ReportList";
import { formatRelativeTime } from "../components/ReportListItem";
import { SearchBar } from "../components/SearchBar";
import { useReportsList } from "../hooks/useReports";
import type { ReportId, ReportMetadata } from "../types/report";

function SummaryStrip({ reports }: { reports: ReportMetadata[] }) {
  const byId = Object.fromEntries(
    reports.map((report) => [report.id, report]),
  ) as Partial<Record<ReportId, ReportMetadata>>;

  const mostRecent = reports.reduce((latest, report) =>
    new Date(report.lastUpdated) > new Date(latest.lastUpdated)
      ? report
      : latest,
  );

  return (
    <div className="summary-strip">
      <span className="summary-strip__dot" aria-hidden="true" />
      <span className="summary-strip__item mono">
        <strong>{byId.users?.rowCount ?? 0}</strong> users
      </span>
      <span className="summary-strip__sep">·</span>
      <span className="summary-strip__item mono">
        <strong>{byId.departments?.rowCount ?? 0}</strong> departments
      </span>
      <span className="summary-strip__sep">·</span>
      <span className="summary-strip__item mono">
        <strong>{byId.projects?.rowCount ?? 0}</strong> projects
      </span>
      <span className="summary-strip__updated mono">
        updated {formatRelativeTime(mostRecent.lastUpdated)}
      </span>
    </div>
  );
}

function RegistrySkeleton() {
  return (
    <div className="report-list" aria-busy="true" aria-label="Loading reports">
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="report-list-item" key={index}>
          <span className="report-list-item__icon" aria-hidden="true" />
          <span className="report-list-item__body">
            <span
              className="skeleton-bar"
              style={{ width: "140px", marginBottom: 8 }}
            />
            <span className="skeleton-bar" style={{ width: "220px", height: 10 }} />
          </span>
          <span className="skeleton-bar" style={{ width: "36px" }} />
          <span className="skeleton-bar" style={{ width: "70px" }} />
        </div>
      ))}
    </div>
  );
}

export function LandingPage() {
  const { data: reports, isLoading, isError, error, refetch } =
    useReportsList();
  const [search, setSearch] = useState("");

  const filteredReports = useMemo(() => {
    if (!reports) return [];
    const query = search.trim().toLowerCase();
    if (!query) return reports;
    return reports.filter((report) =>
      report.name.toLowerCase().includes(query),
    );
  }, [reports, search]);

  return (
    <div className="page">
      <header className="page-header">
        <span className="page-eyebrow">Enfos / Reporting</span>
        <h1 className="page-title">Reporting Portal</h1>
        <p className="page-subtitle">
          A live index of organizational records — browse users, departments,
          and projects.
        </p>
      </header>

      {reports && reports.length > 0 && <SummaryStrip reports={reports} />}

      {isLoading && <RegistrySkeleton />}

      {isError && (
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : "Failed to load the report registry."
          }
          onRetry={() => refetch()}
        />
      )}

      {reports && (
        <>
          <div className="landing-toolbar">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search reports..."
              ariaLabel="Search reports by name"
            />
          </div>
          {filteredReports.length > 0 ? (
            <ReportList reports={filteredReports} />
          ) : (
            <EmptyState
              title="No matching reports"
              message={`No reports match "${search}". Try a different search term.`}
            />
          )}
        </>
      )}
    </div>
  );
}
