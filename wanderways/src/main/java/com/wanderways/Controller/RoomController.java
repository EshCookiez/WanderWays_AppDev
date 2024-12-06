//ROOMS CONTROLLER


package com.wanderways.Controller;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wanderways.Entity.Rooms;
import com.wanderways.Service.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    private static final Logger logger = Logger.getLogger(RoomController.class.getName());

    @Autowired
    private RoomService roomService;

    // Basic test endpoint
    @GetMapping("/print")
    public String print() {
        return "Hello, rooms";
    }

    // Add new room
    @PostMapping("/add")
    public ResponseEntity<Rooms> addRoom(@RequestBody Rooms room) {
        try {
            Rooms savedRoom = roomService.addRoom(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom); // 201 Created
        } catch (Exception e) {
            logger.severe("Error saving room: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // 400 Bad Request
        }
    }

    // Get all rooms
    @GetMapping("/all")
    public ResponseEntity<List<Rooms>> getAllRooms() {
        try {
            List<Rooms> rooms = roomService.getAllRooms();
            return ResponseEntity.ok(rooms); // 200 OK
        } catch (Exception e) {
            logger.severe("Error fetching rooms: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 500 Internal Server Error
        }
    }

    // Update room
    @PutMapping("/update/{id}")
    public ResponseEntity<Rooms> updateRoom(@PathVariable int id, @RequestBody Rooms room) {
        try {
            Rooms updatedRoom = roomService.updateRoom(id, room);
            return ResponseEntity.ok(updatedRoom); // 200 OK with updated room
        } catch (Exception e) {
            logger.severe("Error updating room: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404 Not Found if room doesn't exist
        }
    }

    // Delete room
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable int id) {
        try {
            String message = roomService.deleteRoom(id);
            return ResponseEntity.ok(message); // 200 OK with success message
        } catch (Exception e) {
            logger.severe("Error deleting room: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room not found"); // 404 Not Found if room doesn't exist
        }
    }
}
