package com.clarity.clarity.controller;

import com.clarity.clarity.domain.Task;
import com.clarity.clarity.dto.TaskStatusUpdateRequest;
import com.clarity.clarity.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {

    private TaskRepository taskRepository;

//    @PatchMapping("/tasks/{id}/status")
//    public void updateStatus(
//            @PathVariable Long id,
//            @RequestBody TaskStatusUpdateRequest request
//    ) {
//        taskService.updateStatus(id, request.getStatus());
//    }

    @GetMapping("/tasks/review")
    public List<Task> getTaskNeedingReview() {
        return taskRepository.findByNeedsReviewTrue();
    }
}
