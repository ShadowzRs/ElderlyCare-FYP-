package com.LifeConnect.ElderlyCareSystem.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Reminder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reminderType;
    private LocalDate reminderDate;
    private LocalTime time;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "elderly_user_id", nullable = false)
    private ElderlyUser elderlyUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReminderType() {
        return reminderType;
    }

    public void setReminderType(String reminderType) {
        this.reminderType = reminderType;
    }

    public LocalDate getReminderDate() {
        return reminderDate;
    }

    public void setReminderDate(LocalDate reminderDate) {
        this.reminderDate = reminderDate;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public ElderlyUser getElderlyUser() {
        return elderlyUser;
    }

    public void setElderlyUser(ElderlyUser elderlyUser) {
        this.elderlyUser = elderlyUser;
    }
}
