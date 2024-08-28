package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.HealthcareProviders;
import com.LifeConnect.ElderlyCareSystem.repository.HealthcareProvidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HealthcareProvidersServiceImpi implements HealthcareProvidersService{

    @Autowired
    private HealthcareProvidersRepository HProviderRepo;

    @Override
    public HealthcareProviders saveHProviders(HealthcareProviders Hproviders) {
        return HProviderRepo.save(Hproviders);
    }

    @Override
    public boolean doesEmailExist(String email) {
        return HProviderRepo.existsByEmail(email);
    }
}
