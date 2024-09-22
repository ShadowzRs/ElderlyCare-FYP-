package com.LifeConnect.ElderlyCareSystem.model;

import jakarta.persistence.*;

@Entity
public class MedicalAllergy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "elderly_user_id", nullable = false)
    private ElderlyUser elderlyUser;

    private String medicationAllergies;
    private String foodAllergies;
    private String environmentalAllergies;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ElderlyUser getElderlyUser() {
        return elderlyUser;
    }

    public void setElderlyUser(ElderlyUser elderlyUser) {
        this.elderlyUser = elderlyUser;
    }

    public String getMedicationAllergies() {
        return medicationAllergies;
    }

    public void setMedicationAllergies(String medicationAllergies) {
        this.medicationAllergies = medicationAllergies;
    }

    public String getFoodAllergies() {
        return foodAllergies;
    }

    public void setFoodAllergies(String foodAllergies) {
        this.foodAllergies = foodAllergies;
    }

    public String getEnvironmentalAllergies() {
        return environmentalAllergies;
    }

    public void setEnvironmentalAllergies(String environmentalAllergies) {
        this.environmentalAllergies = environmentalAllergies;
    }
}
