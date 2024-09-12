package com.LifeConnect.ElderlyCareSystem.service;

public interface PublicService {
    boolean doesEmailExist(String email);
    Object getUserById(String userId);
}
