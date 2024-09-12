package com.LifeConnect.ElderlyCareSystem.dto;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PayloadParser {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static JsonNode parsePayload(String payload) {
        try {
            return mapper.readTree(payload);
        } catch (Exception e) {
            e.printStackTrace();
            return null; // Return null or handle exception appropriately
        }
    }

    // Method to get chatId
    public static long getChatId(String payload) {
        JsonNode jsonNode = parsePayload(payload);
        return jsonNode != null ? jsonNode.get("chatId").asLong() : -1;
    }

    // Method to get senderId
    public static String getSenderId(String payload) {
        JsonNode jsonNode = parsePayload(payload);
        return jsonNode != null ? jsonNode.get("senderId").asText() : null;
    }

    // Method to get text
    public static String getText(String payload) {
        JsonNode jsonNode = parsePayload(payload);
        return jsonNode != null ? jsonNode.get("text").asText() : null;
    }

    public static String receiverId(String payload) {
        JsonNode jsonNode = parsePayload(payload);
        return jsonNode != null ? jsonNode.get("receiverId").asText() : null;
    }


}

