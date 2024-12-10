package com.wanderways.Controller;

import com.wanderways.DTO.AcmPaymentDTO;
import com.wanderways.DTO.AcmPaymentResponseDTO;
import com.wanderways.Entity.AcmPayment;
import com.wanderways.Service.AcmPaymentService;
import com.wanderways.Entity.UserInfo;
import com.wanderways.Service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/acmpayment")
@CrossOrigin(origins = "http://localhost:5173")
public class AcmPaymentController {

    @Autowired
    private AcmPaymentService acmPaymentService;

    @Autowired
    private UserInfoService userService;

    @PostMapping("/create")
    public ResponseEntity<AcmPayment> createPayment(@RequestBody AcmPaymentDTO paymentDTO, Authentication authentication) {
        String email = authentication.getName();
        UserInfo user = userService.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found"));

        AcmPayment payment = new AcmPayment();
        payment.setCheckInDate(paymentDTO.getCheckInDate());
        payment.setCheckOutDate(paymentDTO.getCheckOutDate());
        payment.setCheckInTime(paymentDTO.getCheckInTime());
        payment.setCheckOutTime(paymentDTO.getCheckOutTime());
        payment.setTotalAmount(paymentDTO.getTotalAmount());

        payment.setUserInfo(user);

        AcmPayment savedPayment = acmPaymentService.createPayment(paymentDTO, payment);
        return ResponseEntity.ok(savedPayment);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<AcmPayment>> getAllPayments() {
        List<AcmPayment> payments = acmPaymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcmPaymentResponseDTO> getPaymentById(@PathVariable Long id) {
        AcmPayment payment = acmPaymentService.getPaymentById(id);
        AcmPaymentResponseDTO responseDTO = convertToDTO(payment);
        return ResponseEntity.ok(responseDTO);
    }

    private AcmPaymentResponseDTO convertToDTO(AcmPayment payment) {
        AcmPaymentResponseDTO dto = new AcmPaymentResponseDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setCheckInDate(payment.getCheckInDate());
        dto.setCheckOutDate(payment.getCheckOutDate());
        dto.setCheckInTime(payment.getCheckInTime());
        dto.setCheckOutTime(payment.getCheckOutTime());
        dto.setRoomId(payment.getRoomsSelected().getRoomId().longValue());
        dto.setRoomName(payment.getRoomsSelected().getRoomName());
        dto.setRoomType(payment.getRoomsSelected().getRoomType());
        dto.setRoomPrice(payment.getRoomsSelected().getRoomPrice().doubleValue());
        dto.setAccommodationName(payment.getAccommodation().getAcm_name());
        dto.setAccommodationLocation(payment.getAccommodation().getAcm_location());

        // Convert byte array to Base64 string
        if (payment.getAccommodation().getAcmLogo() != null) {
            dto.setAccommodationLogo(java.util.Base64.getEncoder().encodeToString(payment.getAccommodation().getAcmLogo()));
        } else {
            dto.setAccommodationLogo(null);
        }

        dto.setTotalAmount(payment.getTotalAmount());
        dto.setUserFirstName(payment.getUserInfo().getFirstName());
        dto.setUserLastName(payment.getUserInfo().getLastName());
        // Set other fields as needed
        return dto;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AcmPayment> updatePayment(@PathVariable Long id, @RequestBody AcmPayment payment) {
        AcmPayment updatedPayment = acmPaymentService.updatePayment(id, payment);
        return ResponseEntity.ok(updatedPayment);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {
        String message = acmPaymentService.deletePayment(id);
        return ResponseEntity.ok(message);
    }
    @GetMapping("/user/{customerId}")
    public ResponseEntity<List<AcmPaymentResponseDTO>> getPaymentsByUser(@PathVariable Long customerId) {
        List<AcmPayment> payments = acmPaymentService.getPaymentsByUser(customerId);
        List<AcmPaymentResponseDTO> responseDTOs = payments.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }
    }