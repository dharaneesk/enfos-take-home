import { Link, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { LoadingState } from "../components/LoadingState";
import { RelatedEntityList, type RelatedItem } from "../components/RelatedEntityList";
import { StatusBadge } from "../components/StatusBadge";
import { useAllReports } from "../hooks/useAllReports";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const backLink = (
  <Link to="/reports/projects" className="back-link">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M8.5 3L4.5 7L8.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Back to Projects
  </Link>
);

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
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
          message={error instanceof Error ? error.message : "Failed to load this project."}
          onRetry={refetchAll}
        />
      </div>
    );
  }

  const project = projects?.find((row) => row.id === projectId);

  if (!project) {
    return (
      <div className="page">
        {backLink}
        <EmptyState
          title="Project not found"
          message={`There's no project with ID "${projectId}".`}
        />
      </div>
    );
  }

  const owner = users?.find((row) => row.id === project.ownerId);
  const ownerItems: RelatedItem[] = owner
    ? [
        {
          to: `/users/${owner.id}`,
          id: owner.id,
          primary: owner.name,
          secondary: owner.role,
          badge: <StatusBadge status={owner.status} />,
        },
      ]
    : [];

  const department = departments?.find((row) => row.id === project.departmentId);
  const departmentItems: RelatedItem[] = department
    ? [
        {
          to: `/departments/${department.id}`,
          id: department.id,
          primary: department.name,
          secondary: department.location,
        },
      ]
    : [];

  const teamMembers = (users ?? []).filter((row) => project.memberIds.includes(row.id));
  const memberItems: RelatedItem[] = teamMembers.map((row) => ({
    to: `/users/${row.id}`,
    id: row.id,
    primary: row.name,
    secondary: row.role,
    badge: <StatusBadge status={row.status} />,
  }));

  return (
    <div className="page">
      {backLink}
      <div className="entity-header">
        <span className="cell-id">{project.id}</span>
        <h1 className="entity-header__name">{project.name}</h1>
        <StatusBadge status={project.status} />
      </div>

      <div className="entity-fields">
        <div className="entity-field">
          <span className="entity-field__label">Start Date</span>
          <span className="entity-field__value mono">{formatDate(project.startDate)}</span>
        </div>
        <div className="entity-field">
          <span className="entity-field__label">End Date</span>
          <span className="entity-field__value mono">{formatDate(project.endDate)}</span>
        </div>
      </div>

      <section className="entity-section">
        <h2 className="entity-section__title">Owner</h2>
        <RelatedEntityList kind="user" items={ownerItems} emptyMessage="No owner assigned." />
      </section>

      <section className="entity-section">
        <h2 className="entity-section__title">Department</h2>
        <RelatedEntityList
          kind="department"
          items={departmentItems}
          emptyMessage="Not linked to a department."
        />
      </section>

      <section className="entity-section">
        <h2 className="entity-section__title">
          Team <span className="entity-section__count">({memberItems.length})</span>
        </h2>
        <RelatedEntityList
          kind="user"
          items={memberItems}
          emptyMessage="No additional team members yet."
        />
      </section>
    </div>
  );
}
