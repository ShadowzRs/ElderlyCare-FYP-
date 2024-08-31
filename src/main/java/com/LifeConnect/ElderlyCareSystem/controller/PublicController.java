package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.service.PublicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
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
}
