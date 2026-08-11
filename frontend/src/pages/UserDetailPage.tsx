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
  <Link to="/reports/users" className="back-link">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M8.5 3L4.5 7L8.5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Back to Users
  </Link>
);

export function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>();
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
          message={error instanceof Error ? error.message : "Failed to load this user."}
          onRetry={refetchAll}
        />
      </div>
    );
  }

  const user = users?.find((row) => row.id === userId);

  if (!user) {
    return (
      <div className="page">
        {backLink}
        <EmptyState
          title="User not found"
          message={`There's no user with ID "${userId}".`}
        />
      </div>
    );
  }

  const department = user.departmentId
    ? departments?.find((row) => row.id === user.departmentId)
    : undefined;
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

  const userProjects = (projects ?? []).filter(
    (project) => project.ownerId === user.id || project.memberIds.includes(user.id),
  );
  const projectItems: RelatedItem[] = userProjects.map((project) => ({
    to: `/projects/${project.id}`,
    id: project.id,
    primary: project.name,
    secondary: project.ownerId === user.id ? "Owner" : "Team member",
    badge: <StatusBadge status={project.status} />,
  }));

  return (
    <div className="page">
      {backLink}
      <div className="entity-header">
        <span className="cell-id">{user.id}</span>
        <h1 className="entity-header__name">{user.name}</h1>
        <StatusBadge status={user.status} />
      </div>

      <div className="entity-fields">
        <div className="entity-field">
          <span className="entity-field__label">Email</span>
          <span className="entity-field__value mono">{user.email}</span>
        </div>
        <div className="entity-field">
          <span className="entity-field__label">Role</span>
          <span className="entity-field__value">{user.role}</span>
        </div>
        <div className="entity-field">
          <span className="entity-field__label">Created</span>
          <span className="entity-field__value mono">{formatDate(user.createdDate)}</span>
        </div>
      </div>

      <section className="entity-section">
        <h2 className="entity-section__title">Department</h2>
        <RelatedEntityList
          kind="department"
          items={departmentItems}
          emptyMessage="Not assigned to a department."
        />
      </section>

      <section className="entity-section">
        <h2 className="entity-section__title">
          Projects <span className="entity-section__count">({projectItems.length})</span>
        </h2>
        <RelatedEntityList
          kind="project"
          items={projectItems}
          emptyMessage="Not working on any projects."
        />
      </section>
    </div>
  );
}
