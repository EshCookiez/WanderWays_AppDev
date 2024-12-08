// FILE: AcmPayment.java

package com.wanderways.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "acm_payments")
public class AcmPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    // Many-to-One relationship with Rooms
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roomId", nullable = false)
    private Rooms room;

    private Float totalPrice;

    private LocalDate checkInDate;
    private LocalTime checkInTime;

    private LocalDate checkOutDate;
    private LocalTime checkOutTime;

    private String userFullName;

    // Constructors

    public AcmPayment() {
    }

    public AcmPayment(Rooms room, Float totalPrice,
                     LocalDate checkInDate, LocalTime checkInTime,
                     LocalDate checkOutDate, LocalTime checkOutTime,
                     String userFullName) {
        this.room = room;
        this.totalPrice = totalPrice;
        this.checkInDate = checkInDate;
        this.checkInTime = checkInTime;
        this.checkOutDate = checkOutDate;
        this.checkOutTime = checkOutTime;
        this.userFullName = userFullName;
    }

    // Getters and Setters

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public Rooms getRoom() {
        return room;
    }

    public void setRoom(Rooms room) {
        this.room = room;
    }

    public Float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDate getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }

    public LocalTime getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(LocalTime checkInTime) {
        this.checkInTime = checkInTime;
    }

    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public LocalTime getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(LocalTime checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public String getUserFullName() {
        return userFullName;
    }

    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }

    // toString Method (Optional)

    @Override
    public String toString() {
        return "AcmPayment{" +
                "paymentId=" + paymentId +
                ", room=" + room +
                ", totalPrice=" + totalPrice +
                ", checkInDate=" + checkInDate +
                ", checkInTime=" + checkInTime +
                ", checkOutDate=" + checkOutDate +
                ", checkOutTime=" + checkOutTime +
                ", userFullName='" + userFullName + '\'' +
                '}';
    }
}