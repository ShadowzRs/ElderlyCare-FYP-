package com.LifeConnect.ElderlyCareSystem.service;

import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.api.OllamaOptions;

@Service
public class AIChatService {

    @Autowired
    private OllamaChatModel chatModel;

    public String generateResult(String prompt){
        ChatResponse response = chatModel.call(
                new Prompt(
                        prompt,
                        OllamaOptions.create()
                                .withModel("llama3.1")
                ));
        return response.getResult().getOutput().getContent();
    }
}
