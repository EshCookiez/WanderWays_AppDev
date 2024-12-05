package com.wanderways.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customerId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    private String customerAddress;
    private String birthdate;
    private String roles;

}
