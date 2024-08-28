package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.service.ElderlyService;
import org.springframework.beans.factory.annotation.Autowired;
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
    }
