package com.enfos.reporting.repository;

import com.enfos.reporting.dto.DepartmentDto;
import com.enfos.reporting.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, String> {

    @Query("SELECT new com.enfos.reporting.dto.DepartmentDto(d.id, d.name, m.name, m.id, COUNT(u.id), d.location) " +
            "FROM Department d LEFT JOIN d.manager m LEFT JOIN User u ON u.department = d " +
            "GROUP BY d.id, d.name, m.name, m.id, d.location " +
            "ORDER BY d.id")
    List<DepartmentDto> findAllReportRows();

    @Query("SELECT MAX(d.updatedAt) FROM Department d")
    Instant findMaxUpdatedAt();
}
