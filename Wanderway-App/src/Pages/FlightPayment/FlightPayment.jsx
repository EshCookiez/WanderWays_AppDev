import React, { useEffect, useState, useRef} from 'react';
import styles from './FlightPayment.module.css'
import Header from '../../Components/Header.jsx';
import html2canvas from 'html2canvas';
import { useParams, useNavigate , useLocation} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import userIcon from './Assets/user.png';
import barcode from './Assets/barcode.png';
import logo from './Assets/lobby2.jpg';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

function FlightPayment(){
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Get query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const bookingId = queryParams.get('bookingid');
    const origin = queryParams.get('origin');
    const destination = queryParams.get('destination');
    const price = queryParams.get('price');
    const departure = queryParams.get('departure');
    const arrival = queryParams.get('arrival');
    const flightclass = queryParams.get('flightclass')
    const fareclass = queryParams.get('fareclass')
    const passengers = queryParams.get('passengers')

    const serviceFee = price * 0.30;
    const flightFee = price * 0.50;
    const baggageFee = price * 0.10;
    const taxFee = price * 0.05;
    const insuranceFee = price * 0.05;
    
    const bookingDetailsRef = useRef(null);

    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [userIcon, setUserIcon] = useState(null);

    const fetchUserIcon = async (token) => {
      try {
        const response = await axios.get('http://localhost:8080/auth/userIcon', {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'blob',
        });
        const iconUrl = URL.createObjectURL(response.data);
        setUserIcon(iconUrl);
      } catch (err) {
        console.error('Failed to fetch user icon:', err);
      }
    };

    const fetchUserName = async (token) => {
      try {
        const response = await axios.get('http://localhost:8080/auth/userProfile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { firstName, lastName } = response.data;
        setUserName(`${firstName} ${lastName}`);
      } catch (err) {
        console.error('Failed to fetch user name:', err);
      }
    };
    
    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      setIsLoggedIn(!!token);
      if (token) {
        fetchUserName(token);
        fetchUserIcon(token);
      }
    }, []);

    const handlePayment = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/bookings/status/${bookingId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'Fully Paid' }),
          });
          

        if (!bookingDetailsRef.current) {
          return;
        }

        html2canvas(bookingDetailsRef.current).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = imgData;
          link.download = 'flight_booking_details.png';
          link.click();
        }).catch((err) => {
          console.error('Error generating image:', err);
        });

        if (response.ok) {
          setTimeout(() => {
            navigate('/list-flight');
          }, 5000);
        } else {
          setMessage("Booking unsuccessfully Paid")
        }
        } catch (error) {
          console.error('Error updating booking status:', error);
        }

      };

    return(
<main className={styles.bookingConfirmation} role="main">
      <Header />
      <img src={logo} alt="background" className={styles.heroBackground} />
      <nav className={styles.locationNav} aria-label="Hotel location">
        <div className={styles.breadcrumb}>
          <span>Find Flights</span>
          <ChevronRightIcon />
          <span>{destination}</span>
          <ChevronRightIcon />
          <span className={styles.hotelName}>{flightclass}</span>
        </div>
      </nav>

      <section className={styles.hotelInfoContainer} aria-labelledby="hotelName">
        <div className={styles.details}>
          <h1 id="hotelName" className={styles.title}>{destination}</h1>
          <div className={styles.address}>
            <LocationOnIcon sx={{ fontSize: 15 }} />
            <span>{origin}</span>
          </div>
        </div>
        <div className={styles.booking}>
          <div className={styles.price} aria-label={`Price: $ {price} dollars`}>
            ${price}
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
            onClick={handlePayment}
          >
            Pay Now
          </Button>
          </div>
        </div>
      </section>

      <section className={styles.bookingDetails} aria-label="Booking details" ref={bookingDetailsRef}>
        <div className={styles.dateSection}>
          <div className={styles.checkInOut}>
            <div className={styles.date}>
              <div className={styles.dateValue}>{departure}</div>
              <div className={styles.dateLabel}>Departs </div>
            </div>
            <div className={styles.dateOut}>
              <div className={styles.dateValue}>{arrival}</div>
              <div className={styles.dateLabel}>Arrives</div>
            </div>
          </div>
        </div>

        <div className={styles.guestInfo}>
          <div className={styles.guestHeader}>
          <Avatar className='userIcon' alt="User" src={userIcon || '/path/to/default.png'} />
            <span className={styles.guestName}>{userName} </span>
            <span className={styles.roomType}>{fareclass } Class </span>
          </div>

          <div className={styles.timings}>
            <div className={styles.timeInfo}>
              <AccessTimeFilledIcon sx={{ color: '#ff8484' }} />
              <div className={styles.timeDetails}>
                <div className={styles.timeLabel}>DESTINATION</div>
                <div className={styles.timeValue}>{destination}</div>
              </div>
            </div>
            <div className={styles.timeInfo}>
              <AccessTimeFilledIcon sx={{ color: '#ff8484' }} />
              <div className={styles.timeDetails}>
                <div className={styles.timeLabel}>ORIGIN</div>
                <div className={styles.timeValue}>{origin}</div>
              </div>
            </div>
            <div className={styles.timeInfo}>
              <MeetingRoomIcon sx={{ color: '#ff8484' }} />
              <div className={styles.timeDetails}>
                <div className={styles.timeLabel}>Passengers</div>
                <div className={styles.timeValue}>{passengers}</div>
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
        
          <div className={styles.paymentDetails} aria-label="Payment Details">
            <span className={styles.title}>PAYMENT DETAILS</span>
            <ul className={styles.paymentBreakdown}>
              <li>
                <strong>Service Fee:</strong> ${serviceFee.toFixed(2)}
              </li>
              <li>
                <strong>Flight Fee:</strong> ${flightFee.toFixed(2)}
              </li>
              <li>
                <strong>Baggage Fee:</strong> ${baggageFee.toFixed(2)}
              </li>
              <li>
                <strong>Tax Fee:</strong> ${taxFee.toFixed(2)}
              </li>
              <li>
                <strong>Insurance Fee:</strong> ${insuranceFee.toFixed(2)}
              </li>
              <li className={styles.total}>
                <strong>Total:</strong> ${(serviceFee + flightFee + baggageFee + taxFee + insuranceFee).toFixed(2)}
              </li>
            </ul>
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
}

export default FlightPayment;