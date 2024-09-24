package com.LifeConnect.ElderlyCareSystem.repository;

import com.LifeConnect.ElderlyCareSystem.model.MedicalAllergy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicalAllergyRepository extends JpaRepository<MedicalAllergy, Long>{
    MedicalAllergy findByElderlyUserId(String elderlyUserId);
}
