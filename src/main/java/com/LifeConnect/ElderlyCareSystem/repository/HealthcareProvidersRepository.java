package com.LifeConnect.ElderlyCareSystem.repository;

import com.LifeConnect.ElderlyCareSystem.model.HealthcareProviders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HealthcareProvidersRepository extends JpaRepository<HealthcareProviders,String>{
    boolean existsByEmail(String email);
}
