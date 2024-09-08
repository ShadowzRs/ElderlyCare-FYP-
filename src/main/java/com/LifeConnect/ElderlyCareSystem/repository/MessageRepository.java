package com.LifeConnect.ElderlyCareSystem.repository;

import com.LifeConnect.ElderlyCareSystem.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long>{
    List<Message> findBySenderIdAndReceiverId(String senderId, String receiverId);
    List<Message> findByChatId(Long chatId);
}
