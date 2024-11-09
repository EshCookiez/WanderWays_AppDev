import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../../services/CustomerService';
import './CustomerForm.css';

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
        await CustomerService.updateCustomer(id, customer);
      } else {
        await CustomerService.addCustomer(customer);
      }
      // Navigate back to the customer list after submitting
      navigate('/customerList');
    } catch (error) {
      console.error('Error saving customer:', error);
    }
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
        <input
          type="password"
          name="password"
          value={customer.password} // Ensure correct state binding
          onChange={handleChange}
          placeholder="Password"
          required
        />
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
