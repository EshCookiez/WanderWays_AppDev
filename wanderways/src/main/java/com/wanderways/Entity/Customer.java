package com.wanderways.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customer_id;
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private String password;
    private String customer_address;
    private String birthdate;


    public int getCustomerId() {
        return customer_id;
    }
    
    public void setCustomerId(int customer_id) {
        this.customer_id = customer_id;
    }
    
    public String getFirstName() {
        return first_name;
    }
    
    public void setFirstName(String first_name) {
        this.first_name = first_name;
    }
    
    public String getLastName() {
        return last_name;
    }
    
    public void setLastName(String last_name) {
        this.last_name = last_name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhoneNumber() {
        return phone_number;
    }
    
    public void setPhoneNumber(String phone_number) {
        this.phone_number = phone_number;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getCustomerAddress() {
        return customer_address;
    }
    
    public void setCustomerAddress(String customer_address) {
        this.customer_address = customer_address;
    }
    
    public String getBirthdate() {
        return birthdate;
    }
    
    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }
    

}
