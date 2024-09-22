package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.model.MedicalHistory;
import com.LifeConnect.ElderlyCareSystem.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-history")
@CrossOrigin
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @PostMapping("/create")
    public ResponseEntity<MedicalHistory> createMedicalHistory(@RequestBody MedicalHistory medicalHistory) {
        MedicalHistory createdHistory = medicalHistoryService.saveMedicalHistory(medicalHistory);
        return ResponseEntity.ok(createdHistory);
    }

    @GetMapping("/{elderlyUserId}")
    public ResponseEntity<List<MedicalHistory>> getMedicalHistories(@PathVariable String elderlyUserId) {
        List<MedicalHistory> histories = medicalHistoryService.getAllByElderlyUserId(elderlyUserId);
        return ResponseEntity.ok(histories);
    }
}
