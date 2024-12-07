// FILE: PaymentService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/acmpayments'; // Ensure this URL matches your backend routing

// Get JWT token from local storage or other storage mechanism
const getToken = () => {
  return localStorage.getItem('token'); // Adjust based on how you store the token
};

const createPayment = (paymentData) => {
  return axios.post(`${API_URL}/add`, paymentData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}` // Include the JWT token
    },
    withCredentials: true
  });
};

const getAllPayments = () => {
  return axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    withCredentials: true
  });
};

const getPaymentById = (id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    withCredentials: true
  });
};

const updatePayment = (id, paymentData) => {
  return axios.put(`${API_URL}/update/${id}`, paymentData, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    withCredentials: true
  });
};

const deletePayment = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    },
    withCredentials: true
  });
};

export default {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
