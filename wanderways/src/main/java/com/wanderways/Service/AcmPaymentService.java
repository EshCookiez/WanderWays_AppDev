package com.wanderways.Service;

import com.wanderways.Entity.AcmPayment;
import com.wanderways.Repository.AcmPaymentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcmPaymentService {

    @Autowired
    private AcmPaymentRepo acmPaymentRepo;

    // Create a new payment
    public AcmPayment createPayment(AcmPayment payment) {
        return acmPaymentRepo.save(payment);
    }

    // Get all payments
    public List<AcmPayment> getAllPayments() {
        return acmPaymentRepo.findAll();
    }

    // Get payment by ID
    public AcmPayment getPaymentById(Long id) {
        return acmPaymentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found for id :: " + id));
    }

    // Update payment
    public AcmPayment updatePayment(Long id, AcmPayment paymentDetails) {
        AcmPayment payment = getPaymentById(id);
        payment.setRoom(paymentDetails.getRoom());
        payment.setTotalPrice(paymentDetails.getTotalPrice());
        payment.setCheckInDate(paymentDetails.getCheckInDate());
        payment.setCheckInTime(paymentDetails.getCheckInTime());
        payment.setCheckOutDate(paymentDetails.getCheckOutDate());
        payment.setCheckOutTime(paymentDetails.getCheckOutTime());
        payment.setUserFullName(paymentDetails.getUserFullName());
        return acmPaymentRepo.save(payment);
    }

    // Delete payment
    public void deletePayment(Long id) {
        AcmPayment payment = getPaymentById(id);
        acmPaymentRepo.delete(payment);
    }
}