package com.wanderways.Entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Flight")
public class Flight{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer flight_id;

    private String rating;
    private LocalDateTime dateDepart; 
    private LocalDateTime dateArrival;

    @JsonProperty("flight_class")
    private String flightClass;

    @JsonProperty("location_origin")
    private String locationOrigin;

    @JsonProperty("location_destination")
    private String locationDestination;

    @JsonProperty("price")
    private Integer price;

    public Flight() {}

    public Flight(Integer flight_id, String rating,  LocalDateTime dateDepart, LocalDateTime dateArrival,
    String flightClass, String locationOrigin, String locationDestination, Integer price) {
        this.flight_id = flight_id;
        this.rating = rating;
        this.dateDepart = dateDepart;
        this.dateArrival = dateArrival;
        this.flightClass = flightClass;
        this.locationOrigin = locationOrigin;
        this.locationDestination = locationDestination;
        this.price = price;
    }

    //getters
    public Integer getFlightId() {
        return flight_id;
    }

    public String getRating() {
        return rating;
    }

    public LocalDateTime getDateDepart() {
        return dateDepart;
    }

    public LocalDateTime getDateArrival(){
        return dateArrival;
    }

    public String getFlightClass() {
        return flightClass;
    }

    public String getLocationOrigin() {
        return locationOrigin;
    }
    
    public String getLocationDestination() {
        return locationDestination;
    }

    public Integer getPrice(){
        return price;
    }
    // setters
    public void setFlightId(Integer flight_id) {
        this.flight_id = flight_id;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public void setDateDepart(LocalDateTime dateDepart) {
        this.dateDepart = dateDepart;
    }

    public void setDateArrival(LocalDateTime dateArrival){
        this.dateArrival = dateArrival;
    }

    public void setFlightClass(String flight_class) {
        this.flightClass = flight_class;
    }

    public void setLocationOrigin(String location_origin) {
        this.locationOrigin = location_origin;
    }
    
    public void setLocationDestination(String location_destination) {
        this.locationDestination = location_destination;
    }

    public void setPrice(Integer price){
        this.price = price;
    }
}
