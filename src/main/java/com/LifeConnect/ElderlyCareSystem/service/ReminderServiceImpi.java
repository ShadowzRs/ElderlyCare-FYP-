package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.Reminder;
import com.LifeConnect.ElderlyCareSystem.repository.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ReminderServiceImpi implements ReminderService{

    @Autowired
    private ReminderRepository reminderRepository;

    @Override
    public Reminder createReminder(Reminder reminder) {
        return reminderRepository.save(reminder);
    }

    @Override
    public List<Reminder> getRemindersByElderlyUserId(String elderlyUserId) {
        return reminderRepository.findByElderlyUserId(elderlyUserId);
    }

    @Override
    public void deleteReminderById(Long id) {
        if (reminderRepository.existsById(id)) {
            reminderRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reminder not found");
        }
    }
}
