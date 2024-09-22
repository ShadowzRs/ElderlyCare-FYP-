package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.MedicalHistory;
import com.LifeConnect.ElderlyCareSystem.repository.MedicalHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalHistoryServiceImpi implements MedicalHistoryService{

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Override
    public List<MedicalHistory> getAllByElderlyUserId(String elderlyUserId) {
        return medicalHistoryRepository.findByElderlyUserId(elderlyUserId);
    }

    @Override
    public MedicalHistory saveMedicalHistory(MedicalHistory medicalHistory) {
        return medicalHistoryRepository.save(medicalHistory);
    }
}
