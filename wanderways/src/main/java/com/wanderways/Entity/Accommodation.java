package com.wanderways.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "accommodations")
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String acm_name;
    private String acm_type;
    private String acm_location;
    private Float acm_price;


    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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
}