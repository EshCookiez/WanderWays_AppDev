package com.wanderways.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wanderways.Entity.Customer;
import com.wanderways.Repository.CustomerRepo;

@Service
public class CustomerService {
    
    @Autowired
    private CustomerRepo crepo;
    
    public Customer addCustomer (Customer customer){
            return crepo.save(customer);
    }

    public List<Customer> getAllCustomer() {
        return crepo.findAll();
    }

    public Optional<Customer> findCustomerById(int id) {
        return crepo.findById(id);
    }
    public Customer updateCustomer(int id, Customer customer) {
        Optional<Customer> existingCustomer = crepo.findById(id);
        if (existingCustomer.isPresent()) {
            Customer updatedCustomer = existingCustomer.get();
            updatedCustomer.setFirstName(customer.getFirstName());
            updatedCustomer.setLastName(customer.getLastName());
            updatedCustomer.setEmail(customer.getEmail());
            updatedCustomer.setPhoneNumber(customer.getPhoneNumber());
            updatedCustomer.setPassword(customer.getPassword());
            updatedCustomer.setCustomerAddress(customer.getCustomerAddress());
            updatedCustomer.setBirthdate(customer.getBirthdate());
            return crepo.save(updatedCustomer);
        } else {
            throw new NoSuchElementException("Customer not found with id: " + id);
        }
    }

    public String deleteCustomer(int id) {
        crepo.deleteById(id);
        return "Customer deleted with id: " + id;
    }

    public Optional<Customer> login(String email, String password) {
        return crepo.findByEmailAndPassword(email, password);
    }

}
