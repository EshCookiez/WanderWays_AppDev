package com.wanderways.Controller;

import com.wanderways.Entity.BookFlight;
import com.wanderways.Service.BookFlightService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = {"http://localhost:5173", "https://plr89hsz-5173.asse.devtunnels.ms"})
public class BookFlightController {
    
    private final BookFlightService bookFlightService;

    public BookFlightController(BookFlightService bookFlightService) {
        this.bookFlightService = bookFlightService;
    }

    @GetMapping("test")
    public String test(){
        return "Welcome to Flight Bookings";
    }
    
    @PostMapping("/add")
    public ResponseEntity<BookFlight> createBooking(@RequestBody BookFlight booking) {
        BookFlight savedBooking = bookFlightService.save(booking);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBooking);
    }

    @GetMapping("/all")
    public List<BookFlight> getAllBookings() {
        return bookFlightService.findAll();
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<BookFlight> getBookingById(@PathVariable Integer id) {
        Optional<BookFlight> booking = bookFlightService.findById(id);
        return booking.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
    

    @PutMapping("/update/{id}")
    public BookFlight updateBooking(@PathVariable Integer id, @RequestBody BookFlight updatedBooking) {
        return  bookFlightService.updateBookFlight(id, updatedBooking);
    }

    @PatchMapping("/status/{id}")
    public ResponseEntity<BookFlight> updateStatus(@PathVariable Integer id, @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            BookFlight updatedBooking = bookFlightService.updateBookingStatus(id, status);
            return ResponseEntity.ok(updatedBooking);
        } catch (EntityNotFoundException e) {
            
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null);
        } catch (Exception e) {
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Integer id) {
        return bookFlightService.deleteBooking(id);
    }
    

}