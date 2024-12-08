import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './HotelBooking.module.css';
import Header from '../../Components/Header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import logo from './acmAssets/hotelBook.png';
import TextField from '@mui/material/TextField';
import PaymentService from '../../services/PaymentService';

import StarIcon from '@mui/icons-material/Star';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const HotelBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { accommodation, defaultRoom } = location.state || {};
  const [checkInState, setCheckInState] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutState, setCheckOutState] = useState('');
  const [checkOutTime, setCheckOutTime] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(defaultRoom ? defaultRoom.id : null);
  
  if (!accommodation || !defaultRoom) {
    return <p>No accommodation or room data available.</p>;
  }

  const priceItems = [
    { label: 'Base Fare', amount: Number(defaultRoom.price) }, // Ensuring it's a number
    { label: 'Discount', amount: 0 },
    { label: 'Taxes', amount: 20 },
    { label: 'Service Fee', amount: 5 },
  ];
  
  const totalAmount = priceItems.reduce((accumulator, item) => {
    return accumulator + item.amount;
  }, 0);
  
  const priceItemsWithTotal = [
    ...priceItems,
    { label: 'Total', amount: totalAmount },
  ];

  const today = new Date().toISOString().split('T')[0];

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setCheckInState(newCheckIn);

    if (checkOutState && newCheckIn >= checkOutState) {
      setCheckOutState('');
    }
  };

  const handleCancel = () => {
    navigate('/hotel');
  };

  const handleCheckInTimeChange = (e) => {
    setCheckInTime(e.target.value);
  };

  const handleCheckOutTimeChange = (e) => {
    setCheckOutTime(e.target.value);
  };

  const handleCheckOutChange = (e) => {
    setCheckOutState(e.target.value);
  };

  const getMinCheckOutDate = () => {
    if (checkInState) {
      const checkInDate = new Date(checkInState);
      checkInDate.setDate(checkInDate.getDate() + 1);
      return checkInDate.toISOString().split('T')[0];
    }
    return today;
  };
  // Add this function above your handleProceedToPayment function

