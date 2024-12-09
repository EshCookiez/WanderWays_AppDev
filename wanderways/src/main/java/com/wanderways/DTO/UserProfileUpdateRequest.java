// src/main/java/com/wanderways/DTO/UserProfileUpdateRequest.java
package com.wanderways.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserProfileUpdateRequest {

    @Size(max = 50, message = "First name cannot exceed 50 characters.")
    private String firstName;

    @Size(max = 50, message = "Last name cannot exceed 50 characters.")
    private String lastName;

    @Email(message = "Invalid email format.")
    private String email;

    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number.")
    private String phoneNumber;

    @Size(max = 255, message = "Address cannot exceed 255 characters.")
    private String customerAddress;

    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Invalid birthdate format. Use YYYY-MM-DD.")
    private String birthdate;

    // Getters and Setters

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCustomerAddress() {
        return customerAddress;
    }
    
    public void setCustomerAddress(String customerAddress) {
        this.customerAddress = customerAddress;
    }

    public String getBirthdate() {
        return birthdate;
    }
    
    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }
}