package com.wanderways.Service;

import com.wanderways.Entity.BookFlight;
import com.wanderways.Repository.BookFlightRepo;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class BookFlightService{
    private final BookFlightRepo bookflightrepo;

    public BookFlightService(BookFlightRepo bookflightrepo) {
        this.bookflightrepo = bookflightrepo;
    }

    //Create a booking
    public BookFlight save(BookFlight bookflight) {
        return bookflightrepo.save(bookflight); 
    }


    //Read all booking
    public List<BookFlight> findAll() {
        return bookflightrepo.findAll();
    }

    //Get booking by ID
    public Optional<BookFlight> findById(Integer id) {
        return bookflightrepo.findById(id);
    }
    
    // Update a booking
    public BookFlight updateBookFlight(Integer id, BookFlight updatedBookFlight) {
        Optional<BookFlight> existingBookingOpt = bookflightrepo.findById(id);
        
        if (existingBookingOpt.isPresent()) {
            BookFlight existingBooking = existingBookingOpt.get();
            existingBooking.setPassengerAmount(updatedBookFlight.getPassengerAmount());
            existingBooking.setFareClass(updatedBookFlight.getFareClass());
            
            return bookflightrepo.save(existingBooking); 
        } else {
            throw new EntityNotFoundException("Booking not found with id: " + id);
        }
    }

    //Update Booking status
    public BookFlight updateBookingStatus(Integer id, String status) {
    Optional<BookFlight> existingBookingOpt = bookflightrepo.findById(id);
    
    if (existingBookingOpt.isPresent()) {
        BookFlight existingBooking = existingBookingOpt.get();
        existingBooking.setStatus(status);
        return bookflightrepo.save(existingBooking);
    } else {
        throw new EntityNotFoundException("Booking not found with id: " + id);
    }
}   

    // Delete a booking
    public String deleteBooking(Integer fbook_id) {
        if (!bookflightrepo.existsById(fbook_id)) {
            throw new EntityNotFoundException("Flight not found with id: " + fbook_id);
        }
        bookflightrepo.deleteById(fbook_id); 
        return "Booked flight with booking ID " +fbook_id+ " deleted";
    }
}