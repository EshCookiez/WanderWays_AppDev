import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomerService from '../services/CustomerService';

const CustomerForm = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    customer_address: '',
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
      const foundCustomer = response.data.find((c) => c.customer_id === parseInt(customerId));
      if (foundCustomer) setCustomer(foundCustomer);
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
          name="first_name"
          value={customer.first_name}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="last_name"
          value={customer.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phone_number"
          value={customer.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
          required
        />
        <input
          type="password"
          name="password"
          value={customer.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          type="text"
          name="customer_address"
          value={customer.customer_address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="birthdate"
          value={customer.birthdate}
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
