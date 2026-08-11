import { useQuery } from "@tanstack/react-query";
import {
  fetchDepartments,
  fetchProjects,
  fetchReports,
  fetchUsers,
} from "../api/reportsApi";

export function useReportsList() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
  });
}

export function useUsersReport(enabled: boolean) {
  return useQuery({
    queryKey: ["reports", "users"],
    queryFn: fetchUsers,
    enabled,
  });
}

export function useDepartmentsReport(enabled: boolean) {
  return useQuery({
    queryKey: ["reports", "departments"],
    queryFn: fetchDepartments,
    enabled,
  });
}

export function useProjectsReport(enabled: boolean) {
  return useQuery({
    queryKey: ["reports", "projects"],
    queryFn: fetchProjects,
    enabled,
  });
}
