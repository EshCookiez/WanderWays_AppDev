package com.wanderways.Repository;

import com.wanderways.Entity.Rooms;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    
    @Repository
    public interface RoomsRepo extends JpaRepository<Rooms, Integer> {
    }
    

