import axios from 'axios';

const API_URL = 'http://localhost:8080/api/rooms';

const addRoom = (room) => axios.post(`${API_URL}/add`, room);
const getAllRooms = () => axios.get(`${API_URL}/all`);
const updateRoom = (id, room) => axios.put(`${API_URL}/update/${id}`, room);
const deleteRoom = (id) => axios.delete(`${API_URL}/delete/${id}`);

export default {
  addRoom,
  getAllRooms,
  updateRoom,
  deleteRoom,
};