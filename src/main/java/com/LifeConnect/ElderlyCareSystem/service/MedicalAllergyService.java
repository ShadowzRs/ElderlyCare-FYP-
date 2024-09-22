package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.MedicalAllergy;

public interface MedicalAllergyService {
    MedicalAllergy save(MedicalAllergy medicalAllergy);
    MedicalAllergy findByElderlyId(String elderlyId);
    MedicalAllergy update(MedicalAllergy medicalAllergy);
}
