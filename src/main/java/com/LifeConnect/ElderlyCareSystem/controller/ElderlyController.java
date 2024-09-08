package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.dto.LoginRequest;
import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.service.ElderlyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/elderly")
@CrossOrigin
public class ElderlyController {
    @Autowired
    private ElderlyService elderlyService;

    @PostMapping("/add")
    public String add(@RequestBody ElderlyUser elderly){
        elderlyService.saveElderly(elderly);
        return "New Elderly User is Added";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        String id = elderlyService.Elderly_authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        Map<String, String> response = new HashMap<>();

        if (id != null) {
            response.put("authenticated", "true");
            response.put("id", id);
            return ResponseEntity.ok(response);
        } else {
            response.put("authenticated", "false");  // Put String value
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
