package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;

import java.util.List;

public interface ElderlyService {
    ElderlyUser saveElderly(ElderlyUser elderlyUser);
    String Elderly_authenticateUser(String email, String password);
    List<ElderlyUser> searchElderlyUsersOnly(String query);
}
