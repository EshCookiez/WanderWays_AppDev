import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RoomService from '../../services/RoomService';
import './RoomForm.css';

const RoomForm = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({
    room_name: '',
    room_type: '',
    room_price: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchRoomById(id);
    }
  }, [id]);

  const fetchRoomById = async (roomId) => {
    try {
      const response = await RoomService.getAllRooms();
      const foundRoom = response.data.find((r) => r.room_id === parseInt(roomId));
      if (foundRoom) {
        setRoom({
          room_name: foundRoom.room_name || '',
          room_type: foundRoom.room_type || '',
          room_price: foundRoom.room_price || '',
        });
      }
    } catch (error) {
      console.error('Error fetching room:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await RoomService.updateRoom(id, room);
      } else {
        await RoomService.addRoom(room);
      }
      // Navigate back to the room list after submitting
      navigate('/roomList');
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Room</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="room_name"
          value={room.room_name}
          onChange={handleChange}
          placeholder="Room Name"
          required
        />
        <input
          type="text"
          name="room_type"
          value={room.room_type}
          onChange={handleChange}
          placeholder="Room Type"
          required
        />
        <input
          type="number"
          name="room_price"
          value={room.room_price}
          onChange={handleChange}
          placeholder="Room Price"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RoomForm;