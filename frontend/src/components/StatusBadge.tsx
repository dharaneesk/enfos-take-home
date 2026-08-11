import type { ProjectStatus, UserStatus } from "../types/report";

type Status = UserStatus | ProjectStatus;
type Tone = "success" | "warning" | "error" | "info" | "neutral";

const STATUS_META: Record<Status, { label: string; tone: Tone }> = {
  ACTIVE: { label: "Active", tone: "success" },
  INACTIVE: { label: "Inactive", tone: "error" },
  ON_LEAVE: { label: "On Leave", tone: "warning" },
  PLANNED: { label: "Planned", tone: "neutral" },
  IN_PROGRESS: { label: "In Progress", tone: "info" },
  ON_HOLD: { label: "On Hold", tone: "warning" },
  COMPLETED: { label: "Completed", tone: "success" },
  CANCELLED: { label: "Cancelled", tone: "error" },
};

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const meta = STATUS_META[status];
  return (
    <span className={`status-badge status-badge--${meta.tone}`}>
      {meta.label}
    </span>
  );
}
