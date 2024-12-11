package com.wanderways.Service;

import com.wanderways.Entity.Favorite;
import com.wanderways.Entity.UserInfo;
import com.wanderways.Entity.Accommodation;
import com.wanderways.Repository.FavoriteRepository;
import com.wanderways.Repository.UserInfoRepository;
import com.wanderways.Repository.AcmRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private AcmRepo accommodationRepository;

    public Favorite addFavorite(String userEmail, Integer accommodationId) {
        UserInfo user = userInfoRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        Accommodation accommodation = accommodationRepository.findById(accommodationId)
                .orElseThrow(() -> new NoSuchElementException("Accommodation not found"));
        // Check if already favorited
        favoriteRepository.findByUserAndAccommodation(user, accommodation).ifPresent(fav -> {
            throw new IllegalStateException("Already favorited");
        });
        Favorite favorite = new Favorite(user, accommodation);
        return favoriteRepository.save(favorite);
    }

    public List<Favorite> getFavoritesByUser(String userEmail) {
        UserInfo user = userInfoRepository.findByEmail(userEmail)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return favoriteRepository.findByUser(user);
    }

    public void deleteFavorite(Integer favoriteId, String userEmail) {
        Favorite favorite = favoriteRepository.findById(favoriteId)
                .orElseThrow(() -> new NoSuchElementException("Favorite not found"));
        if (!favorite.getUser().getEmail().equals(userEmail)) {
            throw new IllegalStateException("Unauthorized");
        }
        favoriteRepository.delete(favorite);
    }
}