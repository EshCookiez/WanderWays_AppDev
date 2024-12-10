import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Refresh JWT Token
const refreshToken = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/refresh`, {}, {
            withCredentials: true // Assuming refresh token is stored in HTTP-only cookie
        });
        const newToken = response.data.jwtToken;
        localStorage.setItem('jwtToken', newToken);
        return newToken;
    } catch (error) {
        console.error('Token refresh failed:', error);
        // Optionally, redirect to login
        window.location.href = '/login';
        throw error;
    }
};
// Create a new payment
const createPayment = async (paymentData, authToken) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/acmpayment/create`, paymentData, {
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) { // Unauthorized, possibly token expired
            const newToken = await refreshToken();
            // Retry the original request with the new token
            const retryResponse = await axios.post(`${API_BASE_URL}/api/acmpayment/create`, paymentData, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(newToken && { 'Authorization': `Bearer ${newToken}` }),
                },
                withCredentials: true
            });
            return retryResponse.data;
        } else {
            handleError(error);
        }
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
        console.error('Backend returned status:', error.response.status);
        console.error('Response data:', error.response.data);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error setting up request:', error.message);
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