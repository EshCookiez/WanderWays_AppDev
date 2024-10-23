package com.wanderways.Entity;

import java.time.LocalDateTime;

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
    private String flight_class;

    public Flight() {}

    public Flight(Integer flight_id, String rating,  LocalDateTime dateDepart, LocalDateTime dateArrival,String flight_class) {
        this.flight_id = flight_id;
        this.rating = rating;
        this.dateDepart = dateDepart;
        this.dateArrival = dateArrival;
        this.flight_class = flight_class;
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
        return flight_class;
    }

    // getters
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
        this.flight_class = flight_class;
    }

}
