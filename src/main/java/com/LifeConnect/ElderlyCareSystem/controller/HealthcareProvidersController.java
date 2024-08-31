package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.service.HealthcareProvidersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/healthcareprovider")
@CrossOrigin
public class HealthcareProvidersController {

    @Autowired
    private HealthcareProvidersService HProviderService;

    @PostMapping("/add")
    public String add(@RequestBody HealthcareProvider Hproviders){
        HProviderService.saveHProviders(Hproviders);
        return "New HealthcareProvider User is Added";
    }
}
