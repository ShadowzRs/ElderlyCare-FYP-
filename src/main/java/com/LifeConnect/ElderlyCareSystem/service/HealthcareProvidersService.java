package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.dto.AuthResponse;
import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;

public interface HealthcareProvidersService {
    HealthcareProvider saveHProviders(HealthcareProvider Hproviders);
    AuthResponse HProv_authenticateUser(String email, String password);
}
