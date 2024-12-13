package com.wanderways.Service;

import com.wanderways.Entity.AcmPayment;
import com.wanderways.DTO.AcmPaymentDTO;
import com.wanderways.Entity.Accommodation;
import com.wanderways.Entity.Rooms;
import com.wanderways.Repository.AcmPaymentRepo;
import com.wanderways.Repository.AcmRepo;
import com.wanderways.Repository.RoomsRepo;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AcmPaymentService {

    @Autowired
    private AcmPaymentRepo acmPaymentRepo;

    @Autowired
    private AcmRepo accommodationRepo;

    @Autowired
    private RoomsRepo roomsRepo;

    public AcmPayment createPayment(AcmPaymentDTO paymentDTO, AcmPayment payment) {
        Accommodation accommodation = accommodationRepo.findById(paymentDTO.getAccommodationId().intValue())
            .orElseThrow(() -> new RuntimeException("Accommodation not found"));
        Rooms rooms = roomsRepo.findById(paymentDTO.getRoomId().intValue())
            .orElseThrow(() -> new RuntimeException("Room not found"));

        payment.setAccommodation(accommodation);
        payment.setRoomsSelected(rooms);

        return acmPaymentRepo.save(payment);
}
    
    public List<AcmPayment> getAllPayments() {
        return acmPaymentRepo.findAll();
    }

    public AcmPayment getPaymentById(Long id) {
        return acmPaymentRepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Payment not found with id: " + id));
    }

    public AcmPayment updatePayment(Long id, AcmPayment payment) {
        AcmPayment existingPayment = acmPaymentRepo.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Payment not found with id: " + id));

        Accommodation accommodation = accommodationRepo.findById(payment.getAccommodation().getId())
            .orElseThrow(() -> new RuntimeException("Accommodation not found"));
        Rooms rooms = roomsRepo.findById(payment.getRoomsSelected().getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found"));

        existingPayment.setCheckInTime(payment.getCheckInTime());
        existingPayment.setCheckOutTime(payment.getCheckOutTime());
        existingPayment.setCheckInDate(payment.getCheckInDate());
        existingPayment.setCheckOutDate(payment.getCheckOutDate());
        existingPayment.setAccommodation(accommodation);
        existingPayment.setRoomsSelected(rooms);
        existingPayment.setTotalAmount(payment.getTotalAmount());

        return acmPaymentRepo.save(existingPayment);
    }

    public String deletePayment(Long id) {
        acmPaymentRepo.deleteById(id);
        return "Payment deleted with id: " + id;
    }
    public AcmPayment savePayment(AcmPayment payment) {
        return acmPaymentRepo.save(payment);
    }
    public List<AcmPayment> getPaymentsByUser(Long customerId) {
        return acmPaymentRepo.findByUserInfoCustomerId(customerId);
    }
}