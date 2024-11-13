import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../../services/CustomerService';
import './CustomerForm.css';
import axios from 'axios';

// Add FontAwesome for the eye icon (you can install FontAwesome or use inline SVG)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const CustomerForm = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    customerAddress: '',
    birthdate: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCustomerById(id);
    }
  }, [id]);

  const fetchCustomerById = async (customerId) => {
    try {
      const response = await CustomerService.getAllCustomers();
      const foundCustomer = response.data.find((c) => c.customerId === parseInt(customerId)); // Use the new customerId key
      if (foundCustomer) {
        setCustomer({
          firstName: foundCustomer.firstName || '',
          lastName: foundCustomer.lastName || '',
          email: foundCustomer.email || '',
          phoneNumber: foundCustomer.phoneNumber || '',
          password: foundCustomer.password || '', // Note: Handle password securely
          customerAddress: foundCustomer.customerAddress || '',
          birthdate: foundCustomer.birthdate || '',
        });
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Updating an existing customer
        const response = await axios.put(
          `http://localhost:8080/api/customer/updateCustomer/${id}`,
          customer,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        console.log('Customer successfully updated:', response.data);
      } else {
        // Adding a new customer
        const response = await axios.post(
          'http://localhost:8080/api/customer/signup',
          customer,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        console.log('Customer successfully added:', response.data);
      }

      // Navigate to the customer list after success
      navigate('/customerList');
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Customer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={customer.firstName} // Ensure correct state binding
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={customer.lastName} // Ensure correct state binding
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={customer.email} // Ensure correct state binding
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={customer.phoneNumber} // Ensure correct state binding
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />

        {/* Password Input with Icon Inside */}
        <div className="password-container">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            value={customer.password} // Ensure correct state binding
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <FontAwesomeIcon 
            icon={isPasswordVisible ? faEyeSlash : faEye} 
            onClick={togglePasswordVisibility} 
            className="password-toggle-icon" 
          />
        </div>

        <input
          type="text"
          name="customerAddress"
          value={customer.customerAddress} // Ensure correct state binding
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="birthdate"
          value={customer.birthdate} // Ensure correct state binding
          onChange={handleChange}
          placeholder="Birthdate (YYYY-MM-DD)"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerForm;
