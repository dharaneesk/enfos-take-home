package com.enfos.reporting.dto;

public record DepartmentDto(
        String id,
        String name,
        String manager,
        String managerId,
        long employeeCount,
        String location
) {
}
