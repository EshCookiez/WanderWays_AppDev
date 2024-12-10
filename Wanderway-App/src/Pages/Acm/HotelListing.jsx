import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import StarIcon from '@mui/icons-material/Star';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Slider from '@mui/material/Slider';

import Header from '../../Components/Header';
import AcmService from '../../services/AcmService';

import styles from './HotelListing.module.css';
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
  const navigate = useNavigate();
  
  const handleBookNow = (room) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      // User is not logged in, redirect to login page
      alert('Please log in to book a room.');
      navigate('/login');
      return;
    }

    if (selectedAccommodation && room) {
      console.log('Selected Accommodation in handleBookNow:', selectedAccommodation);
      console.log('Navigating with accommodationId:', selectedAccommodation.acm_id, 'roomId:', room.id);
      navigate('/hotelBook', { 
        state: { 
          accommodationId: selectedAccommodation.acm_id, // Pass specific ID
          roomId: room.id // Pass specific ID
        } 
      });
    } else if (selectedAccommodation) {
      const defaultRoom = selectedAccommodation.rooms && selectedAccommodation.rooms.length > 0 ? selectedAccommodation.rooms[0] : null;
      if (defaultRoom) {
        console.log('Navigating with accommodationId:', selectedAccommodation.acm_id, 'default roomId:', defaultRoom.id);
        navigate('/hotelBook', { 
          state: { 
            accommodationId: selectedAccommodation.acm_id,
            roomId: defaultRoom.id
          } 
        });
      } else {
        console.error('No rooms available for this accommodation.');
        setSearchError('No rooms available for this accommodation.');
      }
    } else {
      console.error('Accommodation data is missing.');
      setSearchError('Accommodation data is missing.');
    }
  };
  
  const handleOpen = (accommodation) => {
    console.log('Selected Accommodation:', accommodation); 
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
          acm_id: accommodation.id,
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
          // **Use acmLogo from backend**
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

  
  const handleSearch = (e) => {
    e.preventDefault();
  
    console.log('handleSearch triggered');
    console.log('Selected Type:', selectedType);
    console.log('Destination State:', destinationState);
    console.log('Check-In State:', checkInState);
    console.log('Check-Out State:', checkOutState);
  
    if (new Date(checkInState) >= new Date(checkOutState)) {
      setSearchError('Check-out date must be after check-in date.');
      return;
    }
  
    setSearchError('');
  
    const trimmedDestination = destinationState.trim().toLowerCase();
    const trimmedSelectedType = selectedType.trim().toLowerCase();
  
    const filtered = accommodations.filter((accommodation) => {
      const accommodationType = accommodation.acm_type.trim().toLowerCase();
      const accommodationLocation = accommodation.acm_location.trim().toLowerCase();
      console.log('Accommodation Type:', accommodationType);
      console.log('Accommodation Location:', accommodationLocation);
      return (
        accommodationType === trimmedSelectedType &&
        accommodationLocation.includes(trimmedDestination)
      );
    });
  
    console.log('Filtered Accommodations:', filtered);
  
    setFilteredAccommodations(filtered);
  
    if (filtered.length === 0) {
      setSearchError('Sorry, nothing is here.');
    } else {
      setSearchError('');
    }
  };

  const performInitialSearch = () => {
    console.log('performInitialSearch triggered');
    if (new Date(checkInState) >= new Date(checkOutState)) {
      setSearchError('Check-out date must be after check-in date.');
      return;
    }
    setSearchError('');
    
    const trimmedDestination = destinationState.trim().toLowerCase();
    const trimmedSelectedType = selectedType.trim().toLowerCase();
  
    const filtered = accommodations.filter((accommodation) => {
      const accommodationType = accommodation.acm_type.trim().toLowerCase();
      const accommodationLocation = accommodation.acm_location.trim().toLowerCase();
      console.log('Accommodation Type:', accommodationType);
      console.log('Accommodation Location:', accommodationLocation);
      return (
        accommodationType === trimmedSelectedType &&
        accommodationLocation.includes(trimmedDestination)
      );
    });
  
    console.log('performInitialSearch - Filtered Accommodations:', filtered);
    setFilteredAccommodations(filtered);
    
    if (filtered.length === 0) {
      setSearchError('Sorry, nothing is here.');
    } else {
      setSearchError('');
    }
  };



  const [value, setValue] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAccommodation(null);
  };

  return (
    <div className={styles.hotelListing}>
      <h1 className={styles.mainTitle}>
        <span className={styles.mainTitleHighlight}>Make Your Travel Now</span>
        <span className={styles.mainTitlePrefix}>Special offers to suit your plan</span>
      </h1>
      <Header />
      <img src={logo} alt="background" className={styles.heroBackground} />
      <div className={styles.searchMain}>
        <h1 className={styles.mainTitle}>
          <span className={styles.searchTitle}>Where are you staying?</span>
        </h1>
        <section className={styles.searchSection}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.inputGroup}>
              <TextField
                id="destination"
                label="Enter Destination"
                variant="outlined"
                fullWidth
                multiline
                value={destinationState}
                onChange={e => setDestinationState(e.target.value)}
                className={styles.customTextField}
                InputLabelProps={{
                  style: { textAlign: 'center', marginTop: '0px' },
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <TextField
                id="checkIn"
                label="Check In"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={checkInState}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
                onChange={e => setCheckInState(e.target.value)}
                className={styles.customTextField}
              />
            </div>
            <div className={styles.inputGroup}>
              <TextField
                id="checkOut"
                label="Check Out"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={checkOutState}
                inputProps={{ min: checkInState }}
                onChange={e => setCheckOutState(e.target.value)}
                className={styles.customTextField}
              />
            </div>
            <div className={styles.inputGroup}>
              <TextField
                id="roomsGuests"
                label="Rooms & Guests"
                select
                variant="outlined"
                fullWidth
                value={roomsGuestsState}
                onChange={e => setRoomsGuestsState(e.target.value)}
                className={styles.customTextField}
                InputLabelProps={{
                  style: { textAlign: 'left', marginTop: '0px' },
                }}
              >
                <MenuItem value="1 room, 1 guest">1 room, 1 guest</MenuItem>
                <MenuItem value="1 room, 2 guests">1 room, 2 guests</MenuItem>
                <MenuItem value="2 rooms, 4 guests">2 rooms, 4 guests</MenuItem>
                <MenuItem value="3 rooms, 6 guests">3 rooms, 6 guests</MenuItem>
              </TextField>
            </div>
            
            <button type="submit" className={styles.searchButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/39e7d1fb343ed6c3f97bbaa288ebef6317c359d89415ed0d9cfa599f2a10f75b?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                alt="Search"
                className={styles.searchIcon}
              />
            </button>
          </form>
        </section>
      </div>
      <section className={styles.hotelSection}>
        
      <section className={styles.hotelType}>
        <div className={styles.hotelList}>
          {['Hotels', 'Motels', 'Resorts'].map(type => (
            <Button
              key={type}
              className={`${styles.hotelTypeButton} ${selectedType === type ? styles.active : ''}`}
              onClick={() => setSelectedType(type)}
              sx={{
                fontWeight: selectedType === type ? 'bold' : 'normal',
                color: selectedType === type ? '#000000' : 'inherit',
                backgroundColor: selectedType === type ? '#8dd3bb' : 'inherit',
                textTransform: 'none',
                padding: '1rem 4rem',
                textAlign: 'center',
                '&:hover': {
                  backgroundColor: selectedType === type ? '#8dd3bb' : 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <h3>{type}</h3>
            </Button>
          ))}
        </div>
        <div className={styles.hotelList}>
          {searchError && (
            <Typography variant="h6" color="error">
              {searchError}
            </Typography>
          )}
          {filteredAccommodations.map(accommodation => (
            <Card key={accommodation.acm_id} className={styles.hotelCard}>
              <CardMedia
                component="img"
                height="100%"
                image={accommodation.imageSrc || 'https://via.placeholder.com/150'}
                alt={accommodation.acm_name}
                className={styles.hotelImage}
              />
              <CardContent className={styles.hotelCardContent}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className={styles.hotelTypo}
                  sx={{
                    fontWeight: 700,
                    fontSize: '24px',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  {accommodation.acm_name}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  <LocationOnIcon sx={{ fontSize: 15 }} />
                  Location: {accommodation.acm_location}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  {Array.from({ length: accommodation.rate }, (_, index) => (
                    <StarIcon key={index} sx={{ fontSize: 15, color: '#ff8484' }} />
                  ))}
                  Rating: {accommodation.rate}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  <EmojiFoodBeverageIcon sx={{ fontSize: 15 }} />
                  Amenities: {accommodation.amenities}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  Description: {accommodation.overview}
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.hotelTypo}
                  align="right"
                  sx={{ fontSize: 11, opacity: 0.75 }}
                >
                  Starting from
                </Typography>
                <Typography
                  variant="body2"
                  className={styles.hotelTypo}
                  align="right"
                  sx={{
                    color: '#ff8484',
                    fontWeight: 700,
                    fontSize: '24px',
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  ${accommodation.acm_price}/night
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    '& button': { m: 1, opacity: 0.75 },
                  }}
                >
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
                    onClick={() => handleOpen(accommodation)}
                  >
                    View Place
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      </section>
      {/* Modal Component */}
      <Modal
        aria-labelledby="accommodation-modal-title"
        aria-describedby="accommodation-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '90%', sm: '80%', md: '60%' },
                maxHeight: '90vh', 
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                borderRadius: '8px',
                overflowY: 'auto', 
              }}>
            {selectedAccommodation && (
              <>
              
                <h3 id="parent-modal-title">Overview</h3>

                {/* Accommodation Image */}
                <CardMedia
                  component="img"
                  height="100%"
                  image={selectedAccommodation.imageSrc || 'https://via.placeholder.com/150'}
                  alt={selectedAccommodation.acm_name}
                  sx={{ borderRadius: '8px', mb: 2 }}
                />

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Accommodation Name */}
                      <Typography
                        id="accommodation-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: 700, fontSize: '24px', fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {selectedAccommodation.acm_name}
                      </Typography>
                      
                      {/* Rating */}
                      <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                        {Array.from({ length: selectedAccommodation.rate }, (_, index) => (
                          <StarIcon key={index} sx={{ color: '#ff8484' }} />
                        ))}
                        <span style={{ marginLeft: '8px' }}>{selectedAccommodation.rate} Stars</span>
                      </Typography>

                    </Box>

                  {/* Location */}
                  <Typography id="accommodation-modal-description" sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon sx={{ marginRight: '4px' }} />
                  {selectedAccommodation.acm_location}
                </Typography>

                

                

                {/* Amenities */}
                <Typography sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <EmojiFoodBeverageIcon sx={{ marginRight: '4px' }} />
                  {selectedAccommodation.amenities}
                </Typography>

                {/* Description */}
                <Typography sx={{ mt: 2 }}>
                  Description: 
                  {selectedAccommodation.overview}
                </Typography>
                <hr class="solid"/>
                {/* Rooms Section */}
                <Typography variant="h6" gutterBottom sx={{fontWeight: 700}}>
                            Available Rooms
                  </Typography>
                  <List>
                      {selectedAccommodation.rooms && selectedAccommodation.rooms.length > 0 ? (
                        selectedAccommodation.rooms.map((room) => (
                          <React.Fragment key={room.id}>
                            <ListItem sx={{ display: 'flex', pl: 0, mb: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                              <img
                                src={room.image ? room.image : 'https://via.placeholder.com/100'}
                                alt={`Room ${room.name}`}
                                style={{ width: '100px', height: '100px', marginRight: '16px' }}
                              />
                              <ListItemText
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                                primary={`Room ${room.name} - ${room.type}`}
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="body2" sx={{ color: '#ff8484', fontWeight: 700 ,fontSize: 20}}>
                                    {`$${room.price}/night`}
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ 
                                      fontWeight: 700,
                                      backgroundColor: '#8dd3bb',
                                      color: '#000000',
                                      width: '80%',
                                      border: '2px solid #4c987e',
                                      fontFamily: 'Montserrat, sans-serif',
                                      '&:hover': {
                                        backgroundColor: '#4c987e',
                                        color: '#ffffff',
                                      }, }}
                                      onClick={() => handleBookNow(room)}
                                  >
                                    Book Now
                                  </Button>
                                </Box>
                              }
                              />
                            </ListItem>
                            <hr className={styles.solid} />
                          </React.Fragment>
                        ))
                      ) : (
                        <Typography variant="body2">No rooms available.</Typography>
                      )}
                    </List>
                  <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        mt: 2, // Adjusts the top margin as needed
                        gap: 2, // Adds space between Price and Close Button
                      }}
                    >
                      {/* Price */}
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '20px',
                          color: '#ff8484',
                        }}
                      >
                        Price: ${selectedAccommodation.acm_price}/night
                      </Typography>
                      
                      {/* buttonBox */}
                      <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-end',
                              '& button': { m: 1, opacity: 0.75 },
                            }}
                          >
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
                              onClick={() => handleBookNow()}
                            >
                              Book Now
                            </Button>
                          </Box>
                          
                      {/* Close Button */}
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: '#e01a1a',
                          color: '#fff',
                          fontWeight: 700,
                          fontFamily: 'Montserrat, sans-serif',
                          '&:hover': {
                            backgroundColor: '#72b9a3',
                            color: '#000000'
                          },
                        }}
                        onClick={(handleClose)}
                      >
                        Close
                      </Button>
                    </Box>
                    
              </>
            )}
          </Box>
        </Fade>
      </Modal>
      
      <Footer/>
    </div>
  );
};

export default HotelListing;