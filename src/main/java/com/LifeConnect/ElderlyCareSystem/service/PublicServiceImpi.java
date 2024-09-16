package com.LifeConnect.ElderlyCareSystem.service;

import com.LifeConnect.ElderlyCareSystem.model.ElderlyUser;
import com.LifeConnect.ElderlyCareSystem.model.HealthcareProvider;
import com.LifeConnect.ElderlyCareSystem.repository.ChatRepository;
import com.LifeConnect.ElderlyCareSystem.repository.ElderlyRepository;
import com.LifeConnect.ElderlyCareSystem.repository.HealthcareProvidersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class PublicServiceImpi implements PublicService {

    @Autowired
    private ElderlyRepository elderlyRepo;

    @Autowired
    private HealthcareProvidersRepository HProviderRepo;

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public boolean doesEmailExist(String email) {
        boolean emailExistsInElderly = elderlyRepo.existsByEmail(email);
        boolean emailExistsInHealthcareProvider = HProviderRepo.existsByEmail(email);
        return emailExistsInElderly || emailExistsInHealthcareProvider;
    }

    public Object getUserById(String userId) {
        // Try to find the user in the ElderlyRepository
        Optional<ElderlyUser> elderlyUser = elderlyRepo.findById(userId);
        if (elderlyUser.isPresent()) {
            return elderlyUser.get();
        }
        // If not found, try to find the user in the HealthcareProvidersRepository
        Optional<HealthcareProvider> hProvider = HProviderRepo.findById(userId);
        return hProvider.orElse(null);
    }

    @Override
    public List<Object> searchUsers(String query) {
        List<ElderlyUser> elderlyUsers;
        List<HealthcareProvider> healthcareProviders;

        if (query != null && query.trim().contains(" ")) {
            // To full name search
            String[] parts = query.trim().split(" ", 2);
            String firstname = parts[0];
            String lastname = parts.length > 1 ? parts[1] : "";

            elderlyUsers = elderlyRepo.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(firstname, lastname);
            healthcareProviders = HProviderRepo.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(firstname, lastname);
        } else {
            // To single query search
            elderlyUsers = elderlyRepo.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(query, query);
            healthcareProviders = HProviderRepo.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(query, query);
        }
        return Stream.concat(elderlyUsers.stream(), healthcareProviders.stream()).collect(Collectors.toList());
    }

    @Override
    public String checkIfChatExists(String participantOneId, String participantTwoId) {
        return chatRepository.findChatIdByParticipants(participantOneId, participantTwoId);
    }
}
