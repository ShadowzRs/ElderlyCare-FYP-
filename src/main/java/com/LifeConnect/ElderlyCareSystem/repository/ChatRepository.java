package com.LifeConnect.ElderlyCareSystem.repository;

import com.LifeConnect.ElderlyCareSystem.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<Chat> findByParticipantOneIdAndParticipantTwoId(String participantOneId, String participantTwoId);
    List<Chat> findByParticipantOneIdOrParticipantTwoId(String participantOneId, String participantTwoId);
}

