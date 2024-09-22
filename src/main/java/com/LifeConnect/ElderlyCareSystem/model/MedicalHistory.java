package com.LifeConnect.ElderlyCareSystem.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class MedicalHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for medical history entries

    @ManyToOne
    @JoinColumn(name = "elderly_user_id", nullable = false)
    private ElderlyUser elderlyUser;

    private String illness;
    private String surgeries;
    private LocalDate date;

    // Getters and Setters
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

    public String getIllness() {
        return illness;
    }

    public void setIllness(String illness) {
        this.illness = illness;
    }

    public String getSurgeries() {
        return surgeries;
    }

    public void setSurgeries(String surgeries) {
        this.surgeries = surgeries;
    }

    public LocalDate getDate() {
        return date; // Getter for date
    }

    public void setDate(LocalDate date) {
        this.date = date; // Setter for date
    }
}