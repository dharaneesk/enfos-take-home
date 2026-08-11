import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

function LoggedOutScreen() {
  return (
    <div className="logged-out-screen">
      <div className="logged-out-screen__icon" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M9 19H5.5C4.67 19 4 18.33 4 17.5V4.5C4 3.67 4.67 3 5.5 3H9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 15.5L18.5 11L14 6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 11H18.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      <h1 className="logged-out-screen__title">You've been signed out</h1>
      <p className="logged-out-screen__message">
        Your session has ended. You can close this tab now.
      </p>
    </div>
  );
}

function getInitialSidebarOpen(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(min-width: 769px)").matches;
}

export function AppShell() {
  const [loggedOut, setLoggedOut] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(getInitialSidebarOpen);

  function handleLogout() {
    window.close();
    setLoggedOut(true);
  }

  if (loggedOut) {
    return <LoggedOutScreen />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((current) => !current)}
        onLogout={handleLogout}
      />
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <main className="app-main">
        <div className="mobile-topbar">
          <button
            type="button"
            className="mobile-sidebar-toggle"
            onClick={() => setSidebarOpen((current) => !current)}
            aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path
                d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <span className="mobile-topbar__brand">Enfos</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
