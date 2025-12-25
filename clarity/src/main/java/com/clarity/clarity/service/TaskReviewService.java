package com.clarity.clarity.service;

import com.clarity.clarity.domain.Task;
import com.clarity.clarity.domain.TaskStatus;
import com.clarity.clarity.repository.TaskRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskReviewService {

    private final TaskRepository taskRepository;

    @Transactional
    public void reviewOverdueTasks() {

        List<Task> overdueTasks =
                taskRepository.findOverdueTasksForReview(
                        LocalDateTime.now(),
                        List.of(TaskStatus.READY, TaskStatus.IN_PROGRESS)
                );

        for (Task task : overdueTasks) {

            if (task.getStatus() == TaskStatus.READY) {
                task.setStatus(TaskStatus.SKIPPED);
            } else if (task.getStatus() == TaskStatus.IN_PROGRESS) {
                task.setNeedsReview(true);
            }
        }

        taskRepository.saveAll(overdueTasks);
    }
}
