import { NavLink } from "react-router-dom";
import type { ReportId } from "../types/report";
import { ReportIcon } from "./ReportIcon";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  onLogout: () => void;
}

const DIRECTORY_ITEMS: { to: string; label: string; reportId: ReportId }[] = [
  { to: "/reports/users", label: "Users", reportId: "users" },
  { to: "/reports/departments", label: "Departments", reportId: "departments" },
  { to: "/reports/projects", label: "Projects", reportId: "projects" },
];

export function Sidebar({ open, onToggle, onLogout }: SidebarProps) {
  return (
    <aside className={`sidebar${open ? " sidebar--open" : " sidebar--collapsed"}`}>
      <div className="sidebar-brand">
        <button
          type="button"
          className="sidebar-brand__mark"
          onClick={onToggle}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="2.5" y="3.5" width="11" height="2.5" rx="0.75" fill="currentColor" />
            <rect x="2.5" y="7.25" width="11" height="2.5" rx="0.75" fill="currentColor" />
            <rect x="2.5" y="11" width="7" height="2.5" rx="0.75" fill="currentColor" />
          </svg>
        </button>
        <span className="sidebar-brand__name">Enfos</span>
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={onToggle}
          aria-label="Collapse sidebar"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M9 3L5 7L9 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <NavLink
        to="/"
        end
        title="Overview"
        className={({ isActive }) => `sidebar-nav-link${isActive ? " active" : ""}`}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M3 8.25L9 3.5L15 8.25V14.25C15 14.66 14.66 15 14.25 15H10.75V10.75H7.25V15H3.75C3.34 15 3 14.66 3 14.25V8.25Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
        <span className="label">Overview</span>
      </NavLink>

      <span className="sidebar-section-label">Directory</span>
      <nav className="sidebar-nav" aria-label="Report directory">
        {DIRECTORY_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={item.label}
            className={({ isActive }) => `sidebar-nav-link${isActive ? " active" : ""}`}
          >
            <ReportIcon reportId={item.reportId} />
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user" title="Admin — Administrator">
          <span className="sidebar-user__avatar" aria-hidden="true">
            A
          </span>
          <span className="sidebar-user__body">
            <span className="sidebar-user__name">Admin</span>
            <span className="sidebar-user__role">Administrator</span>
          </span>
        </div>
        <button type="button" className="logout-button" onClick={onLogout} title="Log out">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6.5 14H3.75C3.34 14 3 13.66 3 13.25V2.75C3 2.34 3.34 2 3.75 2H6.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 11.25L13.75 8L10.5 4.75"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M6.5 8H13.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="label">Log out</span>
        </button>
      </div>
    </aside>
  );
}
