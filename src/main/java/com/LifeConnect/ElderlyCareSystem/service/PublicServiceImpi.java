package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.repository.ElderlyRepository;
import com.LifeConnect.ElderlyCareSystem.repository.HealthcareProvidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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



}
