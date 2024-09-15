package com.LifeConnect.ElderlyCareSystem.repository;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ElderlyRepository extends JpaRepository<ElderlyUser,String> {
    boolean existsByEmail(String email);
    ElderlyUser findByEmail(String email);
    Optional<ElderlyUser> findById(String id);
    List<ElderlyUser> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(String firstname, String lastname);

}
