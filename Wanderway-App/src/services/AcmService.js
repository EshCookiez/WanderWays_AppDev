import axios from 'axios';

const API_URL = 'http://localhost:8080/api/acc';

const addAccommodation = (accommodation) => axios.post(`${API_URL}/add`, accommodation, { withCredentials: true });
const getAllAccommodations = () => axios.get(`${API_URL}/all`);
const getAccommodationById = (id) => axios.get(`${API_URL}/${id}`);
const updateAccommodation = (id, accommodation) => axios.put(`${API_URL}/update/${id}`, accommodation, { withCredentials: true });
const deleteAccommodation = (id) => axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true });

export default {
  addAccommodation,
  getAllAccommodations,
  getAccommodationById,
  updateAccommodation,
  deleteAccommodation,
};