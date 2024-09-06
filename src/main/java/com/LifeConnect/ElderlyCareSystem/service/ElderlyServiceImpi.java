package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.repository.ElderlyRepository;
import com.LifeConnect.ElderlyCareSystem.util.PasswordHasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public class ElderlyServiceImpi implements ElderlyService {

    @Autowired
    private ElderlyRepository elderlyRepo;

    @Override
    public ElderlyUser saveElderly(ElderlyUser elderly) {
        try {
            String hashedPassword = PasswordHasher.hashPassword(elderly.getPassword());
            elderly.setPassword(hashedPassword);  // Set hashed password
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();  // Handle the exception
        }
        return elderlyRepo.save(elderly);
    }

    @Override
    public boolean Elderly_authenticateUser(String email, String password) {
        ElderlyUser elderlyUser = elderlyRepo.findByEmail(email);
        if (elderlyUser != null) {
            try {
                // Compare the hashed password with the stored hashed password
                String hashedPassword = PasswordHasher.hashPassword(password);
                return hashedPassword.equals(elderlyUser.getPassword());
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();  // Handle the exception properly
            }
        }
        return false; // Return false cuz not found
    }
}
