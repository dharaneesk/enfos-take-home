package com.enfos.reporting.dto;

import com.enfos.reporting.entity.ProjectStatus;

import java.time.LocalDate;

public record ProjectDto(
        String id,
        String name,
        String department,
        String owner,
        ProjectStatus status,
        LocalDate startDate,
        LocalDate endDate
) {
}
