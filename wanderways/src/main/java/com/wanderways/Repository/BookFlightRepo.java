package com.wanderways.Repository;

import com.wanderways.Entity.BookFlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookFlightRepo extends JpaRepository<BookFlight, Integer> {
}
