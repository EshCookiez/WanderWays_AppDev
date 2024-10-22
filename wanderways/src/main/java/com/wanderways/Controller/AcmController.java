package com.wanderways.Controller;

import com.wanderways.Entity.Accommodation;
import com.wanderways.Service.AcmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/acc")
public class AcmController {

    @Autowired
    private AcmService acmService;

    @GetMapping("/print")
    public String print() {
        return "Hello, accommodation";
    }

    @PostMapping("/add")
    public Accommodation addAccommodation(@RequestBody Accommodation accommodation) {
        return acmService.addAccommodation(accommodation);
    }

    @GetMapping("/all")
    public List<Accommodation> getAllAccommodations() {
        return acmService.getAllAccommodations();
    }

    @PutMapping("/update/{id}")
    public Accommodation updateAccommodation(@PathVariable int id, @RequestBody Accommodation accommodation) {
        return acmService.updateAccommodation(id, accommodation);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteAccommodation(@PathVariable int id) {
        return acmService.deleteAccommodation(id);
    }
}