package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.MedicalHistory;

import java.util.List;

public interface MedicalHistoryService {
    List<MedicalHistory> getAllByElderlyUserId(String elderlyUserId);
    MedicalHistory saveMedicalHistory(MedicalHistory medicalHistory);
}
