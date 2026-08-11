import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { DepartmentDetailPage } from "./pages/DepartmentDetailPage";
import { LandingPage } from "./pages/LandingPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ReportDetailPage } from "./pages/ReportDetailPage";
import { UserDetailPage } from "./pages/UserDetailPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/reports/:reportId", element: <ReportDetailPage /> },
      { path: "/users/:userId", element: <UserDetailPage /> },
      { path: "/departments/:departmentId", element: <DepartmentDetailPage /> },
      { path: "/projects/:projectId", element: <ProjectDetailPage /> },
    ],
  },
]);
