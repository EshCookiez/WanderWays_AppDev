import React, { useEffect, useState } from 'react';
import CustomerService from '../services/CustomerService';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Customer List</h2>
      <button onClick={() => navigate('/addCustomer')}>Add Customer</button>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customerId}>
            {customer.firstName} {customer.lastName} - {customer.email}
            <button onClick={() => navigate(`/edit/${customer.customerId}`)}>Edit</button>
            <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
