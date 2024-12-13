package com.wanderways.Repository;

import com.wanderways.Entity.Favorite;
import com.wanderways.Entity.UserInfo;
import com.wanderways.Entity.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, Integer> {
    List<Favorite> findByUser(UserInfo user);
    Optional<Favorite> findByUserAndAccommodation(UserInfo user, Accommodation accommodation);
}