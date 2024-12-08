package com.wanderways.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "FlightBooking")
public class BookFlight {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fbook_id;

    @JsonProperty("passengerAmount")
    private Integer passenger_amount;

    @JsonProperty("fareClass")
    private String fare_class;

    @JsonProperty("status")
    private String status = "Pending Payment";


    @ManyToOne
    @JoinColumn(name = "flightId", nullable = false)
    private Flight flight;

    public BookFlight() {}

    public BookFlight(Integer fbook_id,Integer passenger_amount, String fare_class, String status){
        this.fbook_id = fbook_id;
        this.passenger_amount = passenger_amount;
        this.fare_class = fare_class;
        this.status = (status == null || status.isEmpty()) ? "Pending Payment" : status;
    }


    // Getters
    public Integer getFbookId() {
        return fbook_id;
    }
    
    public Integer getPassengerAmount() {
        return passenger_amount;
    }
    
    public String getFareClass() {
        return fare_class;
    }
    
     public Flight getFlight() {
        return flight;
    }

    public String getStatus(){
        return status;
    }
    
     // Setters
    public void setFbookId(Integer fbook_id) {
        this.fbook_id = fbook_id;
    }
    
    public void setPassengerAmount(Integer passenger_amount) {
        this.passenger_amount = passenger_amount;
    }
    
    public void setFareClass(String fare_class) {
        this.fare_class = fare_class;
    }
    
    public void setFlight(Flight flight) {
        this.flight = flight;
    }
    
    public void setStatus(String status){
        this.status = status;
    }

}
