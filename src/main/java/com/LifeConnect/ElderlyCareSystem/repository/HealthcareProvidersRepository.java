package com.LifeConnect.ElderlyCareSystem.repository;

import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthcareProvidersRepository extends JpaRepository<HealthcareProvider,String>{
    boolean existsByEmail(String email);
    HealthcareProvider findByEmail(String email);
}
