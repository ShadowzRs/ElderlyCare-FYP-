package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.service.PublicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class PublicController {
    @Autowired
    private PublicService publicService;

    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmail(@RequestParam("email") String email) {
        // Check if the email exists in the Elderly or Healthcare Providers repositories
        boolean emailExists = publicService.doesEmailExist(email);

        // Prepare the response
        Map<String, Boolean> response = new HashMap<>();
        response.put("exists", emailExists);

        // Return the response entity
        return ResponseEntity.ok(response);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable String userId) {
        Object user = publicService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/users")
    public List<Object> searchUsers(@RequestParam String search) {
        return publicService.searchUsers(search);
    }

    @GetMapping("/chats/check")
    public boolean checkChatExists(@RequestParam String userId1, @RequestParam String userId2) {
        return publicService.checkIfChatExists(userId1, userId2);
    }
}
