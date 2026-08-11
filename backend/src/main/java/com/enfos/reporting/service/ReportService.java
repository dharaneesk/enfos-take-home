package com.enfos.reporting.service;

import com.enfos.reporting.dto.DepartmentDto;
import com.enfos.reporting.dto.ProjectDto;
import com.enfos.reporting.dto.ReportMetadataDto;
import com.enfos.reporting.dto.UserDto;
import com.enfos.reporting.repository.DepartmentRepository;
import com.enfos.reporting.repository.ProjectRepository;
import com.enfos.reporting.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ReportService {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;

    public ReportService(UserRepository userRepository,
                          DepartmentRepository departmentRepository,
                          ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.projectRepository = projectRepository;
    }

    public List<ReportMetadataDto> getReportsMetadata() {
        return List.of(
                new ReportMetadataDto(
                        "users",
                        "Users",
                        "All employees across the organization, with role, status, and department assignment.",
                        "/api/reports/users",
                        userRepository.count(),
                        userRepository.findMaxUpdatedAt()
                ),
                new ReportMetadataDto(
                        "departments",
                        "Departments",
                        "Organizational departments with manager, location, and live headcount.",
                        "/api/reports/departments",
                        departmentRepository.count(),
                        departmentRepository.findMaxUpdatedAt()
                ),
                new ReportMetadataDto(
                        "projects",
                        "Projects",
                        "Active and historical projects with owner, department, and status.",
                        "/api/reports/projects",
                        projectRepository.count(),
                        projectRepository.findMaxUpdatedAt()
                )
        );
    }

    public List<UserDto> getUsers() {
        return userRepository.findAllReportRows();
    }

    public List<DepartmentDto> getDepartments() {
        return departmentRepository.findAllReportRows();
    }

    public List<ProjectDto> getProjects() {
        return projectRepository.findAllReportRows();
    }
}
