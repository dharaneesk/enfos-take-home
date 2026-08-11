package com.enfos.reporting.repository;

import com.enfos.reporting.dto.ProjectDto;
import com.enfos.reporting.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.Instant;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, String> {

    @Query("SELECT new com.enfos.reporting.dto.ProjectDto(" +
            "p.id, p.name, d.name, d.id, o.name, o.id, p.status, p.startDate, p.endDate, NULL) " +
            "FROM Project p JOIN p.department d JOIN p.owner o " +
            "ORDER BY p.id")
    List<ProjectDto> findAllReportRows();

    @Query("SELECT p.id, m.id FROM Project p JOIN p.members m")
    List<Object[]> findMemberPairs();

    @Query("SELECT MAX(p.updatedAt) FROM Project p")
    Instant findMaxUpdatedAt();
}
