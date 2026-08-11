import type {
  ApiError,
  DepartmentRow,
  ProjectRow,
  ReportMetadata,
  UserRow,
} from "../types/report";

const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? "http://localhost:8080" : "");

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    let message = `Request to ${path} failed with status ${response.status}`;
    try {
      const body = (await response.json()) as ApiError;
      if (body.message) {
        message = body.message;
      }
    } catch {
      // response body wasn't JSON — fall back to the generic message above
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function fetchReports(): Promise<ReportMetadata[]> {
  return fetchJson<ReportMetadata[]>("/api/reports");
}

export function fetchUsers(): Promise<UserRow[]> {
  return fetchJson<UserRow[]>("/api/reports/users");
}

export function fetchDepartments(): Promise<DepartmentRow[]> {
  return fetchJson<DepartmentRow[]>("/api/reports/departments");
}

export function fetchProjects(): Promise<ProjectRow[]> {
  return fetchJson<ProjectRow[]>("/api/reports/projects");
}
