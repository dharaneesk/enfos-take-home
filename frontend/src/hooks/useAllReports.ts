import { useDepartmentsReport, useProjectsReport, useUsersReport } from "./useReports";

export function useAllReports() {
  const usersQuery = useUsersReport(true);
  const departmentsQuery = useDepartmentsReport(true);
  const projectsQuery = useProjectsReport(true);

  const isLoading = usersQuery.isLoading || departmentsQuery.isLoading || projectsQuery.isLoading;
  const isError = usersQuery.isError || departmentsQuery.isError || projectsQuery.isError;
  const error = usersQuery.error ?? departmentsQuery.error ?? projectsQuery.error ?? null;

  function refetchAll() {
    usersQuery.refetch();
    departmentsQuery.refetch();
    projectsQuery.refetch();
  }

  return {
    users: usersQuery.data,
    departments: departmentsQuery.data,
    projects: projectsQuery.data,
    isLoading,
    isError,
    error,
    refetchAll,
  };
}
