import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../Components/Header';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AcmService from '../../services/AcmService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from './HotelListing.module.css';

const HotelListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { destination, checkIn, checkOut, roomsGuests } = location.state || {};

  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [selectedType, setSelectedType] = useState('Hotels');
  const [destinationState, setDestinationState] = useState(destination || '');
  const [checkInState, setCheckInState] = useState(checkIn || '');
  const [checkOutState, setCheckOutState] = useState(checkOut || '');
  const [roomsGuestsState, setRoomsGuestsState] = useState(roomsGuests || '');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetchAccommodations();
  }, [selectedType]);

  useEffect(() => {
    if (destination || checkIn || checkOut || roomsGuests) {
      handleSearch();
    }
  }, [destination, checkIn, checkOut, roomsGuests]);

  const fetchAccommodations = async () => {
    try {
      const response = await AcmService.getAllAccommodations();
      const accommodationsWithImages = response.data.map(accommodation => {
        const imageSrc = accommodation.image && accommodation.image.length > 0
          ? `data:image/jpeg;base64,${accommodation.image}`
          : 'https://via.placeholder.com/150';
        return {
          ...accommodation,
          imageSrc
        };
      });
      setAccommodations(accommodationsWithImages);
      setFilteredAccommodations(accommodationsWithImages.filter(accommodation => accommodation.acm_type === selectedType));
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const filtered = accommodations.filter(accommodation =>
      accommodation.acm_type === selectedType &&
      accommodation.acm_location.toLowerCase().includes(destinationState.toLowerCase())
    );
    setFilteredAccommodations(filtered);
    if (filtered.length === 0) {
      setSearchError('Sorry, nothing is here.');
    } else {
      setSearchError('');
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
    <div className={styles.hotelListing}>
      <Header />
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
              onChange={(e) => setDestinationState(e.target.value)}
              className={styles.customTextField}
              InputLabelProps={{
                style: { textAlign: 'center', marginTop: '0px' }
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
              onChange={(e) => setCheckInState(e.target.value)}
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
              onChange={(e) => setCheckOutState(e.target.value)}
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
              onChange={(e) => setRoomsGuestsState(e.target.value)}
              className={styles.customTextField}
              InputLabelProps={{
                style: { textAlign: 'left', marginTop: '0px' }
              }}
            >
              <MenuItem value="1 room, 1 guest">1 room, 1 guest</MenuItem>
              <MenuItem value="1 room, 2 guests">1 room, 2 guests</MenuItem>
              <MenuItem value="2 rooms, 4 guests">2 rooms, 4 guests</MenuItem>
              <MenuItem value="3 rooms, 6 guests">3 rooms, 6 guests</MenuItem>
            </TextField>
          </div>
          <button type="submit" className={styles.searchButton}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/39e7d1fb343ed6c3f97bbaa288ebef6317c359d89415ed0d9cfa599f2a10f75b?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="Search" className={styles.searchIcon} />
          </button>
        </form>
      </section>
      <section className={styles.hotelType}>
        <div className={styles.hotelList}>
          {['Hotels', 'Motels', 'Resorts'].map((type) => (
            <Button
              key={type}
              className={`${styles.hotelTypeButton} ${selectedType === type ? styles.active : ''}`}
              onClick={() => setSelectedType(type)}
              sx={{
                fontWeight: selectedType === type ? 'bold' : 'normal',
                color: selectedType === type ? '#fff' : 'inherit',
                backgroundColor: selectedType === type ? '#007bff' : 'inherit',
                textTransform: 'none',
                padding: '10px',
                textAlign: 'center',
                '&:hover': {
                  backgroundColor: selectedType === type ? '#0056b3' : 'rgba(0, 0, 0, 0.08)',
                },
              }}
            >
              <h3>{type}</h3>
            </Button>
          ))}
        </div>
        <div className={styles.hotelList}>
          {searchError && <Typography variant="h6" color="error">{searchError}</Typography>}
          {filteredAccommodations.map(accommodation => (
            <Card key={accommodation.acm_id} className={styles.hotelCard}>
              <CardMedia
                component="img"
                height="140"
                image={accommodation.imageSrc || 'https://via.placeholder.com/150'}
                alt={accommodation.acm_name}
                className={styles.hotelImage}
              />
              <CardContent className={styles.hotelCardContent}>
                <Typography gutterBottom variant="h5" component="div" className={styles.hotelTypo}>
                  {accommodation.acm_name}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  Location: {accommodation.acm_location}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  Price: ${accommodation.acm_price}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  Rating: {accommodation.rate}
                </Typography>
                <Typography variant="body2" className={styles.hotelTypo}>
                  Amenities: {accommodation.amenities}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HotelListing;