package com.clarity.clarity.service;

import com.clarity.clarity.dto.request.RegisterRequest;
import com.clarity.clarity.entity.User;
import com.clarity.clarity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = new User();
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setRole("USER");

        user.setPassword(passwordEncoder.encode(request.password()));

        return userRepository.save(user);
    }
}