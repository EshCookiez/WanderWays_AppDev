package com.wanderways.Controller;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

import com.wanderways.Entity.Customer;
import com.wanderways.Service.CustomerService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService custService;

    @GetMapping("/print")
    public String print() {
        return "Hello, Customer";
    }

    @PostMapping("/login")
public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
    Optional<Customer> customer = custService.login(email, password);
    
    if (customer.isPresent()) {
        return ResponseEntity.ok("Login successful");
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }
}

    // add customer
    @PostMapping("/signup")
    public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
    System.out.println("Received customer: " + customer);  // Logging the request body
    try {
        Customer createdCustomer = custService.addCustomer(customer);
        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}


    @GetMapping("/getAllCustomer")
    public List<Customer> getAllCustomer() {
        return custService.getAllCustomer();
    }

    @PutMapping("/updateCustomer/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
    Optional<Customer> existingCustomer = custService.findCustomerById(id);

    if (existingCustomer.isPresent()) {
        // Perform the update if customer exists
        Customer updatedCustomer = custService.updateCustomer(id, customer);
        return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
    } else {
        // Return 404 Not Found if customer does not exist
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}


    @DeleteMapping("/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable int id) {
        return custService.deleteCustomer(id);
    }
}