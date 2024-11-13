import React, { useEffect, useState } from 'react';
import AcmService from '../../services/AcmService';
import { useNavigate } from 'react-router-dom';
import './AcmList.css';
import Header from '../../Components/Header';

const AcmList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccommodations();
  }, []);

  const fetchAccommodations = async () => {
    try {
      const response = await AcmService.getAllAccommodations();
      console.log('Fetched accommodations:', response.data); // Debugging line
      setAccommodations(response.data);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AcmService.deleteAccommodation(id);
      fetchAccommodations();
    } catch (error) {
      console.error('Error deleting accommodation:', error);
    }
  };

  return (
    <div className="acm-list-container">
      <Header/>
      <h2>Accommodation List</h2>
      {/* <button className="add-acm-button" onClick={() => navigate('/addAccommodation')}>
        Add Accommodation
      </button> */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accommodations.map((accommodation) => (
            <tr key={accommodation.id}>
              <td>{accommodation.id}</td>
              <td>{accommodation.acm_name}</td>
              <td>{accommodation.acm_location}</td>
              <td>{accommodation.acm_price}</td>
              <td>{accommodation.acm_type}</td>
              <td>
                <button onClick={() => navigate(`/acmForm/${accommodation.id}`)}>Edit</button>
                <button onClick={() => handleDelete(accommodation.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcmList;