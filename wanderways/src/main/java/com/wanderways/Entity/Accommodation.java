package com.wanderways.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
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

    @Lob
    private byte[] image;

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
}