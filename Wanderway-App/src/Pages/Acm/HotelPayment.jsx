// FILE: src/components/HotelPayment.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './HotelPayment.module.css';
import Header from '../../Components/Header';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import userIcon from './acmAssets/user.png';
import barcode from './acmAssets/barcode.png';
import logo from './acmAssets/hotelBook.png';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

const HotelPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { payment } = location.state || {};

  if (!payment) {
    return <p>No payment details available.</p>;
  }

  const accommodation = payment.room.accommodation;
  const room = payment.room;

  return (
    <main className={styles.bookingConfirmation} role="main">
      <Header />
      <img src={logo} alt="background" className={styles.heroBackground} />
      <nav className={styles.locationNav} aria-label="Hotel location">
        <div className={styles.breadcrumb}>
          <span>Find Stays</span>
          <ChevronRightIcon />
          <span>{accommodation.location}</span>
          <ChevronRightIcon />
          <span className={styles.hotelName}>{accommodation.name}</span>
        </div>
      </nav>

      <section className={styles.hotelInfoContainer} aria-labelledby="hotelName">
        <div className={styles.details}>
          <h1 id="hotelName" className={styles.title}>{accommodation.name}</h1>
          <div className={styles.address}>
            <LocationOnIcon sx={{ fontSize: 15 }} />
            <span>{accommodation.address}</span>
          </div>
        </div>
        <div className={styles.booking}>
          <div className={styles.price} aria-label={`Price: ${payment.totalPrice} dollars`}>
            ${payment.totalPrice}
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
              onClick={() => handleDownloadPaymentDetails(payment)}
            >
              Download
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.bookingDetails} aria-label="Booking details">
        <div className={styles.dateSection}>
          <div className={styles.checkInOut}>
            <div className={styles.date}>
              <div className={styles.dateValue}>{payment.checkInDate}</div>
              <div className={styles.dateLabel}>Check-In</div>
            </div>
            <div className={styles.dateOut}>
              <div className={styles.dateValue}>{payment.checkOutDate}</div>
              <div className={styles.dateLabel}>Check-Out</div>
            </div>
          </div>
        </div>

        <div className={styles.guestInfo}>
          <div className={styles.guestHeader}>
            <Avatar alt={payment.userFullName} src={userIcon} /> 
            <span className={styles.guestName}>{payment.userFullName}</span>
            <span className={styles.roomType}>{room.type}</span>
          </div>

          <div className={styles.timings}>
            <div className={styles.timeInfo}>
              <AccessTimeFilledIcon sx={{ color: '#ff8484' }} />
              <div className={styles.timeDetails}>
                <div className={styles.timeLabel}>Check-In time</div>
                <div className={styles.timeValue}>{payment.checkInTime}</div>
              </div>
            </div>
            <div className={styles.timeInfo}>
              <AccessTimeFilledIcon sx={{ color: '#ff8484' }} />
              <div className={styles.timeDetails}>
                <div className={styles.timeLabel}>Check-Out time</div>
                <div className={styles.timeValue}>{payment.checkOutTime}</div>
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
          <img src="/qr/booking-code.svg" alt="QR Code" className={styles.qrCode} />
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

// Handler for Download button
const handleDownloadPaymentDetails = (payment) => {
  // Example: Create a JSON blob and download it
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payment, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "payment_details.json");
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export default HotelPayment;