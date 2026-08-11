import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { RelatedEntityList, type RelatedItem } from "../components/RelatedEntityList";
import { StatusBadge } from "../components/StatusBadge";
import { useAllReports } from "../hooks/useAllReports";

const backLink = (
  <Link to="/reports/departments" className="back-link">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M8.5 3L4.5 7L8.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Back to Departments
  </Link>
);

export function DepartmentDetailPage() {
  const { departmentId } = useParams<{ departmentId: string }>();
  const { users, departments, projects, isLoading, isError, error, refetchAll } =
    useAllReports();

  if (isLoading) {
    return (
      <div className="page">
        {backLink}
        <LoadingState columns={4} rows={3} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page">
        {backLink}
        <ErrorState
          message={error instanceof Error ? error.message : "Failed to load this department."}
          onRetry={refetchAll}
        />
      </div>
    );
  }

  const department = departments?.find((row) => row.id === departmentId);

  if (!department) {
    return (
      <div className="page">
        {backLink}
        <EmptyState
          title="Department not found"
          message={`There's no department with ID "${departmentId}".`}
        />
      </div>
    );
  }

  const manager = department.managerId
    ? users?.find((row) => row.id === department.managerId)
    : undefined;
  const managerItems: RelatedItem[] = manager
    ? [
        {
          to: `/users/${manager.id}`,
          id: manager.id,
          primary: manager.name,
          secondary: manager.role,
          badge: <StatusBadge status={manager.status} />,
        },
      ]
    : [];

  const people = (users ?? []).filter((row) => row.departmentId === department.id);
  const peopleItems: RelatedItem[] = people.map((row) => ({
    to: `/users/${row.id}`,
    id: row.id,
    primary: row.name,
    secondary: row.role,
    badge: <StatusBadge status={row.status} />,
  }));

  const departmentProjects = (projects ?? []).filter(
    (row) => row.departmentId === department.id,
  );
  const projectItems: RelatedItem[] = departmentProjects.map((row) => ({
    to: `/projects/${row.id}`,
    id: row.id,
    primary: row.name,
    secondary: `Owner: ${row.owner}`,
    badge: <StatusBadge status={row.status} />,
  }));

  return (
    <div className="page">
      {backLink}
      <div className="entity-header">
        <span className="cell-id">{department.id}</span>
        <h1 className="entity-header__name">{department.name}</h1>
      </div>

      <div className="entity-fields">
        <div className="entity-field">
          <span className="entity-field__label">Location</span>
          <span className="entity-field__value">{department.location}</span>
        </div>
        <div className="entity-field">
          <span className="entity-field__label">Employee Count</span>
          <span className="entity-field__value mono">{department.employeeCount}</span>
        </div>
      </div>

      <section className="entity-section">
        <h2 className="entity-section__title">Manager</h2>
        <RelatedEntityList kind="user" items={managerItems} emptyMessage="No manager assigned." />
      </section>

      <section className="entity-section">
        <h2 className="entity-section__title">
          People <span className="entity-section__count">({peopleItems.length})</span>
        </h2>
        <RelatedEntityList
          kind="user"
          items={peopleItems}
          emptyMessage="No one is assigned to this department yet."
        />
      </section>

      <section className="entity-section">
        <h2 className="entity-section__title">
          Current Projects <span className="entity-section__count">({projectItems.length})</span>
        </h2>
        <RelatedEntityList
          kind="project"
          items={projectItems}
          emptyMessage="No projects in this department yet."
        />
      </section>
    </div>
  );
}
