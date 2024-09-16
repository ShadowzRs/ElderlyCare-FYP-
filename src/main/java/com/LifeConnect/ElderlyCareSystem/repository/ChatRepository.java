package com.LifeConnect.ElderlyCareSystem.repository;

import com.LifeConnect.ElderlyCareSystem.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    Optional<Chat> findByParticipantOneIdAndParticipantTwoId(String participantOneId, String participantTwoId);
    List<Chat> findByParticipantOneIdOrParticipantTwoId(String participantOneId, String participantTwoId);

    @Query("SELECT c.id FROM Chat c WHERE " +
            "(c.participantOneId = :participantOneId  AND c.participantTwoId = :participantTwoId) OR " +
            "(c.participantOneId = :participantTwoId AND c.participantTwoId = :participantOneId )")
    String findChatIdByParticipants(@Param("participantOneId") String participantOneId, @Param("participantTwoId") String participantTwoId);
}

