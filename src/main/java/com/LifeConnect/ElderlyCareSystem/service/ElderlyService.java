package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;

public interface ElderlyService {
    ElderlyUser saveElderly(ElderlyUser elderlyUser);
    String Elderly_authenticateUser(String email, String password);
}
