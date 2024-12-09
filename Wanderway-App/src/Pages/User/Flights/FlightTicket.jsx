import React from 'react';
import { FlightTicketDetail } from './FlightTicketDetail';
import styles from './FlightTicket.module.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AccessibleIcon from '@mui/icons-material/Accessible';

export const FlightTicket = () => {
  const ticketDetails = [
    // ... your ticket details ...
  ];

  const handleDownload = () => {
    // Ticket download logic would go here
    alert('Download functionality to be implemented.');
  };

  const handleShare = () => {
    // Ticket sharing logic would go here
    alert('Share functionality to be implemented.');
  };

  return (
    <div className={styles.ticketContainer}>
      {/* Airline Logo */}
      <div className={styles.airlineLogoWrapper} role="img" aria-label="Airline logo">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/39a67589ad344f0adb1a201174ce8e862b08c4b5b1bc2973aa4243ccf077494d?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63"
          alt=""
          className={styles.airlineLogo}
          loading="lazy"
        />
      </div>
      
      {/* Flight Information */}
      <div className={styles.flightInfoContainer}>
        <div className={styles.routeInfo} role="text">
          <span>Cebu</span>
          <span aria-hidden="true">—</span>
          <span>Siargao</span>
        </div>
        
        <div className={styles.divider} role="presentation" />
        
        <div className={styles.detailsContainer}>
          <div role="group" aria-label="Primary flight details" className={styles.calendarDetails}>
            <CalendarMonthIcon sx={{alignContent: 'center', justifyContent: 'space-around'}}/> 
            <div className={styles.calendar}>
              <span>Start Date </span>
              <span>12-11-22</span>
            </div>
            <CalendarMonthIcon/>
            <div className={styles.calendar}>
              <span>End Date </span>
              <span>12-18-22</span>
            </div>
          </div>
          <div role="group" aria-label="Primary flight details" className={styles.calendarDetails}>
            <ConfirmationNumberIcon sx={{alignContent: 'center', justifyContent: 'space-around'}}/> 
            <div className={styles.calendar}>
              <span>Ticket ID </span>
              <span>798789</span>
            </div>
            <AccessibleIcon/>
            <div className={styles.calendar}>
              <span>Passengers </span>
              <span>12 </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={styles.actionButtons}>
        <button 
          className={styles.downloadButton}
          onClick={handleDownload}
          aria-label="Download ticket"
        >
          Download Ticket
        </button>
        <button 
          className={styles.shareButton}
          onClick={handleShare}
          aria-label="Share ticket"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4a5befd5dc2e4173499b8fe0bfb167dcc3d48069c784c7b55207010208b8554?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63"
            alt=""
            className={styles.shareIcon}
            loading="lazy"
            role="presentation"
          />
        </button>
      </div>
    </div>
  );
};