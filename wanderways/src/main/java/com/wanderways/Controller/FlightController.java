package com.wanderways.Controller;
import com.wanderways.Entity.Flight;
import com.wanderways.Service.FlightService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:5173", "https://plr89hsz-5173.asse.devtunnels.ms"})
@RestController
@RequestMapping("/api/flights")
public class FlightController {
    
    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping("test")
    public String test() {
        return "Welcome to Flights";
    }

    @PostMapping("/add")
    @ResponseBody
    public Flight createFlight(@RequestBody Flight flight) {
        return flightService.save(flight); 
    }

    @GetMapping("/all")
    public List<Flight> getAllFlights() {
        return flightService.findAll();
    }

    @PutMapping("/update/{id}")
    public Flight updateFlight(@PathVariable Integer id, @RequestBody Flight updatedFlight) {
        return flightService.updateFlight(id, updatedFlight);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteFlight(@PathVariable Integer id) {
        flightService.deleteFlight(id);
        return "Flight deleted successfully"; 
    }
}
