package com.wanderways.Controller;

import com.wanderways.Entity.AcmPayment;
import com.wanderways.Entity.Rooms;
import com.wanderways.Repository.RoomsRepo;
import com.wanderways.Service.AcmPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/acmpayments")
@CrossOrigin(origins = "http://localhost:5173")
public class AcmPaymentController {

    @Autowired
    private AcmPaymentService acmPaymentService;

    @Autowired
    private RoomsRepo roomsRepository;

    // Create a new payment
    @PostMapping("/add")
    public ResponseEntity<AcmPayment> createPayment(@RequestBody AcmPayment payment) {
        Rooms room = roomsRepository.findById(payment.getRoom().getRoomId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Room not found with id :: " + payment.getRoom().getRoomId()));
        payment.setRoom(room);
        AcmPayment savedPayment = acmPaymentService.createPayment(payment);
        return ResponseEntity.ok(savedPayment);
    }

    // Get all payments
    @GetMapping
    public ResponseEntity<List<AcmPayment>> getAllPayments() {
        List<AcmPayment> payments = acmPaymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    // Get payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<AcmPayment> getPaymentById(@PathVariable(value = "id") Long paymentId) {
        AcmPayment payment = acmPaymentService.getPaymentById(paymentId);
        return ResponseEntity.ok().body(payment);
    }

    // Update payment
    @PutMapping("/update/{id}")
    public ResponseEntity<AcmPayment> updatePayment(@PathVariable(value = "id") Long paymentId,
                                                   @RequestBody AcmPayment paymentDetails) {
        AcmPayment updatedPayment = acmPaymentService.updatePayment(paymentId, paymentDetails);
        return ResponseEntity.ok(updatedPayment);
    }

    // Delete payment
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable(value = "id") Long paymentId) {
        acmPaymentService.deletePayment(paymentId);
        return ResponseEntity.noContent().build();
    }
}