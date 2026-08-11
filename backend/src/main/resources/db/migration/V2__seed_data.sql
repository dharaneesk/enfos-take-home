-- ============================================================
-- Departments (10)
-- ============================================================
INSERT INTO departments (id, name, manager_name, location, created_at, updated_at) VALUES
('DEPT-001', 'Engineering',       'Sarah Chen',        'San Francisco, CA', '2023-01-10 09:00:00', '2026-07-28 14:22:00'),
('DEPT-002', 'Product',           'Michael Torres',     'San Francisco, CA', '2023-01-10 09:00:00', '2026-06-15 11:05:00'),
('DEPT-003', 'Design',            'Priya Nair',         'Austin, TX',        '2023-02-01 09:00:00', '2026-05-20 16:40:00'),
('DEPT-004', 'Sales',             'David Kim',          'New York, NY',      '2023-01-15 09:00:00', '2026-08-01 10:15:00'),
('DEPT-005', 'Marketing',         'Emma Rodriguez',     'New York, NY',      '2023-03-01 09:00:00', '2026-04-10 09:30:00'),
('DEPT-006', 'People Ops',        'James Whitfield',    'Chicago, IL',       '2023-04-12 09:00:00', '2026-02-18 13:12:00'),
('DEPT-007', 'Finance',           'Laura Bennett',      'Chicago, IL',       '2023-01-20 09:00:00', '2026-03-22 08:50:00'),
('DEPT-008', 'Customer Success',  'Carlos Mendes',      'Austin, TX',        '2023-05-05 09:00:00', '2026-07-02 15:05:00'),
('DEPT-009', 'IT',                'Nina Petrova',       'Denver, CO',        '2023-06-18 09:00:00', '2026-01-30 12:00:00'),
('DEPT-010', 'Legal',             'Robert Hayes',       'Denver, CO',        '2023-08-09 09:00:00', '2025-12-11 10:45:00');

