package com.wanderways.Controller;


import java.util.HashMap;
import java.io.IOException;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.wanderways.DTO.UserProfileUpdateRequest;
import com.wanderways.Entity.AuthRequest;
import com.wanderways.Entity.UserInfo;
import com.wanderways.Service.JwtService;
import com.wanderways.Service.UserInfoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    @Qualifier("userInfoService")
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserInfo userInfo) {
    try {
        String response = service.addUser(userInfo);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Signup failed: " + e.getMessage());
    }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody AuthRequest authRequest) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
    );
    if (authentication.isAuthenticated()) {
        String token = jwtService.generateToken(authRequest.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);  // Wrap the token in a JSON object
        return ResponseEntity.ok(response);
    } else {
        throw new UsernameNotFoundException("Invalid email or password!");
    }
    
}



    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody UserInfo userInfo) {
        return service.addUser(userInfo);
    }

    @GetMapping("/user/userProfile")
    public String userProfile() {
        return "Welcome to User Profile";
    }

    @GetMapping("/admin/adminProfile")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }

    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
        );
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getEmail());
        } else {
            throw new UsernameNotFoundException("Invalid user request!");
        }
    }

    @GetMapping("/userProfile")
    public ResponseEntity<UserInfo> getUserProfile(Authentication authentication) {
        String email = authentication.getName();
        Optional<UserInfo> userOpt = service.findByEmail(email);
        return userOpt.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/uploadUserIcon")
    public ResponseEntity<String> uploadUserIcon(@RequestParam("file") MultipartFile file, Authentication authentication) {
        String email = authentication.getName();
        try {
            byte[] iconBytes = file.getBytes();
            service.updateUserIcon(email, iconBytes);
            return ResponseEntity.ok("User icon uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload user icon.");
        }
    }
    @GetMapping("/userIcon")
    public ResponseEntity<byte[]> getUserIcon(Authentication authentication) {
        String email = authentication.getName();
        Optional<UserInfo> userOpt = service.findByEmail(email);

        if (userOpt.isPresent() && userOpt.get().getUserIcon() != null) {
            byte[] imageBytes = userOpt.get().getUserIcon();
            return ResponseEntity.ok()
                    .header("Content-Type", "image/png") // Adjust the content type based on your image format
                    .body(imageBytes);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/check-email/{email}")
public ResponseEntity<?> checkEmailAvailability(@PathVariable String email) {
    try {
        boolean isAvailable = !service.findByEmail(email).isPresent();
        Map<String, Object> response = new HashMap<>();
        response.put("isAvailable", isAvailable);
        response.put("message", isAvailable ? 
            "Email is available" : "Email is already in use");
            
        return ResponseEntity.ok(response);
    } catch (Exception e) {
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body("Error checking email availability");
    }
}

    @PutMapping("/updateUserProfile")
    public ResponseEntity<?> updateUserProfile(
            @Valid @RequestBody UserProfileUpdateRequest updateRequest,
            Authentication authentication) {
        String email = authentication.getName();
        try {
            UserInfo updatedUser = service.updateUserProfile(email, updateRequest);
            return ResponseEntity.ok(updatedUser);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Invalid update data: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while updating the profile.");
        }
    }
}
