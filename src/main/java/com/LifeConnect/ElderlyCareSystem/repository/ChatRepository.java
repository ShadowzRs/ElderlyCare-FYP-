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

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Chat c WHERE " +
            "(c.participantOneId = :userId1 AND c.participantTwoId = :userId2) OR " +
            "(c.participantOneId = :userId2 AND c.participantTwoId = :userId1)")
    boolean checkIfChatAlreadyExist(@Param("userId1") String userId1, @Param("userId2") String userId2);
}

