package com.wanderways.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wanderways.Entity.Favorites;
import com.wanderways.Repository.FavoritesRepo;

import java.util.List;

@Service
public class FavoritesService {

    @Autowired
    private FavoritesRepo favoritesRepository;

    public List<Favorites> getAllFavorites() {
        return favoritesRepository.findAll();
    }

    public Favorites getFavoriteById(int id) {
        return favoritesRepository.findById(id).orElse(null);
    }
    

    public Favorites addFavorite(Favorites favorites) {
        return favoritesRepository.save(favorites);
    }

    public Favorites updateFavorite(int id, Favorites updatedFavorite) {
        Favorites favorites = favoritesRepository.findById(id).orElse(null);
        if (favorites != null) {
            favorites.setAcmId(updatedFavorite.getAcmId());
            favorites.setFlightId(updatedFavorite.getFlightId());
            return favoritesRepository.save(favorites);
        }
        return null;
    }

    public void deleteFavorite(int id) {
        favoritesRepository.deleteById(id);
    }
}