-- ============================================================
-- Users (42) — spread unevenly across departments, 2 unassigned
-- ============================================================
INSERT INTO users (id, name, email, role, status, created_date, department_id, created_at, updated_at) VALUES
-- Engineering (9)
('USR-1001', 'Alice Nguyen',      'alice.nguyen@enfos.io',      'Senior Software Engineer', 'ACTIVE',   '2023-03-14', 'DEPT-001', '2023-03-14 09:00:00', '2025-09-02 10:00:00'),
('USR-1002', 'Brian Osei',        'brian.osei@enfos.io',        'Software Engineer',        'ACTIVE',   '2024-06-02', 'DEPT-001', '2024-06-02 09:00:00', '2024-06-02 09:00:00'),
('USR-1003', 'Chloe Martin',      'chloe.martin@enfos.io',      'Engineering Manager',      'ACTIVE',   '2023-01-22', 'DEPT-001', '2023-01-22 09:00:00', '2026-08-05 09:40:00'),
('USR-1004', 'Derek Wallace',     'derek.wallace@enfos.io',     'DevOps Engineer',          'ACTIVE',   '2024-11-05', 'DEPT-001', '2024-11-05 09:00:00', '2025-04-18 14:00:00'),
('USR-1005', 'Elena Popescu',     'elena.popescu@enfos.io',     'QA Engineer',              'ACTIVE',   '2025-02-18', 'DEPT-001', '2025-02-18 09:00:00', '2025-02-18 09:00:00'),
('USR-1006', 'Farhan Sheikh',     'farhan.sheikh@enfos.io',     'Software Engineer',        'ON_LEAVE', '2023-09-10', 'DEPT-001', '2023-09-10 09:00:00', '2026-06-30 08:20:00'),
('USR-1007', 'Grace Liu',         'grace.liu@enfos.io',         'Senior Software Engineer', 'ACTIVE',   '2024-01-29', 'DEPT-001', '2024-01-29 09:00:00', '2025-11-11 09:15:00'),
('USR-1008', 'Hassan Malik',      'hassan.malik@enfos.io',      'Software Engineer',        'INACTIVE', '2023-05-16', 'DEPT-001', '2023-05-16 09:00:00', '2025-01-09 17:00:00'),
('USR-1009', 'Isla Fraser',       'isla.fraser@enfos.io',       'DevOps Engineer',          'ACTIVE',   '2025-07-08', 'DEPT-001', '2025-07-08 09:00:00', '2025-07-08 09:00:00'),
-- Product (5)
('USR-1010', 'Jack Sullivan',     'jack.sullivan@enfos.io',     'Senior Product Manager',   'ACTIVE',   '2023-02-11', 'DEPT-002', '2023-02-11 09:00:00', '2026-03-14 10:30:00'),
('USR-1011', 'Karen Ibrahim',     'karen.ibrahim@enfos.io',     'Product Manager',          'ACTIVE',   '2024-04-20', 'DEPT-002', '2024-04-20 09:00:00', '2025-05-02 11:00:00'),
('USR-1012', 'Liam Foster',       'liam.foster@enfos.io',       'Product Analyst',          'ACTIVE',   '2025-03-03', 'DEPT-002', '2025-03-03 09:00:00', '2025-03-03 09:00:00'),
('USR-1013', 'Mia Alvarez',       'mia.alvarez@enfos.io',       'Product Manager',          'ON_LEAVE', '2023-10-27', 'DEPT-002', '2023-10-27 09:00:00', '2026-07-20 09:50:00'),
('USR-1014', 'Noah Becker',       'noah.becker@enfos.io',       'Product Analyst',          'ACTIVE',   '2024-08-14', 'DEPT-002', '2024-08-14 09:00:00', '2024-08-14 09:00:00'),
-- Design (4)
('USR-1015', 'Olivia Grant',      'olivia.grant@enfos.io',      'Design Lead',              'ACTIVE',   '2023-04-09', 'DEPT-003', '2023-04-09 09:00:00', '2026-02-11 13:00:00'),
('USR-1016', 'Paul Anderson',     'paul.anderson@enfos.io',     'Product Designer',         'ACTIVE',   '2024-09-30', 'DEPT-003', '2024-09-30 09:00:00', '2025-03-01 09:00:00'),
('USR-1017', 'Quinn Delacroix',   'quinn.delacroix@enfos.io',   'UX Researcher',            'ACTIVE',   '2025-01-12', 'DEPT-003', '2025-01-12 09:00:00', '2025-01-12 09:00:00'),
('USR-1018', 'Ruth Okafor',       'ruth.okafor@enfos.io',       'Product Designer',         'INACTIVE', '2023-07-19', 'DEPT-003', '2023-07-19 09:00:00', '2024-10-05 15:30:00'),
-- Sales (6)
('USR-1019', 'Samuel Price',      'samuel.price@enfos.io',      'Sales Manager',            'ACTIVE',   '2023-02-25', 'DEPT-004', '2023-02-25 09:00:00', '2026-07-30 09:00:00'),
('USR-1020', 'Tara Singh',        'tara.singh@enfos.io',        'Account Executive',        'ACTIVE',   '2024-03-11', 'DEPT-004', '2024-03-11 09:00:00', '2025-02-01 10:00:00'),
('USR-1021', 'Umar Farouk',       'umar.farouk@enfos.io',       'Account Executive',        'ACTIVE',   '2024-12-01', 'DEPT-004', '2024-12-01 09:00:00', '2024-12-01 09:00:00'),
('USR-1022', 'Victoria Reyes',    'victoria.reyes@enfos.io',    'Sales Development Rep',    'ACTIVE',   '2025-05-22', 'DEPT-004', '2025-05-22 09:00:00', '2025-05-22 09:00:00'),
('USR-1023', 'Walter Huang',      'walter.huang@enfos.io',      'Account Executive',        'ON_LEAVE', '2023-11-08', 'DEPT-004', '2023-11-08 09:00:00', '2026-08-01 12:00:00'),
('USR-1024', 'Ximena Torres',     'ximena.torres@enfos.io',     'Sales Development Rep',    'ACTIVE',   '2025-08-03', 'DEPT-004', '2025-08-03 09:00:00', '2025-08-03 09:00:00'),
-- Marketing (4)
('USR-1025', 'Yusuf Demir',       'yusuf.demir@enfos.io',       'Marketing Manager',        'ACTIVE',   '2023-06-06', 'DEPT-005', '2023-06-06 09:00:00', '2026-04-05 09:00:00'),
('USR-1026', 'Zoe Campbell',      'zoe.campbell@enfos.io',      'Content Strategist',       'ACTIVE',   '2024-07-17', 'DEPT-005', '2024-07-17 09:00:00', '2024-12-01 09:00:00'),
('USR-1027', 'Aaron Blake',       'aaron.blake@enfos.io',       'Growth Marketer',          'ACTIVE',   '2025-04-09', 'DEPT-005', '2025-04-09 09:00:00', '2025-04-09 09:00:00'),
('USR-1028', 'Bianca Rossi',      'bianca.rossi@enfos.io',      'Content Strategist',       'INACTIVE', '2023-12-14', 'DEPT-005', '2023-12-14 09:00:00', '2025-06-19 11:20:00'),
-- People Ops (2)
('USR-1029', 'Caleb Johnston',    'caleb.johnston@enfos.io',    'HR Business Partner',      'ACTIVE',   '2023-08-21', 'DEPT-006', '2023-08-21 09:00:00', '2026-01-15 09:00:00'),
('USR-1030', 'Diana Voss',        'diana.voss@enfos.io',        'Recruiter',                'ACTIVE',   '2024-10-02', 'DEPT-006', '2024-10-02 09:00:00', '2024-10-02 09:00:00'),
-- Finance (3)
('USR-1031', 'Edward Lambert',    'edward.lambert@enfos.io',    'Controller',               'ACTIVE',   '2023-03-30', 'DEPT-007', '2023-03-30 09:00:00', '2026-03-10 09:00:00'),
('USR-1032', 'Fiona Kowalski',    'fiona.kowalski@enfos.io',    'Financial Analyst',        'ACTIVE',   '2024-05-19', 'DEPT-007', '2024-05-19 09:00:00', '2024-05-19 09:00:00'),
('USR-1033', 'George Papadopoulos','george.papadopoulos@enfos.io','Accountant',             'ON_LEAVE', '2025-06-27', 'DEPT-007', '2025-06-27 09:00:00', '2026-07-15 09:00:00'),
-- Customer Success (4)
('USR-1034', 'Hannah Brooks',     'hannah.brooks@enfos.io',     'Customer Success Manager', 'ACTIVE',   '2023-09-05', 'DEPT-008', '2023-09-05 09:00:00', '2026-07-25 09:00:00'),
('USR-1035', 'Ivan Petrenko',     'ivan.petrenko@enfos.io',     'Support Specialist',       'ACTIVE',   '2024-02-14', 'DEPT-008', '2024-02-14 09:00:00', '2024-09-01 09:00:00'),
('USR-1036', 'Jasmine Cole',      'jasmine.cole@enfos.io',      'Support Specialist',       'ACTIVE',   '2025-03-29', 'DEPT-008', '2025-03-29 09:00:00', '2025-03-29 09:00:00'),
('USR-1037', 'Kevin O''Donnell',  'kevin.odonnell@enfos.io',    'Customer Success Manager', 'ACTIVE',   '2024-11-23', 'DEPT-008', '2024-11-23 09:00:00', '2024-11-23 09:00:00'),
-- IT (2)
('USR-1038', 'Leila Hassan',      'leila.hassan@enfos.io',      'IT Administrator',         'ACTIVE',   '2023-05-08', 'DEPT-009', '2023-05-08 09:00:00', '2026-01-20 09:00:00'),
('USR-1039', 'Marcus Webb',       'marcus.webb@enfos.io',       'Systems Engineer',         'ACTIVE',   '2025-02-02', 'DEPT-009', '2025-02-02 09:00:00', '2025-02-02 09:00:00'),
-- Legal (1)
('USR-1040', 'Natalie Fournier',  'natalie.fournier@enfos.io',  'Legal Counsel',            'ACTIVE',   '2023-10-16', 'DEPT-010', '2023-10-16 09:00:00', '2025-11-30 09:00:00'),
-- Unassigned (2, no department)
('USR-1041', 'Oscar Lindgren',    'oscar.lindgren@enfos.io',    'Software Engineer',        'ACTIVE',   '2026-06-01', NULL,       '2026-06-01 09:00:00', '2026-08-09 16:00:00'),
('USR-1042', 'Priya Chandran',    'priya.chandran@enfos.io',    'Product Analyst',          'ACTIVE',   '2026-07-15', NULL,       '2026-07-15 09:00:00', '2026-08-08 10:00:00');

