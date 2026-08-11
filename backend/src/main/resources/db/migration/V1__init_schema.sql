CREATE TABLE departments (
    id                VARCHAR(20)  NOT NULL,
    name              VARCHAR(255) NOT NULL,
    manager_user_id   VARCHAR(20)  NULL,
    location          VARCHAR(255) NOT NULL,
    created_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE users (
    id             VARCHAR(20)  NOT NULL,
    name           VARCHAR(255) NOT NULL,
    email          VARCHAR(255) NOT NULL,
    role           VARCHAR(100) NOT NULL,
    status         VARCHAR(20)  NOT NULL,
    created_date   DATE         NOT NULL,
    department_id  VARCHAR(20)  NULL,
    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT uq_users_email UNIQUE (email),
    CONSTRAINT chk_users_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'ON_LEAVE')),
    CONSTRAINT fk_users_department FOREIGN KEY (department_id) REFERENCES departments (id)
) ENGINE = InnoDB;

CREATE INDEX idx_users_department_id ON users (department_id);

ALTER TABLE departments
    ADD CONSTRAINT fk_departments_manager FOREIGN KEY (manager_user_id) REFERENCES users (id);

CREATE INDEX idx_departments_manager_user_id ON departments (manager_user_id);

CREATE TABLE projects (
    id             VARCHAR(20)  NOT NULL,
    name           VARCHAR(255) NOT NULL,
    department_id  VARCHAR(20)  NOT NULL,
    owner_user_id  VARCHAR(20)  NOT NULL,
    status         VARCHAR(20)  NOT NULL,
    start_date     DATE         NOT NULL,
    end_date       DATE         NULL,
    created_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT chk_projects_status CHECK (status IN ('PLANNED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED')),
    CONSTRAINT fk_projects_department FOREIGN KEY (department_id) REFERENCES departments (id),
    CONSTRAINT fk_projects_owner FOREIGN KEY (owner_user_id) REFERENCES users (id)
) ENGINE = InnoDB;

CREATE INDEX idx_projects_department_id ON projects (department_id);
CREATE INDEX idx_projects_owner_user_id ON projects (owner_user_id);

CREATE TABLE project_members (
    project_id  VARCHAR(20) NOT NULL,
    user_id     VARCHAR(20) NOT NULL,
    PRIMARY KEY (project_id, user_id),
    CONSTRAINT fk_project_members_project FOREIGN KEY (project_id) REFERENCES projects (id),
    CONSTRAINT fk_project_members_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE = InnoDB;

CREATE INDEX idx_project_members_user_id ON project_members (user_id);
