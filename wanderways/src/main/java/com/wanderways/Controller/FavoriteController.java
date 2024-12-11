package com.wanderways.Controller;

import com.wanderways.Entity.Favorite;
import com.wanderways.Service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = {"http://localhost:5173", "https://plr89hsz-5173.asse.devtunnels.ms"})
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @PostMapping("/add")
    public ResponseEntity<Favorite> addFavorite(@RequestParam Integer accommodationId, Authentication authentication) {
        String userEmail = authentication.getName();
        Favorite favorite = favoriteService.addFavorite(userEmail, accommodationId);
        return ResponseEntity.ok(favorite);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Favorite>> getFavorites(Authentication authentication) {
        String userEmail = authentication.getName();
        List<Favorite> favorites = favoriteService.getFavoritesByUser(userEmail);
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFavorite(@PathVariable Integer id, Authentication authentication) {
        String userEmail = authentication.getName();
        favoriteService.deleteFavorite(id, userEmail);
        return ResponseEntity.ok("Favorite deleted successfully");
    }
}