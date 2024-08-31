package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.repository.HealthcareProvidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HealthcareProvidersServiceImpi implements HealthcareProvidersService{

    @Autowired
    private HealthcareProvidersRepository HProviderRepo;

    @Override
    public HealthcareProvider saveHProviders(HealthcareProvider Hproviders) {
        return HProviderRepo.save(Hproviders);
    }
}
