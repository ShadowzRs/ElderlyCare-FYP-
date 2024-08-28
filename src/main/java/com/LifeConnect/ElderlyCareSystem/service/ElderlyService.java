package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;

public interface ElderlyService {
    public ElderlyUser saveElderly(ElderlyUser elderlyUser);
    public boolean doesEmailExist(String email);

}
