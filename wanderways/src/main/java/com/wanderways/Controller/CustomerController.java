package com.wanderways.Controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wanderways.Entity.Customer;
import com.wanderways.Service.CustomerService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    @Autowired
    private CustomerService custService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Customer";
    }

    @PostMapping("/addCustomer")
    public Customer addCustomer(@RequestBody Customer customer) {
        return custService.addCustomer(customer);
    }

    @GetMapping("/getAllCustomer")
    public List<Customer> getAllCustomer() {
        return custService.getAllCustomer();
    }

    @PutMapping("/updateCustomer/{id}")
    public Customer updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        return custService.updateCustomer(id, customer);
    }

    @DeleteMapping("/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable int id) {
        return custService.deleteCustomer(id);
    }
}