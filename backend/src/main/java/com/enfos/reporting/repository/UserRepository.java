package com.enfos.reporting.repository;

import com.enfos.reporting.dto.UserDto;
import com.enfos.reporting.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT new com.enfos.reporting.dto.UserDto(u.id, u.name, u.email, u.role, u.status, u.createdDate, d.name) " +
            "FROM User u LEFT JOIN u.department d " +
            "ORDER BY u.id")
    List<UserDto> findAllReportRows();

    @Query("SELECT MAX(u.updatedAt) FROM User u")
    Instant findMaxUpdatedAt();
}
