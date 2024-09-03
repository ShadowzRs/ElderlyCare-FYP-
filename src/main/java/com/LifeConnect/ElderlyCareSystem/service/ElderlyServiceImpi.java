package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.repository.ElderlyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ElderlyServiceImpi implements ElderlyService {

    @Autowired
    private ElderlyRepository elderlyRepo;

    @Override
    public ElderlyUser saveElderly(ElderlyUser elderly) {
        return elderlyRepo.save(elderly);
    }

    @Override
    public boolean Elderly_authenticateUser(String email, String password) {
        ElderlyUser elderlyUser = elderlyRepo.findByEmail(email);
        if (elderlyUser != null) {
            return password.equals(elderlyUser.getPassword());
        }
        return false; // Return false cuz not found
    }
}
