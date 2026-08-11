package com.enfos.reporting.controller;

import com.enfos.reporting.dto.DepartmentDto;
import com.enfos.reporting.dto.ProjectDto;
import com.enfos.reporting.dto.ReportMetadataDto;
import com.enfos.reporting.dto.UserDto;
import com.enfos.reporting.service.ReportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public List<ReportMetadataDto> getReports() {
        return reportService.getReportsMetadata();
    }

    @GetMapping("/users")
    public List<UserDto> getUsers() {
        return reportService.getUsers();
    }

    @GetMapping("/departments")
    public List<DepartmentDto> getDepartments() {
        return reportService.getDepartments();
    }

    @GetMapping("/projects")
    public List<ProjectDto> getProjects() {
        return reportService.getProjects();
    }
}
