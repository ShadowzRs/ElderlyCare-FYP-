package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.model.MedicalAllergy;
import com.LifeConnect.ElderlyCareSystem.service.MedicalAllergyService;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medical-allergies")
@CrossOrigin
public class MedicalAllergyController {

    @Autowired
    private MedicalAllergyService medicalAllergyService;

    @PostMapping("/create")
    public ResponseEntity<MedicalAllergy> createAllergy(@RequestBody MedicalAllergy medicalAllergy) {
        MedicalAllergy savedAllergy = medicalAllergyService.save(medicalAllergy);
        return ResponseEntity.ok(savedAllergy);
    }

    @GetMapping("/{elderlyUserId}")
    public ResponseEntity<MedicalAllergy> getAllergiesByElderlyId(@PathVariable String elderlyUserId) {
        MedicalAllergy allergies = medicalAllergyService.findByElderlyId(elderlyUserId);
        return ResponseEntity.ok(allergies);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MedicalAllergy> updateAllergy(
            @PathVariable Long id, @RequestBody MedicalAllergy medicalAllergy) {
        medicalAllergy.setId(id); // Ensure the ID is set for the update
        MedicalAllergy updatedAllergy = medicalAllergyService.update(medicalAllergy);
        return ResponseEntity.ok(updatedAllergy);
    }
}
