package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.dto.LoginRequest;
import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.service.HealthcareProvidersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/healthcareprovider")
@CrossOrigin
public class HealthcareProvidersController {

    @Autowired
    private HealthcareProvidersService HProviderService;

    @PostMapping("/add")
    public String add(@RequestBody HealthcareProvider Hproviders) {
        HProviderService.saveHProviders(Hproviders);
        return "New HealthcareProvider User is Added";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        String role = HProviderService.HProv_authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        Map<String, String> response = new HashMap<>();

        if (role != null) {
            response.put("authenticated", "true");
            response.put("role", role); // Add the role to the response
            return ResponseEntity.ok(response);
        } else {
            response.put("authenticated", "false");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
