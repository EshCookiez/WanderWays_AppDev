import React, { useEffect, useState,useRef } from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';
import styles from './HotelPayment.module.css'; // Ensure this path is correct
import Header from '../../Components/Header'; // Adjust the import path as needed
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import userIcon from './acmAssets/user.png';
import barcode from './acmAssets/barcode.png';
import logo from './acmAssets/hotelBook.png';
import html2canvas from 'html2canvas';

import PaymentService from '../../services/PaymentService'; // Adjust the import path as needed

const HotelPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const bookingDetailsRef = useRef(null);

  const [accommodation, setAccommodation] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [bookingDetails, setBookingDetails] = useState({});
  const [accommodationLogo, setAccommodationLogo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (paymentId) {
        try {
          console.log('Fetching payment details for paymentId:', paymentId);
          const paymentData = await PaymentService.getPaymentById(paymentId);
          console.log('Payment Data:', paymentData);

          const {
            accommodationName,
            accommodationLocation,
            accommodationLogo,
            roomId,
            roomName,
            roomType,
            roomPrice,
            totalAmount,
            checkInDate,
            checkOutDate,
            checkInTime,
            checkOutTime,
            userFirstName,
            userLastName
          } = paymentData;

          setAccommodation({ name: accommodationName, location: accommodationLocation });
          setAccommodationLogo(accommodationLogo); // Base64 string
          setSelectedRoom({ roomId, roomName, roomType, roomPrice });
          setTotalAmount(totalAmount);
          setBookingDetails({ checkInDate, checkOutDate, checkInTime, checkOutTime, userFirstName, userLastName });
        } catch (err) {
          console.error('Error fetching payment details:', err);
          setError('Failed to load payment details.');
        }
      } else {
        navigate('/hotel');
      }
    };

    fetchPaymentDetails();
  }, [paymentId, navigate]);

  const handleDownloadPaymentDetails = () => {
    if (!bookingDetailsRef.current) {
      alert('No booking details available to download.');
      return;
    }
  
    html2canvas(bookingDetailsRef.current, { scale: 2 }) // Increased scale for better quality
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `booking_details_${paymentId}.png`; // Dynamic file name based on paymentId
        link.click();
      })
      .catch((err) => {
        console.error('Error generating image:', err);
        alert('Failed to generate image.');
      });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!accommodation || !selectedRoom) {
    return <p>Loading payment details...</p>;
  }

  return (
    <main className={styles.bookingConfirmation} role="main">
  <Header />
  <img src={logo} alt="background" className={styles.heroBackground} />
  <nav className={styles.locationNav} aria-label="Hotel location">
    <div className={styles.breadcrumb}>
      <span>Find Stays</span>
      <ChevronRightIcon />
      <span>{accommodation?.location}</span>
      <ChevronRightIcon />
      <span className={styles.hotelName}>{accommodation?.name}</span>
    </div>
  </nav>

  {/* <div>
    <h1>Payment Details</h1>
    <div ref={bookingDetailsRef}>
      <p>Accommodation: {accommodation?.name}</p>
      <p>Location: {accommodation?.location}</p>
      {accommodationLogo && (
        <img
          src={`data:image/png;base64,${accommodationLogo}`}
          alt="Accommodation Logo"
          style={{ width: '200px', height: 'auto' }}
        />
      )}
      <p>Room: {selectedRoom?.roomName} ({selectedRoom?.roomType})</p>
      <p>Price: ${selectedRoom?.roomPrice}</p>
      <p>Total Amount: ${totalAmount}</p>
      <p>Check-In Date: {bookingDetails.checkInDate}</p>
      <p>Check-Out Date: {bookingDetails.checkOutDate}</p>
      <p>Check-In Time: {bookingDetails.checkInTime}</p>
      <p>Check-Out Time: {bookingDetails.checkOutTime}</p>
      <p>User: {bookingDetails.userFirstName} {bookingDetails.userLastName}</p>
    </div>
    <button onClick={handleDownloadPaymentDetails}>Download Payment Details</button>
  </div> */}
  <section className={styles.hotelInfoContainer} aria-labelledby="hotelName" >
    <div className={styles.details}>
      <h1 id="hotelName" className={styles.title}>{accommodation?.name}</h1>
      <div className={styles.address}>
        <LocationOnIcon sx={{ fontSize: 15 }} />
        <span>{accommodation?.location}</span>
      </div>
    </div>
    <div className={styles.booking}>
      <div className={styles.price} aria-label={`Price: $${totalAmount} dollars`}>
        ${totalAmount}
      </div>
      <div className={styles.actions}>
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
          onClick={handleDownloadPaymentDetails}
        >
          Download
        </Button>
      </div>
    </div>
  </section>

  <section className={styles.bookingDetails} aria-label="Booking details" ref={bookingDetailsRef}>
    <div className={styles.dateSection}>
      <div className={styles.checkInOut}>
        <div className={styles.date}>
          <div className={styles.dateValue}>{bookingDetails.checkInDate}</div>
          <div className={styles.dateLabel}>Check-In</div>
        </div>
        <div className={styles.dateOut}>
          <div className={styles.dateValue}>{bookingDetails.checkOutDate}</div>
          <div className={styles.dateLabel}>Check-Out</div>
        </div>
      </div>
    </div>

    <div className={styles.guestInfo}>
      <div className={styles.guestHeader}>
        <Avatar alt={`${bookingDetails.userFirstName} ${bookingDetails.userLastName}`} src={userIcon} /> 
        <span className={styles.guestName}>{bookingDetails.userFirstName} {bookingDetails.userLastName}</span>
        <span className={styles.roomType}>{selectedRoom?.roomName} - {selectedRoom?.roomType}</span>
      </div>

      <div className={styles.timings}>
        <div className={styles.timeInfo}>
          <AccessTimeFilledIcon sx={{ color: '#ff8484' }} />
          <div className={styles.timeDetails}>
            <div className={styles.timeLabel}>Check-In time</div>
            <div className={styles.timeValue}>{bookingDetails.checkInTime}</div>
          </div>
        </div>
        <div className={styles.timeInfo}>
          <AccessTimeFilledIcon sx={{ color: '#ff8484' }} />
          <div className={styles.timeDetails}>
            <div className={styles.timeLabel}>Check-Out time</div>
            <div className={styles.timeValue}>{bookingDetails.checkOutTime}</div>
          </div>
        </div>
        <div className={styles.timeInfo}>
          <MeetingRoomIcon sx={{ color: '#ff8484' }} />
          <div className={styles.timeDetails}>
            <div className={styles.timeLabel}>Room no.</div>
            <div className={styles.timeValue}>On arrival</div>
          </div>
        </div>
      </div>

      <div className={styles.bookingCode}>
        <div>
          <div className={styles.codeValue}>EK</div>
          <div className={styles.codeLabel}>ABC12345</div>
        </div>
        <div className={styles.barcode} aria-label="Booking barcode">
          {[...Array(9)].map((_, index) => (
            <img 
              key={index}
              src={barcode}
              alt=""
              className={styles.barcodeSegment}
            />
          ))}
        </div>
      </div>
    </div>
    <div className={styles.qrContainer} aria-label="Booking QR code">
      <img 
        src={accommodationLogo ? `data:image/jpeg;base64,${accommodationLogo}` : 'https://via.placeholder.com/150'} 
        alt={`${accommodation?.name} Logo`}
        className={styles.hotelImage}
      />
    </div>
  </section>

  <section className={styles.termsContainer} aria-labelledby="termsTitle">
    <h2 id="termsTitle" className={styles.mainTitle}>Terms and Conditions</h2>
    
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Payments</h3>
      <p className={styles.sectionText}>
        If you are purchasing your ticket using a debit or credit card via the Website, 
        we will process these payments via the automated secure common payment gateway 
        which will be subject to fraud screening purposes.
      </p>
      <p className={styles.sectionText}>
        If you do not supply the correct card billing address and/or cardholder information, 
        your booking will not be confirmed and the overall cost may increase. We reserve the 
        right to cancel your booking if payment is declined for any reason or if you have 
        supplied incorrect card information. If we become aware of, or is notified of, any 
        fraud or illegal activity associated with the payment for the booking, the booking 
        will be cancelled and you will be liable for all costs and expenses arising from such 
        cancellation, without prejudice to any action that may be taken against us.
      </p>
    </div>

    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Contact Us</h3>
      <address className={styles.contactInfo}>
        If you have any questions about our Website or our Terms of Use, please contact:
        <br />
        WanderWays
        <br />
        Cebu, Philippines
        <br />
        Further contact details can be found at 
        <a 
          href="https://wanderways.com/help" 
          className={styles.helpLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          WanderWays.com/help
        </a>
      </address>
    </div>
  </section>
</main>
  );
};

export default HotelPayment;