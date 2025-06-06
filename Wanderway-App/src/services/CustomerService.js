import axios from 'axios';

const API_URL = 'http://localhost:8080/api/customer';

const addCustomer = (customer) => axios.post(`${API_URL}/signup`, customer, {
  headers: {
    'Content-Type': 'application/json',  // Explicitly set Content-Type to application/json
  }
});

const getAllCustomers = () => axios.get(`${API_URL}/getAllCustomer`);
const updateCustomer = (id, customer) => axios.put(`${API_URL}/updateCustomer/${id}`, customer);
const deleteCustomer = (id) => axios.delete(`${API_URL}/deleteCustomer/${id}`);

export default {
  addCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};
