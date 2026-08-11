# Enfos Reporting Portal

An internal reporting portal for browsing organizational data — Users, Departments, and Projects — as a read-only registry. Every report is a sortable, searchable table, and every row drills into a dedicated detail page showing how that record connects to everything else (a department's manager and current team, a project's owner and teammates, a user's department and projects).

React + TypeScript frontend, Spring Boot API, MySQL — all three run together with one Docker command.

## Screenshots

See [`docs/screenshots/`](docs/screenshots/).

## Features

- **3 reports** — Users, Departments, Projects — each a column-config-driven data table with click-to-sort on every column and client-side search.
- **Entity detail pages** (`/users/:id`, `/departments/:id`, `/projects/:id`) — click any row, or any related person/department/project shown on a detail page, to navigate straight to it.
- **Landing registry** — live aggregate summary strip, per-report row counts and "last updated" timestamps computed from real data, client-side search.
- **Distinct loading / empty / error states** everywhere data is fetched, with retry.
- **Responsive** — tables scroll horizontally with a sticky ID column; the sidebar collapses to an icon rail (desktop) or an off-canvas drawer (mobile).

## Tech stack

| Layer | Stack |
|---|---|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, Flyway, MySQL 8 (`com.mysql:mysql-connector-j`) |
| Frontend | React 18, TypeScript, Vite, React Router v6, TanStack Query v5 |
| Database | MySQL 8, runs entirely in Docker — no local install needed |
| Orchestration | Docker Compose |

No authentication — the portal is intentionally open (see `NOTES.txt`). No write endpoints; this is a read-only reporting tool.

---

## Quick start (Docker — recommended)

**Prerequisites:** Docker Desktop (or Docker Engine) with the Compose v2 plugin, i.e. the `docker compose` subcommand — roughly Docker 24+ / Compose 2.20+.

```bash
git clone <this-repo>
cd enfos-reporting-portal
docker compose up --build
```

Then open **http://localhost**.

That's the whole setup: MySQL is provisioned and seeded automatically (Flyway runs the schema migration and then seeds ~10 departments, ~42 users, ~20 projects on first boot), the backend waits for MySQL's healthcheck before starting, and Nginx serves the frontend and reverse-proxies `/api/*` to the backend — so the browser only ever talks to one origin.

To stop:

```bash
docker compose down          # stop containers, keep the seeded database
docker compose down -v       # also wipe the database volume (next `up` reseeds from scratch)
```

**Optional overrides** — copy `.env.example` to `.env` if you want different MySQL credentials or a different host port for the frontend (`FRONTEND_PORT`). Not required for a normal run; the compose file already has working defaults baked in.

Individual services, if you want to rebuild or watch logs for just one:

```bash
docker compose up --build backend
docker compose logs -f backend
```

---

## Local development (without Docker)

Useful for iterating on one side without rebuilding a container each time. You can still let Docker run MySQL only:

```bash
docker compose up mysql -d
```

### Backend

**Prerequisites:** Java 17, Maven 3.9+.

```bash
cd backend
mvn spring-boot:run
```

By default it connects to `localhost:3306` with the same `enfos` / `enfos` credentials the compose file uses (see `application.yml` — every setting has an env var override: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`). Flyway migrates and seeds MySQL automatically on startup, same as in Docker. The API is served at **http://localhost:8080**, and CORS is already configured for `http://localhost:5173` for the frontend dev server below.

### Frontend

**Prerequisites:** Node 20+.

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. In dev mode the frontend calls the backend directly at `http://localhost:8080` (see `src/api/reportsApi.ts`); in the Docker build it calls same-origin `/api/*` through the Nginx proxy instead. Override with a `VITE_API_BASE_URL` env var if needed.

Other frontend scripts: `npm run build` (typecheck + production build), `npm run preview` (serve the production build locally).

---

## API reference

All endpoints are read-only (`GET`). Full result sets are returned per report — no server-side pagination (see `NOTES.txt`).

| Method | Endpoint | Returns |
|---|---|---|
| GET | `/api/reports` | Metadata for all 3 reports: `[{ id, name, description, endpoint, rowCount, lastUpdated }]` |
| GET | `/api/reports/users` | `[{ id, name, email, role, status, createdDate, department, departmentId }]` |
| GET | `/api/reports/departments` | `[{ id, name, manager, managerId, employeeCount, location }]` |
| GET | `/api/reports/projects` | `[{ id, name, department, departmentId, owner, ownerId, status, startDate, endDate, memberIds }]` |

The `*Id` / `memberIds` fields exist so the frontend can cross-link entities (e.g. render a department's manager as a clickable link) without any additional endpoints — the detail pages just cross-reference these three already-fetched lists client-side.

Errors return a consistent shape via a global exception handler:

```json
{
  "timestamp": "...",
  "status": 404,
  "error": "Not Found",
  "message": "...",
  "path": "/api/reports/..."
}
```

---

## Project structure

```
enfos-reporting-portal/
├── docker-compose.yml
├── .env.example
├── NOTES.txt
├── docs/screenshots/
│
├── backend/
│   ├── Dockerfile                    multi-stage: Maven build -> slim JRE runtime
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/enfos/reporting/
│       │   ├── ReportingApplication.java
│       │   ├── config/          CorsConfig
│       │   ├── controller/      ReportController
│       │   ├── dto/             ReportMetadataDto, UserDto, DepartmentDto, ProjectDto
│       │   ├── entity/          User, Department, Project, UserStatus, ProjectStatus
│       │   ├── repository/      UserRepository, DepartmentRepository, ProjectRepository
│       │   ├── service/         ReportService
│       │   └── exception/       ResourceNotFoundException, ApiError, GlobalExceptionHandler
│       └── resources/
│           ├── application.yml
│           └── db/migration/    V1__init_schema.sql, V2__seed_data.sql
│
└── frontend/
    ├── Dockerfile                    multi-stage: Node build -> Nginx runtime
    ├── nginx.conf                    proxies /api/* to the backend service
    └── src/
        ├── api/          reportsApi.ts
        ├── types/        report.ts
        ├── hooks/        useReports.ts, useAllReports.ts
        ├── pages/        LandingPage, ReportDetailPage,
        │                 UserDetailPage, DepartmentDetailPage, ProjectDetailPage
        ├── components/   AppShell, Sidebar, DataTable, ReportList, ReportListItem,
        │                 RelatedEntityList, ReportIcon, StatusBadge, SearchBar,
        │                 LoadingState, EmptyState, ErrorState
        └── styles/       tokens.css, global.css
```

## Assumptions & tradeoffs

See [`NOTES.txt`](NOTES.txt) for the full write-up (data model choices, no-auth rationale, client-side search/sort instead of server-side pagination, and the schema changes made to support entity drill-down).
