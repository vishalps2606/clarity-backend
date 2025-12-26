package com.clarity.clarity.repository;

import com.clarity.clarity.domain.TimeBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TimeBlockRepository extends JpaRepository<TimeBlock, Long> {

    @Query(
            value = """
        SELECT COALESCE(
          SUM(EXTRACT(EPOCH FROM (end_time - start_time)) / 60),
          0
        )
        FROM time_blocks
        WHERE DATE(start_time) = :date
      """,
            nativeQuery = true
    )
    long totalMinutesBookedForDate(@Param("date") LocalDate date);
}

