package com.wanderways.Controller;

import com.wanderways.Entity.BookFlight;
import com.wanderways.Service.BookFlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/bookings")
public class BookFlightController {
    
    private final BookFlightService bookFlightService;

    @Autowired
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

    @PutMapping("/update/{id}")
    public BookFlight updateBooking(@PathVariable Integer id, @RequestBody BookFlight updatedBooking) {
        return  bookFlightService.updateBookFlight(id, updatedBooking);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBooking(@PathVariable Integer id) {
        return bookFlightService.deleteBooking(id);
    }

}