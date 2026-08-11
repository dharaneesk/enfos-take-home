CREATE TABLE departments (
    id            VARCHAR(20)  NOT NULL,
    name          VARCHAR(255) NOT NULL,
    manager_name  VARCHAR(255) NOT NULL,
    location      VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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
