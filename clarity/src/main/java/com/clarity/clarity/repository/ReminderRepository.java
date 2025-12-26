package com.clarity.clarity.repository;

import com.clarity.clarity.entity.Reminder;
import com.clarity.clarity.domain.ReminderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {

    List<Reminder> findByStatusAndRemindAtBefore(
            ReminderStatus status,
            LocalDateTime now
    );
}

