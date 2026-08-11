import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { UseQueryResult } from "@tanstack/react-query";
import { DataTable, type DataTableColumn } from "../components/DataTable";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { SearchBar } from "../components/SearchBar";
import { StatusBadge } from "../components/StatusBadge";
import {
  useDepartmentsReport,
  useProjectsReport,
  useUsersReport,
} from "../hooks/useReports";
import type { DepartmentRow, ProjectRow, ReportId, UserRow } from "../types/report";

const VALID_REPORT_IDS: readonly ReportId[] = ["users", "departments", "projects"];

function isReportId(value: string | undefined): value is ReportId {
  return !!value && (VALID_REPORT_IDS as readonly string[]).includes(value);
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const USER_COLUMNS: DataTableColumn<UserRow>[] = [
  {
    key: "id",
    header: "User ID",
    sticky: true,
    accessor: (row) => <span className="cell-id">{row.id}</span>,
  },
  { key: "name", header: "Name", accessor: (row) => row.name },
  { key: "email", header: "Email", accessor: (row) => row.email },
  { key: "role", header: "Role", accessor: (row) => row.role },
  {
    key: "status",
    header: "Status",
    accessor: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "createdDate",
    header: "Created Date",
    mono: true,
    accessor: (row) => formatDate(row.createdDate),
  },
];

const DEPARTMENT_COLUMNS: DataTableColumn<DepartmentRow>[] = [
  {
    key: "id",
    header: "Department ID",
    sticky: true,
    accessor: (row) => <span className="cell-id">{row.id}</span>,
  },
  { key: "name", header: "Department Name", accessor: (row) => row.name },
  { key: "manager", header: "Manager", accessor: (row) => row.manager },
  {
    key: "employeeCount",
    header: "Employee Count",
    mono: true,
    accessor: (row) => row.employeeCount,
  },
  { key: "location", header: "Location", accessor: (row) => row.location },
];

const PROJECT_COLUMNS: DataTableColumn<ProjectRow>[] = [
  {
    key: "id",
    header: "Project ID",
    sticky: true,
    accessor: (row) => <span className="cell-id">{row.id}</span>,
  },
  { key: "name", header: "Project Name", accessor: (row) => row.name },
  { key: "department", header: "Department", accessor: (row) => row.department },
  { key: "owner", header: "Owner", accessor: (row) => row.owner },
  {
    key: "status",
    header: "Status",
    accessor: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: "startDate",
    header: "Start Date",
    mono: true,
    accessor: (row) => formatDate(row.startDate),
  },
  {
    key: "endDate",
    header: "End Date",
    mono: true,
    accessor: (row) => formatDate(row.endDate),
  },
];

const REPORT_TITLES: Record<ReportId, string> = {
  users: "Users",
  departments: "Departments",
  projects: "Projects",
};

const REPORT_SEARCH_PLACEHOLDER: Record<ReportId, string> = {
  users: "Search by name, email, role, department...",
  departments: "Search by name, manager, location...",
  projects: "Search by name, department, owner, status...",
};

function usersSearchText(row: UserRow): string {
  return [row.id, row.name, row.email, row.role, row.status, row.department ?? ""]
    .join(" ")
    .toLowerCase();
}

function departmentsSearchText(row: DepartmentRow): string {
  return [row.id, row.name, row.manager, row.location].join(" ").toLowerCase();
}

function projectsSearchText(row: ProjectRow): string {
  return [row.id, row.name, row.department, row.owner, row.status]
    .join(" ")
    .toLowerCase();
}

interface ReportBodyProps<T> {
  query: UseQueryResult<T[], Error>;
  columns: DataTableColumn<T>[];
  getRowId: (row: T) => string;
  getSearchText: (row: T) => string;
  search: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  emptyLabel: string;
}

function ReportBody<T>({
  query,
  columns,
  getRowId,
  getSearchText,
  search,
  onSearchChange,
  placeholder,
  emptyLabel,
}: ReportBodyProps<T>) {
  const { data, isLoading, isError, error, refetch } = query;

  const filteredRows = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => getSearchText(row).includes(q));
  }, [data, search, getSearchText]);

  return (
    <>
      <div className="detail-toolbar">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder={placeholder}
          ariaLabel={`Search ${emptyLabel}`}
        />
        {data && (
          <span className="row-count-chip mono">
            {filteredRows.length} / {data.length} rows
          </span>
        )}
      </div>

      {isLoading && <LoadingState columns={columns.length} />}

      {isError && (
        <ErrorState
          message={
            error instanceof Error ? error.message : `Failed to load ${emptyLabel}.`
          }
          onRetry={() => refetch()}
        />
      )}

      {data &&
        (filteredRows.length > 0 ? (
          <DataTable columns={columns} rows={filteredRows} getRowId={getRowId} />
        ) : data.length === 0 ? (
          <EmptyState
            title={`No ${emptyLabel} yet`}
            message={`There are no ${emptyLabel} records in this report.`}
          />
        ) : (
          <EmptyState
            title="No matching rows"
            message={`No rows match "${search}". Try a different search term.`}
          />
        ))}
    </>
  );
}

export function ReportDetailPage() {
  const { reportId: rawReportId } = useParams<{ reportId: string }>();
  const reportId = isReportId(rawReportId) ? rawReportId : undefined;
  const [search, setSearch] = useState("");

  const usersQuery = useUsersReport(reportId === "users");
  const departmentsQuery = useDepartmentsReport(reportId === "departments");
  const projectsQuery = useProjectsReport(reportId === "projects");

  const backLink = (
    <Link to="/" className="back-link">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M8.5 3L4.5 7L8.5 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back to reports
    </Link>
  );

  if (!reportId) {
    return (
      <div className="page">
        {backLink}
        <EmptyState
          title="Unknown report"
          message="This report doesn't exist. Head back to the registry to pick a valid one."
        />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="detail-header">
        <div>
          {backLink}
          <h1 className="page-title">{REPORT_TITLES[reportId]}</h1>
        </div>
      </div>

      {reportId === "users" && (
        <ReportBody
          query={usersQuery}
          columns={USER_COLUMNS}
          getRowId={(row) => row.id}
          getSearchText={usersSearchText}
          search={search}
          onSearchChange={setSearch}
          placeholder={REPORT_SEARCH_PLACEHOLDER.users}
          emptyLabel="users"
        />
      )}
      {reportId === "departments" && (
        <ReportBody
          query={departmentsQuery}
          columns={DEPARTMENT_COLUMNS}
          getRowId={(row) => row.id}
          getSearchText={departmentsSearchText}
          search={search}
          onSearchChange={setSearch}
          placeholder={REPORT_SEARCH_PLACEHOLDER.departments}
          emptyLabel="departments"
        />
      )}
      {reportId === "projects" && (
        <ReportBody
          query={projectsQuery}
          columns={PROJECT_COLUMNS}
          getRowId={(row) => row.id}
          getSearchText={projectsSearchText}
          search={search}
          onSearchChange={setSearch}
          placeholder={REPORT_SEARCH_PLACEHOLDER.projects}
          emptyLabel="projects"
        />
      )}
    </div>
  );
}
