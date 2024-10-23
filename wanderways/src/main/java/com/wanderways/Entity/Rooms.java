package com.wanderways.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rooms")
public class Rooms {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer room_id;

    private String room_name;
    private String room_type;
    private Float room_price;


    // Getters and Setters
    public Integer getRoom_id() {
        return this.room_id;
    }

    public void setRoom_id(Integer room_id) {
        this.room_id = room_id;
    }

    public String getRoom_name() {
        return this.room_name;
    }

    public void setRoom_name(String room_name) {
        this.room_name = room_name;
    }

    public String getRoom_type() {
        return this.room_type;
    }

    public void setRoom_type(String room_type) {
        this.room_type = room_type;
    }

    public Float getRoom_price() {
        return this.room_price;
    }

    public void setRoom_price(Float room_price) {
        this.room_price = room_price;
    }

    
}