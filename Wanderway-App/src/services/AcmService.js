import axios from 'axios';

const API_URL = 'http://localhost:8080/api/acc';

const addAccommodation = (accommodation) => axios.post(`${API_URL}/add`, accommodation);
const getAllAccommodations = () => axios.get(`${API_URL}/all`);
const updateAccommodation = (id, accommodation) => axios.put(`${API_URL}/update/${id}`, accommodation);
const deleteAccommodation = (id) => axios.delete(`${API_URL}/delete/${id}`);

export default {
  addAccommodation,
  getAllAccommodations,
  updateAccommodation,
  deleteAccommodation,
};