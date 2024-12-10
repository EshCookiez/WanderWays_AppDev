package com.wanderways.Controller;

import com.wanderways.Entity.Accommodation;
import com.wanderways.Service.AcmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/acc")
@CrossOrigin(origins = {"http://localhost:5173", "https://plr89hsz-5173.asse.devtunnels.ms"})
public class AcmController {

    private static final Logger logger = Logger.getLogger(AcmController.class.getName());

    @Autowired
    private AcmService acmService;

    @GetMapping("/print")
    public String print() {
        return "Hello, accommodation";
    }

    @PostMapping("/add")
    public ResponseEntity<Accommodation> addAccommodation(@RequestBody Accommodation accommodation) {
        try {
            Accommodation savedAccommodation = acmService.addAccommodation(accommodation);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAccommodation); // 201 Created
        } catch (Exception e) {
            logger.severe("Error saving accommodation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Bad Request
        }
    }

    @GetMapping("/{id}") // **Added Endpoint**
    public ResponseEntity<Accommodation> getAccommodationById(@PathVariable int id) {
        try {
            Accommodation accommodation = acmService.getAccommodationById(id);
            return ResponseEntity.ok(accommodation); // 200 OK
        } catch (NoSuchElementException e) {
            logger.severe("Accommodation not found: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found
        } catch (Exception e) {
            logger.severe("Error fetching accommodation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Accommodation>> getAllAccommodations() {
        try {
            List<Accommodation> accommodations = acmService.getAllAccommodations();
            return ResponseEntity.ok(accommodations); // 200 OK
        } catch (Exception e) {
            logger.severe("Error fetching accommodations: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Accommodation> updateAccommodation(@PathVariable int id, @RequestBody Accommodation accommodation) {
        try {
            Accommodation updatedAccommodation = acmService.updateAccommodation(id, accommodation);
            return ResponseEntity.ok(updatedAccommodation); // 200 OK with updated accommodation
        } catch (Exception e) {
            logger.severe("Error updating accommodation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found if accommodation doesn't exist
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAccommodation(@PathVariable int id) {
        try {
            String message = acmService.deleteAccommodation(id);
            return ResponseEntity.ok(message); // 200 OK with success message
        } catch (Exception e) {
            logger.severe("Error deleting accommodation: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Accommodation not found"); // 404 Not Found if accommodation doesn't exist
        }
    }
}