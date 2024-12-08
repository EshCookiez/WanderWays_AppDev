import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// PaymentService.js

const createPayment = async (paymentData, authToken) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/acmpayment/create`, paymentData, {
            headers: {
                'Content-Type': 'application/json', // Include auth token if required
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error creating payment:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        throw error;
    }
};

export default {
    createPayment,
};