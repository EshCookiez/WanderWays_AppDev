package com.wanderways.Service;

import com.wanderways.Entity.Accommodation;
import com.wanderways.Repository.AcmRepo;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;

import java.util.List; 
import java.util.Optional;

@Service
public class AcmService {

    @Autowired
    private AcmRepo acmRepo;

    public Accommodation addAccommodation(Accommodation accommodation) {
        return acmRepo.save(accommodation);
    }

    public List<Accommodation> getAllAccommodations() {
        return acmRepo.findAll();
    }

    public Accommodation updateAccommodation(int id, Accommodation accommodation) {
        Optional<Accommodation> existingAccommodation = acmRepo.findById(id);
        if (existingAccommodation.isPresent()) {
            Accommodation updatedAccommodation = existingAccommodation.get();
            updatedAccommodation.setAcm_name(accommodation.getAcm_name());
            updatedAccommodation.setAcm_type(accommodation.getAcm_type());
            updatedAccommodation.setAcm_location(accommodation.getAcm_location());
            updatedAccommodation.setAcm_price(accommodation.getAcm_price());
            updatedAccommodation.setAmenities(accommodation.getAmenities());
            updatedAccommodation.setRate(accommodation.getRate());
            updatedAccommodation.setImage(accommodation.getImage());
            updatedAccommodation.setOverview(accommodation.getOverview());
            return acmRepo.save(updatedAccommodation);
        } else {
            throw new NoSuchElementException("Accommodation not found with id: " + id);
        }
    }

    public String deleteAccommodation(int id) {
        acmRepo.deleteById(id);
        return "Accommodation deleted with id: " + id;
    }
}