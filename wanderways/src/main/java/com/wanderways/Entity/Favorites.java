package com.wanderways.Entity;
import jakarta.persistence.*;
@Entity
@Table(name = "favorites")
public class Favorites {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int favoritesId;

    @Column(nullable = false)
    private int acmId;

    @Column(nullable = false)
    private int flightId;

    // Constructors
    public Favorites() {}

    public Favorites(int acmId, int flightId) {
        this.acmId = acmId;
    }

    // Getters and Setters
    public int getFavoritesId() {
        return favoritesId;
    }

    public void setFavoritesId(int favoritesId) {
        this.favoritesId = favoritesId;
    }

    public int getAcmId() {
        return acmId;
    }

    public void setAcmId(int acmId) {
        this.acmId = acmId;
    }

}