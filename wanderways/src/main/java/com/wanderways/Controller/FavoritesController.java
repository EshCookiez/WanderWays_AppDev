package com.wanderways.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wanderways.Entity.Favorites;
import com.wanderways.Service.FavoritesService;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    @Autowired
    private FavoritesService favoritesService;

    @GetMapping
    public List<Favorites> getAllFavorites() {
        return favoritesService.getAllFavorites();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Favorites> getFavoriteById(@PathVariable int id) {
        Favorites favorite = favoritesService.getFavoriteById(id);
        if (favorite != null) {
            return ResponseEntity.ok(favorite);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Favorites> addFavorite(@RequestBody Favorites favorite) {
        Favorites createdFavorite = favoritesService.addFavorite(favorite);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFavorite);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Favorites> updateFavorite(@PathVariable int id, @RequestBody Favorites updatedFavorite) {
        Favorites favorite = favoritesService.updateFavorite(id, updatedFavorite);
        if (favorite != null) {
            return ResponseEntity.ok(favorite);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable int id) {
        favoritesService.deleteFavorite(id);
        return ResponseEntity.noContent().build();
    }
}
