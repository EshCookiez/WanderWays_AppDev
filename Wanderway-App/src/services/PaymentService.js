import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Create a new payment
const createPayment = async (paymentData, authToken) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/acmpayment/create`, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                // Include auth token if required
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get all payments
const getAllPayments = async (authToken) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/acmpayment/all`, {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Get a payment by ID
const getPaymentById = async (paymentId, authToken) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/acmpayment/${paymentId}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Update a payment
const updatePayment = async (paymentId, paymentData, authToken) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/acmpayment/update/${paymentId}`, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Delete a payment
const deletePayment = async (paymentId, authToken) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/acmpayment/delete/${paymentId}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Handle errors
const handleError = (error) => {
    if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Error:', error.response.data);
    } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
    } else {
        // Something else happened
        console.error('Error:', error.message);
    }
    throw error;
};

export default {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};