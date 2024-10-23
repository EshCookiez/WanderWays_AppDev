package com.wanderways.Controller;

import com.wanderways.Entity.Rooms;
import com.wanderways.Service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/print")
    public String print() {
        return "Hello, rooms";
    }

    @PostMapping("/add")
    public Rooms addRoom(@RequestBody Rooms room) {
        return roomService.addRoom(room);
    }

    @GetMapping("/all")
    public List<Rooms> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PutMapping("/update/{id}")
    public Rooms updateRoom(@PathVariable int id, @RequestBody Rooms room) {
        return roomService.updateRoom(id, room);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRoom(@PathVariable int id) {
        return roomService.deleteRoom(id);
    }
}
