package com.clarity.clarity.service;

import com.clarity.clarity.domain.Task;
import com.clarity.clarity.domain.TimeBlock;
import com.clarity.clarity.dto.TimeBlockRequest;
import com.clarity.clarity.repository.TaskRepository;
import com.clarity.clarity.repository.TimeBlockRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TimeBlockService {

    private static final int DAILY_LIMIT_MINUTES = 8 * 60;

    private final TimeBlockRepository timeBlockRepository;
    private final TaskRepository taskRepository;

    @Transactional
    public void createTimeBlock(Long taskId, TimeBlockRequest request) {

        if (request.endTime().isBefore(request.startTime())) {
            throw new IllegalArgumentException("Invalid time range");
        }

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        LocalDate date = request.startTime().toLocalDate();

        long alreadyBooked =
                timeBlockRepository.totalMinutesBookedForDate(date);

        long requested =
                Duration.between(request.startTime(), request.endTime()).toMinutes();

        if (alreadyBooked + requested > DAILY_LIMIT_MINUTES) {
            throw new IllegalStateException("Day overbooked");
        }

        TimeBlock tb = new TimeBlock();
        tb.setTask(task);
        tb.setStartTime(request.startTime());
        tb.setEndTime(request.endTime());

        timeBlockRepository.save(tb);
    }
}

