import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AcmService from '../../services/AcmService';
import PaymentService from '../../services/PaymentService'; // Ensure this is imported if used
import styles from './HotelListing.module.css';
import Button from '@mui/material/Button';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import Slider from '@mui/material/Slider';

import Header from '../../Components/Header';

import logo from './acmAssets/HotelSearchBg.png';
import Footer from '../HomeLanding/Footer/Footer';
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #4c987e',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const HotelListing = () => {
  const location = useLocation();
  const { destination, checkIn, checkOut, roomsGuests } = location.state || {};

  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selectedType, setSelectedType] = useState('Hotels');
  const [destinationState, setDestinationState] = useState(destination || '');
  const [checkInState, setCheckInState] = useState(checkIn || '');
  const [checkOutState, setCheckOutState] = useState(checkOut || '');
  const [roomsGuestsState, setRoomsGuestsState] = useState(roomsGuests || '');
  const [searchError, setSearchError] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleBookNow = (room, accommodation) => {
    if (accommodation && room) {
      navigate('/hotelBook', { 
        state: { 
          accommodationId: accommodation.acm_id, // Pass accommodation ID
          roomId: room.id // Pass room ID
        } 
      });
    } else {
      console.error('Accommodation or Room data is missing.');
      setError('Accommodation or Room data is missing.');
    }
  };
  
  const handleOpen = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  useEffect(() => {
    fetchAccommodations();
  }, [selectedType]);

  useEffect(() => {
    // Trigger initial search only when accommodations are loaded
    if (accommodations.length > 0 && (destination || checkIn || checkOut || roomsGuests)) {
      performInitialSearch();
    }
  }, [accommodations, destination, checkIn, checkOut, roomsGuests]);

  const fetchAccommodations = async () => {
    try {
      const response = await AcmService.getAllAccommodations();

      // Check if response.data is an array
      if (Array.isArray(response.data)) {
        const accommodationsWithImages = response.data.map((accommodation) => ({
          acm_id: accommodation.acm_id,
          acm_name: accommodation.acm_name,
          acm_type: accommodation.acm_type,
          acm_location: accommodation.acm_location,
          acm_price: accommodation.acm_price,
          amenities: accommodation.amenities,
          rate: accommodation.rate,
          overview: accommodation.overview,
          imageSrc: accommodation.image
            ? `data:image/jpeg;base64,${accommodation.image}`
            : 'https://via.placeholder.com/150',
          acmLogoSrc: accommodation.acmLogo
            ? `data:image/jpeg;base64,${accommodation.acmLogo}`
            : 'https://via.placeholder.com/150',
          rooms: Array.isArray(accommodation.rooms)
            ? accommodation.rooms.map((room) => ({
                id: room.roomId,
                name: room.roomName,
                type: room.roomType,
                price: room.roomPrice,
                image: room.image
                  ? `data:image/jpeg;base64,${room.image}`
                  : 'https://via.placeholder.com/150',
              }))
            : [], // Default to empty array if rooms is undefined
        }));

        setAccommodations(accommodationsWithImages);
        setFilteredAccommodations(
          accommodationsWithImages.filter(
            (accommodation) => accommodation.acm_type === selectedType
          )
        );
      } else {
        // Handle unexpected response structure
        console.error('Unexpected response format:', response.data);
        setSearchError('Failed to load accommodations. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      setSearchError('Failed to load accommodations.');
    }
  };

  const performInitialSearch = () => {
    // Implement your search logic here
  };

  const handleSearch = (e) => {
    // Implement your search handler here
  };

  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.listingContainer}>
      {/* Accommodation Listing */}
      {filteredAccommodations.map((accommodation) => (
        <div key={accommodation.acm_id} className={styles.accommodationCard}>
          <img src={accommodation.imageSrc} alt={accommodation.acm_name} className={styles.accommodationImage} />
          <h3>{accommodation.acm_name}</h3>
          <p>Location: {accommodation.acm_location}</p>
          <p>Price: ${accommodation.acm_price}</p>
          <p>
            Rating: {accommodation.rate} <StarIcon />
          </p>
          <div className={styles.roomsContainer}>
            {accommodation.rooms.map((room) => (
              <div key={room.id} className={styles.roomCard}>
                <img src={room.image} alt={room.name} className={styles.roomImage} />
                <h4>
                  {room.name} - {room.type}
                </h4>
                <p>Price per night: ${room.price}</p>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: '#fff',
                      color: '#000000',
                      width: '10%',
                      border: '2px solid #4c987e',
                      '&:hover': {
                        backgroundColor: '#4c987e',
                      },
                    }}
                  >
                    <BookmarkBorderIcon />
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    sx={{
                      fontWeight: 700,
                      backgroundColor: '#8dd3bb',
                      color: '#000000',
                      width: '100%',
                      border: '2px solid #4c987e',
                      fontFamily: 'Montserrat, sans-serif',
                      '&:hover': {
                        backgroundColor: '#4c987e',
                        color: '#ffffff',
                      },
                    }}
                    onClick={() => handleBookNow(room, accommodation)} // Corrected parameters
                  >
                    Book Now
                  </Button>
                </Box>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Error Messages */}
      {searchError && <p className={styles.error}>{searchError}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {/* Modal or additional UI components can be added here */}
    </div>
  );
};

export default HotelListing;