package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.model.Chat;
import com.LifeConnect.ElderlyCareSystem.model.Message;
import com.LifeConnect.ElderlyCareSystem.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;


    @PostMapping("/create")
    public Chat createChat(@RequestParam String participantOneId, @RequestParam String participantTwoId) {
        return chatService.createChat(participantOneId, participantTwoId);
    }

    @GetMapping("/by-participants")
    public Optional<Chat> getChatByParticipants(@RequestParam String participantOneId, @RequestParam String participantTwoId) {
        return chatService.getChatByParticipants(participantOneId, participantTwoId);
    }

    @PostMapping("/{chatId}/send")
    public void sendMessage(@PathVariable Long chatId, @RequestParam String senderId, @RequestParam String receiverId, @RequestParam String text) {
        chatService.sendMessage(chatId, senderId, receiverId, text);
    }

    @GetMapping("/{chatId}/messages")
    public List<Message> getMessages(@PathVariable Long chatId) {
        return chatService.getMessages(chatId);
    }

    @GetMapping("/messages")
    public List<Message> getMessagesBetween(@RequestParam String senderId, @RequestParam String receiverId) {
        return chatService.getMessages(senderId, receiverId);
    }
}
