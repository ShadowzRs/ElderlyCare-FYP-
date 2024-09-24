package com.LifeConnect.ElderlyCareSystem.controller;

import com.LifeConnect.ElderlyCareSystem.model.Reminder;
import com.LifeConnect.ElderlyCareSystem.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.stringtemplate.v4.ST;

import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@CrossOrigin
public class ReminderController {

    @Autowired
    private ReminderService reminderService;

    @PostMapping("/create")
    public ResponseEntity<Reminder> createReminder(@RequestBody Reminder reminder) {
        Reminder createdReminder = reminderService.createReminder(reminder);
        return new ResponseEntity<>(createdReminder, HttpStatus.CREATED);
    }

    @GetMapping("/{elderlyUserId}")
    public ResponseEntity<List<Reminder>> getRemindersByElderlyUserId(@PathVariable String elderlyUserId) {
        List<Reminder> reminders = reminderService.getRemindersByElderlyUserId(elderlyUserId);
        return new ResponseEntity<>(reminders, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReminder(@PathVariable Long id) {
        reminderService.deleteReminderById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
