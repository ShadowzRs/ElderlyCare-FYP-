package com.LifeConnect.ElderlyCareSystem.handler;

import com.LifeConnect.ElderlyCareSystem.dto.PayloadParser;
import com.LifeConnect.ElderlyCareSystem.service.ChatService;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ChatWebSocketHandler  extends TextWebSocketHandler{

    @Autowired
    private final ChatService chatService;

    // A map to store chat rooms with their sessions
    private final Map<String, Map<String, WebSocketSession>> chatSessions;

    public ChatWebSocketHandler(ChatService chatService, Map<String, Map<String, WebSocketSession>> chatSessions) {
        this.chatService = chatService;
        this.chatSessions = chatSessions;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String chatId = (String) session.getAttributes().get("chatId");
        System.out.println("Received message: " + message.getPayload() + " for chatId: " + chatId);

        JsonNode jsonNode = PayloadParser.parsePayload(message.getPayload());

        if (jsonNode != null) {
            // Extract specific attributes from the payload
            String senderId = jsonNode.get("senderId").asText();
            String receiverId = jsonNode.get("receiverId").asText();
            String text = jsonNode.get("text").asText();

            // Broadcast the message to all participants in the chat room
            Map<String, WebSocketSession> sessions = chatSessions.get(chatId);
            if (sessions != null) {
                chatService.sendMessage(Long.parseLong(chatId), senderId, receiverId, text);
                for (WebSocketSession s : sessions.values()) {
                    s.sendMessage(message);  // Send the message to all participants
                }
            }
        } else {
            System.out.println("Failed to parse the message payload.");
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String chatId = (String) session.getAttributes().get("chatId");
        chatSessions.computeIfAbsent(chatId, k -> new ConcurrentHashMap<>()).put(session.getId(), session);
        System.out.println("WebSocket connection opened for chatId: " + chatId);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, org.springframework.web.socket.CloseStatus status) throws Exception {
        String chatId = (String) session.getAttributes().get("chatId");
        Map<String, WebSocketSession> sessions = chatSessions.get(chatId);
        if (sessions != null) {
            sessions.remove(session.getId());
            if (sessions.isEmpty()) {
                chatSessions.remove(chatId);
            }
        }
        System.out.println("WebSocket connection closed for chatId: " + chatId);
    }
}
