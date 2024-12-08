package com.wanderways.Controller;

import com.wanderways.Entity.AcmPayment;
import com.wanderways.Service.AcmPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/acmpayment")
@CrossOrigin(origins = "http://localhost:5173")
public class AcmPaymentController {

    @Autowired
    private AcmPaymentService acmPaymentService;

    @PostMapping("/create")
    public ResponseEntity<AcmPayment> createPayment(@RequestBody AcmPayment payment) {
        AcmPayment savedPayment = acmPaymentService.createPayment(payment);
        return ResponseEntity.ok(savedPayment);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<AcmPayment>> getAllPayments() {
        List<AcmPayment> payments = acmPaymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcmPayment> getPaymentById(@PathVariable Long id) {
        AcmPayment payment = acmPaymentService.getPaymentById(id);
        return ResponseEntity.ok(payment);
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
}