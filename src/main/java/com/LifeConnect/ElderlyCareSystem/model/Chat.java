package com.LifeConnect.ElderlyCareSystem.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String participantOneId;
    private String participantTwoId;

    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "chat")
    @JsonManagedReference
    private List<Message> messages;

    public Chat() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParticipantOneId() {
        return participantOneId;
    }

    public void setParticipantOneId(String participantOneId) {
        this.participantOneId = participantOneId;
    }

    public String getParticipantTwoId() {
        return participantTwoId;
    }

    public void setParticipantTwoId(String participantTwoId) {
        this.participantTwoId = participantTwoId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}
