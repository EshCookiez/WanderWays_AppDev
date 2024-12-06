//ROOMS SERVICE

package com.wanderways.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wanderways.Entity.Rooms;
import com.wanderways.Repository.RoomsRepo;

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
            updatedRoom.setRoomName(room.getRoomName());
            updatedRoom.setRoomType(room.getRoomType());
            updatedRoom.setRoomPrice(room.getRoomPrice());
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