package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.model.HealthcareProviders;
import com.LifeConnect.ElderlyCareSystem.service.HealthcareProvidersService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String add(@RequestBody HealthcareProviders Hproviders){
        HProviderService.saveHProviders(Hproviders);
        return "New HealthcareProvider User is Added";
    }
}
