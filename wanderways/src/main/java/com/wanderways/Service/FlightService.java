package com.wanderways.Service;

import com.wanderways.Entity.Flight;
import com.wanderways.Repository.FlightRepo;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class FlightService{
    private final FlightRepo flightRepo;

    public FlightService(FlightRepo flightRepo) {
        this.flightRepo = flightRepo;
    }

    //Create a flight
    public Flight save(Flight flight) {
        return flightRepo.save(flight);
    }

    //Read all flights
    public List<Flight> findAll() {
        return flightRepo.findAll();
    }

    //update a flight
    public Flight updateFlight(Integer id, Flight flight) {
        Optional<Flight> existingFlight = flightRepo.findById(id);

        if (existingFlight.isPresent()) {
            Flight updatedFlight = existingFlight.get();
            updatedFlight.setRating(flight.getRating());
            updatedFlight.setDateDepart(flight.getDateDepart());
            updatedFlight.setDateArrival(flight.getDateArrival());
            updatedFlight.setFlightClass(flight.getFlightClass());  
            updatedFlight.setLocationOrigin(updatedFlight.getLocationOrigin());
            updatedFlight.setLocationDestination(updatedFlight.getLocationOrigin());
            updatedFlight.setPrice(updatedFlight.getPrice());
            
            return flightRepo.save(updatedFlight);
        } else {
            throw new EntityNotFoundException("Flight not found with id: " + id);
        }
    }

    // Delete a flight
    public String deleteFlight(Integer flightId) {
        if (!flightRepo.existsById(flightId)) {
            throw new EntityNotFoundException("Flight not found with id: " + flightId);
        }
        flightRepo.deleteById(flightId); 
        return "Flight " +flightId+ "Deleted";
    }

}


