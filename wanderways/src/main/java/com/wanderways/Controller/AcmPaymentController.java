package com.wanderways.Controller;

import com.wanderways.Entity.AcmPayment;
import com.wanderways.Service.AcmPaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}