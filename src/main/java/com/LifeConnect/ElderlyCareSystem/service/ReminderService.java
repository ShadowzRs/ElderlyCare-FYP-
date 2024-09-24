package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.Reminder;

import java.util.List;

public interface ReminderService {
    Reminder createReminder(Reminder reminder);
    List<Reminder> getRemindersByElderlyUserId(String elderlyUserId);
    void deleteReminderById(Long id);

}
