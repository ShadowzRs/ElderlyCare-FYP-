package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.repository.ElderlyRepository;
import com.LifeConnect.ElderlyCareSystem.repository.HealthcareProvidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PublicServiceImpi implements PublicService {

    @Autowired
    private ElderlyRepository elderlyRepo;

    @Autowired
    private HealthcareProvidersRepository HProviderRepo;

    @Override
    public boolean doesEmailExist(String email) {
        boolean emailExistsInElderly = elderlyRepo.existsByEmail(email);
        boolean emailExistsInHealthcareProvider = HProviderRepo.existsByEmail(email);
        return emailExistsInElderly || emailExistsInHealthcareProvider;
    }

    public Object getUserById(String userId) {
        // Try to find the user in the ElderlyRepository
        Optional<ElderlyUser> elderlyUser = elderlyRepo.findById(userId);
        if (elderlyUser.isPresent()) {
            return elderlyUser.get();
        }

        // If not found, try to find the user in the HealthcareProvidersRepository
        Optional<HealthcareProvider> hProvider = HProviderRepo.findById(userId);
        return hProvider.orElse(null);
    }
}
