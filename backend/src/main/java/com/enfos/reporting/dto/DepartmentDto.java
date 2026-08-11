package com.enfos.reporting.dto;

public record DepartmentDto(
        String id,
        String name,
        String manager,
        long employeeCount,
        String location
) {
}
