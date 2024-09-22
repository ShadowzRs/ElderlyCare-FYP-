package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.MedicalAllergy;
import com.LifeConnect.ElderlyCareSystem.repository.MedicalAllergyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MedicalAllergyServiceimpi implements MedicalAllergyService{

    @Autowired
    private MedicalAllergyRepository medicalAllergyRepository;

    // Save a new MedicalAllergy entry
    @Override
    public MedicalAllergy save(MedicalAllergy medicalAllergy) {
        return medicalAllergyRepository.save(medicalAllergy);
    }

    // Retrieve MedicalAllergy by elderly ID
    @Override
    public MedicalAllergy findByElderlyId(String elderlyId) {
        return medicalAllergyRepository.findByElderlyUserId(elderlyId);
    }

    // Update an existing MedicalAllergy entry
    @Override
    public MedicalAllergy update(MedicalAllergy medicalAllergy) {
        return medicalAllergyRepository.save(medicalAllergy);
    }
}
