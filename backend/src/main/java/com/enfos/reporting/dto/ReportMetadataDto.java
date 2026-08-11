package com.enfos.reporting.dto;

import java.time.Instant;

public record ReportMetadataDto(
        String id,
        String name,
        String description,
        String endpoint,
        long rowCount,
        Instant lastUpdated
) {
}
