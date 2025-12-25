package com.clarity.clarity.repository;

import com.clarity.clarity.domain.TimeBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TimeBlockRepository extends JpaRepository<TimeBlock, Long> {

    @Query("""
        SELECT COALESCE(SUM(
            EXTRACT(EPOCH FROM (tb.endTime - tb.startTime)) / 60
        ), 0)
        FROM TimeBlock tb
        WHERE DATE(tb.startTime) = :date
    """)
    long totalMinutesBookedForDate(LocalDate date);
}

