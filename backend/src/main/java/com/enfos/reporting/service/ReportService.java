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
import java.util.Map;
import java.util.stream.Collectors;

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
        Map<String, List<String>> memberIdsByProject = projectRepository.findMemberPairs().stream()
                .collect(Collectors.groupingBy(
                        pair -> (String) pair[0],
                        Collectors.mapping(pair -> (String) pair[1], Collectors.toList())
                ));

        return projectRepository.findAllReportRows().stream()
                .map(row -> new ProjectDto(
                        row.id(),
                        row.name(),
                        row.department(),
                        row.departmentId(),
                        row.owner(),
                        row.ownerId(),
                        row.status(),
                        row.startDate(),
                        row.endDate(),
                        memberIdsByProject.getOrDefault(row.id(), List.of())
                ))
                .toList();
    }
}