const calculateTotalAmount = () => {
  return totalAmount;
};

  const handleProceedToPayment = async () => {
    // Validate required fields
    if (!selectedRoomId) {
      console.error('No room selected');
      // Optionally, set an error state to display a message to the user
      return;
    }
  
    if (!checkInState || !checkOutState || !checkInTime || !checkOutTime) {
      console.error('Missing booking details');
      // Optionally, set an error state to display a message to the user
      return;
    }
  
    const paymentData = {
      checkInDate: checkInState,
      checkOutDate: checkOutState,
      checkInTime,
      checkOutTime,
      roomsSelected: { roomId: selectedRoomId }, // Nested object
      accommodation: { id: accommodation.id },     // Nested object
      totalAmount: calculateTotalAmount(),
    };
  
    console.log('Payment Data:', paymentData); // Verify the payload
  
    try {
      const response = await PaymentService.createPayment(paymentData);
      console.log('Payment Successful:', response);
      navigate('/payment-success'); // Navigate to a confirmation page
    } catch (error) {
      console.error('Payment Error:', error);
      // Optionally, set an error state to display a message to the user
    }
  };

  return (
    <main className={styles.bookingContainer} role="main">
      <Header />
      <img src={logo} alt="background" className={styles.heroBackground} />
      
      <div className={styles.contentWrapper}>
        <section className={styles.bookingDetails} aria-label="Booking Details">
          <nav className={styles.locationNav} aria-label="Hotel location">
            <div className={styles.breadcrumb}>
              <span>Find Stays</span>
              <ChevronRightIcon />
              <span>{accommodation.acm_location}</span>
              <ChevronRightIcon />
              <span className={styles.hotelNameNav}>{accommodation.acm_name}</span>
            </div>
          </nav>

          <div className={styles.roomHeader}>
            <img 
              src={defaultRoom.image || 'https://via.placeholder.com/150'} 
              alt={`${defaultRoom.name} Image`}
              className={styles.hotelImage}
            />
            <h1 className={styles.roomTitle}>
              {defaultRoom.name} - {defaultRoom.type}
            </h1>
            <div className={styles.pricePerNight} aria-label="Price per night">
              <span className={styles.amount}>${defaultRoom.price}</span>
              <span className={styles.nightRate}>/night</span>
            </div>
          </div>
          
          <article className={styles.hotelInfo} aria-label="Hotel Information">
            <img 
              src={accommodation.acmLogoSrc || 'https://via.placeholder.com/150'} 
              alt={`${accommodation.acm_name} Logo`}
              className={styles.hotelImage}
            />
            <div className={styles.hotelDetails}>
              <h2 className={styles.hotelName}>{accommodation.acm_name}</h2>
              <div className={styles.addressContainer}>
                <address className={styles.address}>
                  <LocationOnIcon sx={{fontSize: 15}}/>
                  {accommodation.acm_location}
                </address>
              </div>
            </div>
          </article>

          <div className={styles.dateSection} role="group" aria-label="Check-in and Check-out dates">
            <div className={styles.dateDisplay}>
              <div className={styles.inputGroup}>
                <TextField
                  id="checkIn"
                  label="Check In Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={checkInState}
                  inputProps={{ min: today }}
                  onChange={handleCheckInChange}
                  className={styles.customTextField}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <TextField
                  id="checkInTime"
                  label="Check In Time"
                  type="time"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={checkInTime}
                  onChange={handleCheckInTimeChange}
                  className={styles.customTextField}
                  inputProps={{ step: 300 }} // 5 minutes
                />
              </div>
            </div>
            
            <div className={styles.dateConnector} aria-hidden="true">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf5d76583c8aa9d03d09967e1e75f9c4a4540d561968ffc279c72e30d8cb34b3?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" 
                className={styles.hotelImage}
                style={{ transform: 'rotate(90deg)', height: '50px',width: '50px' }} />
            </div>
            
            <div className={styles.dateDisplay}>
              <div className={styles.inputGroup}>
                <TextField
                  id="checkOut"
                  label="Check Out Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={checkOutState}
                  inputProps={{ min: getMinCheckOutDate() }}
                  onChange={handleCheckOutChange}
                  className={styles.customTextField}
                  disabled={!checkInState}
                />
              </div>
              
              <div className={styles.inputGroup}>
                <TextField
                  id="checkOutTime"
                  label="Check Out Time"
                  type="time"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={checkOutTime}
                  onChange={handleCheckOutTimeChange}
                  className={styles.customTextField}
                  inputProps={{ step: 300 }} // 5 minutes
                  disabled={!checkOutState}
                />
              </div>
            </div>
          </div>
        </section>
        
        <aside className={styles.summaryCard} aria-label="Booking Summary">
          <div className={styles.hotelSummary}>
            <img 
              src={accommodation.imageSrc || 'https://via.placeholder.com/150'} 
              alt={accommodation.acm_name}
              className={styles.roomImage}
            />
            <div className={styles.summaryDetails}>
              <h3 className={styles.summaryHotelName}>{accommodation.acm_name}</h3>
              <p className={styles.roomType}>
                {defaultRoom.name} - {defaultRoom.type}
              </p>
              <div className={styles.ratingContainer}>
                <span className={styles.reviewText}>
                  {Array.from({ length: accommodation.rate }, (_, index) => (
                    <StarIcon key={index} sx={{ fontSize: 15, color: '#ff8484' }} />
                  ))} {accommodation.rate}
                </span>
              </div>
            </div>
          </div>

          <hr className={styles.divider} aria-hidden="true" />
          
          <p className={styles.protection}>
            Your booking is protected by <strong>WanderWays</strong>
          </p>
          
          <hr className={styles.divider} aria-hidden="true" />
          
          <section className={styles.priceDetails} aria-labelledby="priceDetailsTitle">
            <h2 id="priceDetailsTitle" className={styles.priceTitle}>
              Price Details
            </h2>
            {priceItemsWithTotal.map((item, index) => (
              <div 
                key={`price-${index}`} 
                className={styles.priceRow}
                role="group"
                aria-label={`${item.label}: $${item.amount}`}
              >
                <div className={styles.priceLabel}>{item.label}</div>
                <div className={styles.priceAmount}>${item.amount}</div>
              </div>
            ))}
          </section>

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
                fontWeight: 900,
                backgroundColor: '#f73f3f',
                color: '#000000',
                width: '100%',
                border: '2px solid #f71717',
                '&:hover': {
                  backgroundColor: '#e01a1a',
                  color: '#fff',
                },
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="medium"
              sx={{
                fontWeight: 900,
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
              onClick={handleProceedToPayment}
            >
              BOOK NOW
            </Button>
          </Box>
        </aside>
      </div>
    </main>
  );
};

export default HotelBooking;
