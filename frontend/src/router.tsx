import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { LandingPage } from "./pages/LandingPage";
import { ReportDetailPage } from "./pages/ReportDetailPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/reports/:reportId", element: <ReportDetailPage /> },
    ],
  },
]);
