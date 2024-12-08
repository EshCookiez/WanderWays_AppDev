package com.wanderways.Service;

import com.wanderways.Entity.AcmPayment;
import com.wanderways.Entity.Accommodation;
import com.wanderways.Entity.Rooms;
import com.wanderways.Repository.AcmPaymentRepo;
import com.wanderways.Repository.AcmRepo;
import com.wanderways.Repository.RoomsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AcmPaymentService {

    @Autowired
    private AcmPaymentRepo acmPaymentRepo;

    @Autowired
    private AcmRepo accommodationRepo;

    @Autowired
    private RoomsRepo roomsRepo;

    public AcmPayment createPayment(AcmPayment payment) {
        Accommodation accommodation = accommodationRepo.findById(payment.getAccommodation().getId())
            .orElseThrow(() -> new RuntimeException("Accommodation not found"));
        Rooms rooms = roomsRepo.findById(payment.getRoomsSelected().getRoomId())
            .orElseThrow(() -> new RuntimeException("Room not found"));

        payment.setAccommodation(accommodation);
        payment.setRoomsSelected(rooms);

        return acmPaymentRepo.save(payment);
    }
}