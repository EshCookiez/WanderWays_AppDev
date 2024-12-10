package com.wanderways.DTO;

import java.time.LocalDate;
import java.time.LocalTime;

public class AcmPaymentResponseDTO {
    private Long paymentId;
    private LocalTime checkInTime;
    private LocalTime checkOutTime;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Long roomId;
    private String roomName;
    private String roomType;
    private Double roomPrice;
    private String accommodationName;   
    private String accommodationLocation;
    private String accommodationLogo;
    private Double totalAmount;
    private String userFirstName;
    private String userLastName;


    public String getAccommodationLocation() {
        return this.accommodationLocation;
    }

    public void setAccommodationLocation(String accommodationLocation) {
        this.accommodationLocation = accommodationLocation;
    }

    public String getAccommodationLogo() {
        return this.accommodationLogo;
    }

    public void setAccommodationLogo(String accommodationLogo) {
        this.accommodationLogo = accommodationLogo;
    }
    public Long getPaymentId() {
        return this.paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public LocalTime getCheckInTime() {
        return this.checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalTime getCheckOutTime() {
        return this.checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public LocalDate getCheckInDate() {
        return this.checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalDate getCheckOutDate() {
        return this.checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public Long getRoomId() {
        return this.roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public String getRoomName() {
        return this.roomName;
    }

    public void setRoomName(String roomName) {
        this.roomName = roomName;
    }

    public String getRoomType() {
        return this.roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public Double getRoomPrice() {
        return this.roomPrice;
    }

    public void setRoomPrice(Double roomPrice) {
        this.roomPrice = roomPrice;
    }

    public String getAccommodationName() {
        return this.accommodationName;
    }

    public void setAccommodationName(String accommodationName) {
        this.accommodationName = accommodationName;
    }

    public Double getTotalAmount() {
        return this.totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getUserFirstName() {
        return this.userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return this.userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }
    // Add other necessary fields...

    // Getters and Setters
    // ...
}