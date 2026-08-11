import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ReportIcon } from "./ReportIcon";

export interface RelatedItem {
  to: string;
  id: string;
  primary: string;
  secondary?: string;
  badge?: ReactNode;
}

type RelatedKind = "user" | "department" | "project";

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M3.5 15c.75-3.3 2.9-5 5.5-5s4.75 1.7 5.5 5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const KIND_ICON: Record<RelatedKind, ReactNode> = {
  user: <PersonIcon />,
  department: <ReportIcon reportId="departments" />,
  project: <ReportIcon reportId="projects" />,
};

interface RelatedEntityListProps {
  kind: RelatedKind;
  items: RelatedItem[];
  emptyMessage: string;
}

export function RelatedEntityList({ kind, items, emptyMessage }: RelatedEntityListProps) {
  if (items.length === 0) {
    return <p className="related-list-empty">{emptyMessage}</p>;
  }

  return (
    <div className="related-list">
      {items.map((item) => (
        <Link key={item.to} to={item.to} className="related-list-item">
          <span className="related-list-item__icon">{KIND_ICON[kind]}</span>
          <span className="related-list-item__body">
            <span className="related-list-item__primary">
              <span className="cell-id">{item.id}</span>
              {item.primary}
            </span>
            {item.secondary && (
              <span className="related-list-item__secondary">{item.secondary}</span>
            )}
          </span>
          {item.badge}
          <svg
            className="related-list-item__chevron"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 3L9 7L5 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ))}
    </div>
  );
}
