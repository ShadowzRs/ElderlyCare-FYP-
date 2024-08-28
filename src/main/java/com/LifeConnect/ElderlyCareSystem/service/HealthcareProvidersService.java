package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.HealthcareProviders;

public interface HealthcareProvidersService {
    public HealthcareProviders saveHProviders(HealthcareProviders Hproviders);
    public boolean doesEmailExist(String email);

}
