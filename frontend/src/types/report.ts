export type ReportId = "users" | "departments" | "projects";

export interface ReportMetadata {
  id: ReportId;
  name: string;
  description: string;
  endpoint: string;
  rowCount: number;
  lastUpdated: string;
}

export type UserStatus = "ACTIVE" | "INACTIVE" | "ON_LEAVE";

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
  createdDate: string;
  department: string | null;
  departmentId: string | null;
}

export interface DepartmentRow {
  id: string;
  name: string;
  manager: string | null;
  managerId: string | null;
  employeeCount: number;
  location: string;
}

export type ProjectStatus =
  | "PLANNED"
  | "IN_PROGRESS"
  | "ON_HOLD"
  | "COMPLETED"
  | "CANCELLED";

export interface ProjectRow {
  id: string;
  name: string;
  department: string;
  departmentId: string;
  owner: string;
  ownerId: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string | null;
  memberIds: string[];
}

export type ReportRow = UserRow | DepartmentRow | ProjectRow;

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
