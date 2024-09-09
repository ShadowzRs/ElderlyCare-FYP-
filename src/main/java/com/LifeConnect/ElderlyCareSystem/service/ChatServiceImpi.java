package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.Chat;
import com.LifeConnect.ElderlyCareSystem.model.Message;
import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.repository.ChatRepository;
import com.LifeConnect.ElderlyCareSystem.repository.ElderlyRepository;
import com.LifeConnect.ElderlyCareSystem.repository.HealthcareProvidersRepository;
import com.LifeConnect.ElderlyCareSystem.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpi implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private ElderlyRepository elderlyRepo;

    @Autowired
    private HealthcareProvidersRepository HProviderRepo;

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Chat createChat(String participantOneId, String participantTwoId) {
        // Fetch user entities by ID
        ElderlyUser participantOne = elderlyRepo.findById(participantOneId).orElse(null);
        HealthcareProvider participantTwo = HProviderRepo.findById(participantTwoId).orElse(null);

        // Create and save a new chat
        Chat chat = new Chat();
        chat.setParticipantOneId(participantOneId);
        chat.setParticipantTwoId(participantTwoId);
        return chatRepository.save(chat);
    }

    @Override
    public List<Chat> getAllChatsForUser(String userId) {
        return chatRepository.findByParticipantOneIdOrParticipantTwoId(userId, userId);
    }

    @Override
    public Optional<Chat> getChatByParticipants(String participantOneId, String participantTwoId) {
        return chatRepository.findByParticipantOneIdAndParticipantTwoId(participantOneId, participantTwoId);
    }

    @Override
    public void sendMessage(Long chatId, String senderId, String receiverId, String text) {
        // Fetch the chat entity by ID
        Chat chat = chatRepository.findById(chatId).orElse(null);
        if (chat == null) {
            throw new IllegalArgumentException("Chat not found");
        }

        // Create and save a new message
        Message message = new Message();
        message.setChat(chat);
        message.setSenderId(senderId);
        message.setReceiverId(receiverId);
        message.setText(text);
        messageRepository.save(message);
    }

    @Override
    public List<Message> getMessages(Long chatId) {
        return messageRepository.findByChatId(chatId);
    }

    @Override
    public List<Message> getMessages(String senderId, String receiverId) {
        return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }
}
