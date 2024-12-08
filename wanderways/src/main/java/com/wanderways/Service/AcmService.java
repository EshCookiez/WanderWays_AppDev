package com.wanderways.Service;

import com.wanderways.Entity.Accommodation;
import com.wanderways.Repository.AcmRepo;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;

import java.util.List; 
import java.util.Optional;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;

@Service
public class AcmService {

    @Autowired
    private AcmRepo acmRepo;
    private static final Logger logger = Logger.getLogger(AcmService.class.getName());

    public List<Accommodation> getAllAccommodations() {
        List<Accommodation> accommodations = acmRepo.findAll();
        logger.info("Fetched accommodations: " + accommodations.size());
        accommodations.forEach(accommodation -> logger.info(accommodation.toString()));
        return accommodations;
    }
    public Accommodation addAccommodation(Accommodation accommodation) {
        return acmRepo.save(accommodation);
    }

    // public List<Accommodation> getAllAccommodations() {
    //     return acmRepo.findAll();
    // }

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
    // **Added Method: Fetch accommodation by ID**
    public Accommodation getAccommodationById(int id) {
        logger.info("Fetching accommodation with id: " + id);
        Optional<Accommodation> accommodation = acmRepo.findById(id);
        if (accommodation.isPresent()) {
            logger.info("Accommodation found: " + accommodation.get().toString());
            return accommodation.get();
        } else {
            logger.warning("Accommodation not found with id: " + id);
            throw new NoSuchElementException("Accommodation not found with id: " + id);
        }
    }
}