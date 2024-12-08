package com.wanderways.Entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "accommodations")
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer acm_id;

    private String acm_name;
    private String acm_type;
    private String acm_location;
    private Float acm_price;
    private String amenities;
    private Integer rate;
    private String overview;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "image", nullable = false)
    private byte[] image;
    
    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "acmLogo", nullable = false)
    private byte[] acmLogo;

    @JsonManagedReference  // This will prevent infinite recursion
    @OneToMany(mappedBy = "accommodation", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Rooms> rooms = new ArrayList<>();

    public Integer getAcm_id() {
        return this.acm_id;
    }

    public void setAcm_id(Integer acm_id) {
        this.acm_id = acm_id;
    }

    

    // Getters and Setters
    public Integer getId() {
        return acm_id;
    }

    public void setId(Integer acm_id) {
        this.acm_id = acm_id;
    }

    public String getAcm_name() {
        return acm_name;
    }

    public void setAcm_name(String acm_name) {
        this.acm_name = acm_name;
    }

    public String getAcm_type() {
        return acm_type;
    }

    public void setAcm_type(String acm_type) {
        this.acm_type = acm_type;
    }

    public String getAcm_location() {
        return acm_location;
    }

    public void setAcm_location(String acm_location) {
        this.acm_location = acm_location;
    }

    public Float getAcm_price() {
        return acm_price;
    }

    public void setAcm_price(Float acm_price) {
        this.acm_price = acm_price;
    }
    public String getAmenities() {
        return this.amenities;
    }

    public void setAmenities(String amenities) {
        this.amenities = amenities;
    }

    public Integer getRate() {
        return this.rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }
    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
    
    public byte[] getAcmLogo() {
        return acmLogo;
    }

    public void setAcmLogo(byte[] acmLogo) {
        this.acmLogo = acmLogo;
    }
    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }
    
    public List<Rooms> getRooms() {
        return rooms;
    }

    public void setRooms(List<Rooms> rooms) {
        this.rooms = rooms;
        for (Rooms room : rooms) {
            room.setAccommodation(this);
        }
    }
}