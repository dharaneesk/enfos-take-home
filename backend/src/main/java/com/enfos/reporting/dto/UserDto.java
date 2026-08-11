package com.enfos.reporting.dto;

import com.enfos.reporting.entity.UserStatus;

import java.time.LocalDate;

public record UserDto(
        String id,
        String name,
        String email,
        String role,
        UserStatus status,
        LocalDate createdDate,
        String department
) {
}
