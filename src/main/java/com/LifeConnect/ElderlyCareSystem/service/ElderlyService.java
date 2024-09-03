package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;

public interface ElderlyService {
    ElderlyUser saveElderly(ElderlyUser elderlyUser);
    boolean Elderly_authenticateUser(String email, String password);
}