-- ============================================================
-- Projects (20) — distributed across departments, valid owner FK
-- ============================================================
INSERT INTO projects (id, name, department_id, owner_user_id, status, start_date, end_date, created_at, updated_at) VALUES
('PRJ-2001', 'Customer Portal Redesign',        'DEPT-001', 'USR-1003', 'IN_PROGRESS', '2025-01-15', NULL,         '2025-01-02 09:00:00', '2026-08-04 09:00:00'),
('PRJ-2002', 'Mobile App Performance Overhaul', 'DEPT-001', 'USR-1007', 'IN_PROGRESS', '2025-06-01', NULL,         '2025-05-20 09:00:00', '2026-07-29 09:00:00'),
('PRJ-2003', 'Internal Analytics Platform',     'DEPT-001', 'USR-1001', 'COMPLETED',   '2024-09-01', '2025-03-20', '2024-08-20 09:00:00', '2025-03-20 17:00:00'),
('PRJ-2004', 'API Gateway Migration',           'DEPT-001', 'USR-1004', 'PLANNED',     '2026-09-01', NULL,         '2026-07-18 09:00:00', '2026-07-18 09:00:00'),
('PRJ-2005', 'Q4 Product Roadmap Rollout',      'DEPT-002', 'USR-1010', 'IN_PROGRESS', '2025-10-01', NULL,         '2025-09-15 09:00:00', '2026-08-02 09:00:00'),
('PRJ-2006', 'Onboarding Flow Revamp',          'DEPT-002', 'USR-1011', 'COMPLETED',   '2024-11-10', '2025-05-02', '2024-10-28 09:00:00', '2025-05-02 16:00:00'),
('PRJ-2007', 'Pricing Experiment Suite',        'DEPT-002', 'USR-1012', 'ON_HOLD',     '2025-04-18', NULL,         '2025-04-05 09:00:00', '2025-11-01 09:00:00'),
('PRJ-2008', 'Design System 2.0',               'DEPT-003', 'USR-1015', 'IN_PROGRESS', '2025-02-20', NULL,         '2025-02-05 09:00:00', '2026-06-22 09:00:00'),
('PRJ-2009', 'Accessibility Audit',             'DEPT-003', 'USR-1017', 'COMPLETED',   '2024-08-05', '2024-12-19', '2024-07-25 09:00:00', '2024-12-19 15:00:00'),
('PRJ-2010', 'Brand Refresh',                   'DEPT-003', 'USR-1016', 'CANCELLED',   '2025-01-08', '2025-02-28', '2024-12-20 09:00:00', '2025-02-28 09:00:00'),
('PRJ-2011', 'Enterprise Sales Enablement',     'DEPT-004', 'USR-1019', 'IN_PROGRESS', '2025-07-01', NULL,         '2025-06-16 09:00:00', '2026-08-06 09:00:00'),
('PRJ-2012', 'CRM Data Cleanup',                'DEPT-004', 'USR-1020', 'COMPLETED',   '2024-10-15', '2025-01-30', '2024-10-01 09:00:00', '2025-01-30 09:00:00'),
('PRJ-2013', 'Regional Expansion - EMEA',       'DEPT-004', 'USR-1023', 'PLANNED',     '2026-10-01', NULL,         '2026-07-22 09:00:00', '2026-07-22 09:00:00'),
('PRJ-2014', 'Brand Campaign Relaunch',         'DEPT-005', 'USR-1025', 'IN_PROGRESS', '2025-05-12', NULL,         '2025-04-28 09:00:00', '2026-05-01 09:00:00'),
('PRJ-2015', 'Content Hub Migration',           'DEPT-005', 'USR-1026', 'COMPLETED',   '2024-07-22', '2024-11-30', '2024-07-10 09:00:00', '2024-11-30 09:00:00'),
('PRJ-2016', 'Employee Engagement Survey',      'DEPT-006', 'USR-1029', 'COMPLETED',   '2025-01-05', '2025-02-14', '2024-12-18 09:00:00', '2025-02-14 09:00:00'),
('PRJ-2017', 'Payroll System Migration',        'DEPT-007', 'USR-1031', 'ON_HOLD',     '2025-03-01', NULL,         '2025-02-14 09:00:00', '2025-09-19 09:00:00'),
('PRJ-2018', 'Customer Health Score Model',     'DEPT-008', 'USR-1034', 'IN_PROGRESS', '2025-08-01', NULL,         '2025-07-20 09:00:00', '2026-08-07 09:00:00'),
('PRJ-2019', 'Helpdesk Tooling Upgrade',        'DEPT-009', 'USR-1038', 'CANCELLED',   '2024-12-01', '2025-01-10', '2024-11-15 09:00:00', '2025-01-10 09:00:00'),
('PRJ-2020', 'Vendor Contract Review',          'DEPT-010', 'USR-1040', 'PLANNED',     '2026-11-15', NULL,         '2026-08-01 09:00:00', '2026-08-01 09:00:00');
