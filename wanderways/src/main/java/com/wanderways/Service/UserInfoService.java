package com.wanderways.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.wanderways.DTO.UserProfileUpdateRequest;
import com.wanderways.Entity.UserInfo;
import com.wanderways.Repository.UserInfoRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Primary
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserInfo> userDetail = repository.findByEmail(username); // Assuming 'email' is used as username

        // Converting UserInfo to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    public String addUser(UserInfo userInfo) {
        // Encode password before saving the user
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User Added Successfully";
    }

    public Optional<UserInfo> findByEmail(String email) {
        return repository.findByEmail(email);
    }
    
    @Transactional
    public void updateUserIcon(String email, byte[] iconBytes) {
        UserInfo user = repository.findByEmail(email)
                                  .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        user.setUserIcon(iconBytes);
        repository.save(user);
    }
    
    @Transactional
    public UserInfo updateUserProfile(String email, UserProfileUpdateRequest updateRequest) {
        UserInfo user = repository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        if (updateRequest.getFirstName() != null && !updateRequest.getFirstName().isEmpty()) {
            user.setFirstName(updateRequest.getFirstName());
        }
        if (updateRequest.getLastName() != null && !updateRequest.getLastName().isEmpty()) {
            user.setLastName(updateRequest.getLastName());
        }
        if (updateRequest.getEmail() != null && !updateRequest.getEmail().isEmpty()) {
            Optional<UserInfo> existingUser = repository.findByEmail(updateRequest.getEmail());
            if (existingUser.isPresent() && !existingUser.get().getEmail().equals(email)) {
                throw new IllegalArgumentException("Email is already in use.");
            }
            user.setEmail(updateRequest.getEmail());
        }
        if (updateRequest.getPhoneNumber() != null && !updateRequest.getPhoneNumber().isEmpty()) {
            user.setPhoneNumber(updateRequest.getPhoneNumber());
        }
        if (updateRequest.getCustomerAddress() != null && !updateRequest.getCustomerAddress().isEmpty()) {
            user.setCustomerAddress(updateRequest.getCustomerAddress());
        }
        if (updateRequest.getBirthdate() != null && !updateRequest.getBirthdate().isEmpty()) {
            user.setBirthdate(updateRequest.getBirthdate());
        }

        return repository.save(user);
    }
}