package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.repository.HealthcareProvidersRepository;
import com.LifeConnect.ElderlyCareSystem.util.PasswordHasher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
public class HealthcareProvidersServiceImpi implements HealthcareProvidersService {

    @Autowired
    private HealthcareProvidersRepository HProviderRepo;

    @Override
    public HealthcareProvider saveHProviders(HealthcareProvider hProviders) {
        try {
            // Hash the password before saving
            String hashedPassword = PasswordHasher.hashPassword(hProviders.getPassword());
            hProviders.setPassword(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();  // Handle the exception
        }
        return HProviderRepo.save(hProviders);
    }


    @Override
    public String HProv_authenticateUser(String email, String password) {
        HealthcareProvider healthcareProvider = HProviderRepo.findByEmail(email);

        if (healthcareProvider != null) {
            try {
                String hashedPassword = PasswordHasher.hashPassword(password);
                // Compare the hashed password with the stored hashed password
                if (hashedPassword.equals(healthcareProvider.getPassword())) {
                    return healthcareProvider.getRole();
                }
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}
