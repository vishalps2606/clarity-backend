package com.clarity.clarity.scheduler;

import com.clarity.clarity.entity.Reminder;
import com.clarity.clarity.domain.ReminderStatus;
import com.clarity.clarity.repository.ReminderRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class ReminderScheduler {

    private final ReminderRepository reminderRepository;

    @Scheduled(fixedRate = 60_000) // every 1 minute
    @Transactional
    public void processReminders() {

        LocalDateTime now = LocalDateTime.now();

        List<Reminder> dueReminders =
                reminderRepository.findByStatusAndRemindAtBefore(
                        ReminderStatus.PENDING, now);

        if (dueReminders.isEmpty()) {
            return;
        }

        for (Reminder reminder : dueReminders) {
            executeReminder(reminder);
        }
    }

    private void executeReminder(Reminder reminder) {
        // V1 execution: just log
        log.info(
                "🔔 REMINDER FIRED | TaskId={} | Title={} | Due={}",
                reminder.getTask().getId(),
                reminder.getTask().getTitle(),
                reminder.getTask().getDueDatetime()
        );

        reminder.setStatus(ReminderStatus.SENT);
    }
}