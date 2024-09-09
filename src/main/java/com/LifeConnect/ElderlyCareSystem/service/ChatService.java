package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.Chat;
import com.LifeConnect.ElderlyCareSystem.model.Message;

import java.util.List;
import java.util.Optional;

public interface ChatService {
    Chat createChat(String participantOneId, String participantTwoId);
    List<Chat> getAllChatsForUser(String userId);
    Optional<Chat> getChatByParticipants(String participantOneId, String participantTwoId);
    void sendMessage(Long chatId, String senderId, String receiverId, String text);
    List<Message> getMessages(Long chatId);
    List<Message> getMessages(String senderId, String receiverId);
}
