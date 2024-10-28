import React, { useEffect, useState } from 'react';
import RoomService from '../../services/RoomService';
import { useNavigate } from 'react-router-dom';
import './RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await RoomService.getAllRooms();
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await RoomService.deleteRoom(id);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div className="room-list-container">
      <h2>Room List</h2>
      <button className="add-room-button" onClick={() => navigate('/addRoom')}>
        Add Room
      </button>
      <table>
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Room Name</th>
            <th>Room Type</th>
            <th>Room Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.room_id}>
              <td>{room.room_id}</td>
              <td>{room.room_name}</td>
              <td>{room.room_type}</td>
              <td>{room.room_price}</td>
              <td>
                <button onClick={() => navigate(`/updateRoom/${room.room_id}`)}>Edit</button>
                <button onClick={() => handleDelete(room.room_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomList;