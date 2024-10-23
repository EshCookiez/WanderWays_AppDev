package com.wanderways.Service;

import com.wanderways.Entity.Rooms;
import com.wanderways.Repository.RoomsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;

import java.util.List; 
import java.util.Optional;

@Service
public class RoomService {

    @Autowired
    private RoomsRepo roomRepo;

    public Rooms addRoom(Rooms room) {
        return roomRepo.save(room);
    }

    public List<Rooms> getAllRooms() {
        return roomRepo.findAll();
    }

    public Rooms updateRoom(int id, Rooms room) {
        Optional<Rooms> existingRoom = roomRepo.findById(id);
        if (existingRoom.isPresent()) {
            Rooms updatedRoom = existingRoom.get();
            updatedRoom.setRoom_name(room.getRoom_name());
            updatedRoom.setRoom_type(room.getRoom_type());
            updatedRoom.setRoom_price(room.getRoom_price());
            return roomRepo.save(updatedRoom);
        } else {
            throw new NoSuchElementException("Room not found with id: " + id);
        }
    }

    public String deleteRoom(int id) {
        roomRepo.deleteById(id);
        return "Room deleted with id: " + id;
    }
}