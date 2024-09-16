package com.LifeConnect.ElderlyCareSystem.service;

import java.util.List;

public interface PublicService {
    boolean doesEmailExist(String email);
    Object getUserById(String userId);
    List<Object> searchUsers(String query);
    String checkIfChatExists(String participantOneId, String participantTwoId);
}
