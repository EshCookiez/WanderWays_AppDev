import React, { useEffect, useState } from 'react';
import CustomerService from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await CustomerService.getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await CustomerService.deleteCustomer(id);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className="customer-list-container">
      <h2>Customer List</h2>
      <button className="add-customer-button" onClick={() => navigate('/addCustomer')}>
        Add Customer
      </button>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Password</th>
            <th>Address</th>
            <th>Birthdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerId}>
               <td>{customer.customerId}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.password}</td>
              <td>{customer.customerAddress}</td>
              <td>{customer.birthdate}</td>
              <td>
                <button onClick={() => navigate(`/updateCustomer/${customer.customerId}`)}>Edit</button>
                <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
