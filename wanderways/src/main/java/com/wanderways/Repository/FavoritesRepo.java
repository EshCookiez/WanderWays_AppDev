package com.wanderways.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wanderways.Entity.Favorites;

public interface FavoritesRepo extends JpaRepository<Favorites, Integer> {
}
