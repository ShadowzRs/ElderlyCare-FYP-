package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.service.AIChatServiceImpi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AIChatController {

    @Autowired
    private AIChatServiceImpi aiService;

    @GetMapping("/Ollama/generate")
    public String generate(@RequestParam(value = "promptMessage") String promptMessage) {
        return aiService.generateResult(promptMessage);
    }
}
