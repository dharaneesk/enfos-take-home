import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { ReportDetailPage } from "./pages/ReportDetailPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/reports/:reportId", element: <ReportDetailPage /> },
]);
