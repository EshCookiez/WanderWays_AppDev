package com.wanderways.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.wanderways.Entity.Flight;

@Repository
public interface FlightRepo extends JpaRepository<Flight, Integer> {
}