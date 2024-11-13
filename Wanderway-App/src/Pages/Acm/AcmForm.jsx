import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AcmService from '../../services/AcmService';
import './AcmForm.css';

const AcmForm = () => {
  const { id } = useParams();
  const [accommodation, setAccommodation] = useState({
    acm_name: '',
    acm_location: '',
    acm_price: '',
    acm_type: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchAccommodationById(id);
    }
  }, [id]);

  const fetchAccommodationById = async (accommodationId) => {
    try {
      const response = await AcmService.getAllAccommodations();
      const foundAccommodation = response.data.find((a) => a.id === parseInt(accommodationId));
      if (foundAccommodation) {
        setAccommodation({
          acm_name: foundAccommodation.acm_name || '',
          acm_location: foundAccommodation.acm_location || '',
          acm_price: foundAccommodation.acm_price || '',
          acm_type: foundAccommodation.acm_type || '',
        });
      }
    } catch (error) {
      console.error('Error fetching accommodation:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccommodation((prevAccommodation) => ({
      ...prevAccommodation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await AcmService.updateAccommodation(id, accommodation);
      } else {
        await AcmService.addAccommodation(accommodation);
      }
      // Navigate back to the accommodation list after submitting
      navigate('/list-accommodation');
    } catch (error) {
      console.error('Error saving accommodation:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Accommodation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="acm_name"
          value={accommodation.acm_name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="acm_location"
          value={accommodation.acm_location}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="number"
          name="acm_price"
          value={accommodation.acm_price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="acm_type"
          value={accommodation.acm_type}
          onChange={handleChange}
          placeholder="Type"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AcmForm;