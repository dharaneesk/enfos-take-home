package com.enfos.reporting.dto;

import com.enfos.reporting.entity.ProjectStatus;

import java.time.LocalDate;
import java.util.List;

public record ProjectDto(
        String id,
        String name,
        String department,
        String departmentId,
        String owner,
        String ownerId,
        ProjectStatus status,
        LocalDate startDate,
        LocalDate endDate,
        List<String> memberIds
) {
}
