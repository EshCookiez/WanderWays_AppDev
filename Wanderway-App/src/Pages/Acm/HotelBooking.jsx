import React from 'react';
import styles from './HotelBooking.module.css';
import Header from '../../Components/Header';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import logo from './acmAssets/hotelBook.png'
const HotelBooking = () => {
  const priceItems = [
    { label: 'Base Fare', amount: '240' },
    { label: 'Discount', amount: '0' },
    { label: 'Taxes', amount: '20' },
    { label: 'Service Fee', amount: '5' },
    { label: 'Total', amount: '265' }
  ];

  return (
    <main className={styles.bookingContainer} role="main">
        <Header/>
        <img src={logo} alt="background" className={styles.heroBackground} />
      <div className={styles.contentWrapper}>
        <section className={styles.bookingDetails} aria-label="Booking Details">
          <div className={styles.roomHeader}>
            <h1 className={styles.roomTitle}>
              Superior room - 1 double bed or 2 twin beds
            </h1>
            <div className={styles.pricePerNight} aria-label="Price per night">
              <span className={styles.amount}>$240</span>
              <span className={styles.nightRate}>/night</span>
            </div>
          </div>
          
          <article className={styles.hotelInfo} aria-label="Hotel Information">
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ff30aa1cfebbeb73cacb5ce4295e9001c72d3afeb064790e2cedf60be399f32?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" 
              alt="CVK Park Bosphorus Hotel exterior view"
              className={styles.hotelImage}
            />
            <div className={styles.hotelDetails}>
              <h2 className={styles.hotelName}>CVK Park Bosphorus Hotel Istanbul</h2>
              <div className={styles.addressContainer}>
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6b633bd9b1c06d5f6f44dc9542ef204568ce0601632069b272baa89c86300ac?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" 
                  alt=""
                  role="presentation" 
                  className={styles.locationIcon}
                />
                <address className={styles.address}>
                  Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
                </address>
              </div>
            </div>
          </article>

          <div className={styles.dateSection} role="group" aria-label="Check-in and Check-out dates">
            <div className={styles.dateDisplay}>
              <h3 className={styles.dateText}>Thursday, Dec 8</h3>
              <div className={styles.dateType}>Check-In</div>
            </div>
            
            <div className={styles.dateConnector} aria-hidden="true">
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/03e1b1d35ce28cd4983e5f07f68bd71fd34d900a22a952339716a7020cff8ce2?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf5d76583c8aa9d03d09967e1e75f9c4a4540d561968ffc279c72e30d8cb34b3?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c120cfc7b28f263b6f66bd2781b416756dfa775662de23282d36afc3169d0e9d?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
            </div>
            
            <div className={styles.dateDisplay}>
              <h3 className={styles.dateText}>Friday, Dec 9</h3>
              <div className={styles.dateType}>Check-Out</div>
            </div>
          </div>
        </section>
        
        {/* <Divider orientation="vertical" variant="middle" flexItem sx={{borderWidth:3, borderColor:"rgba(0, 0, 0, 0.316)"}}/> */}
        <aside className={styles.summaryCard} aria-label="Booking Summary">
          <div className={styles.hotelSummary}>
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/cee1996aa81a6665340c2cf530aacbb552412b0d94d3d3e820bd87d5745c185c?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" 
              alt="Room preview"
              className={styles.roomImage}
            />
            <div className={styles.summaryDetails}>
              <h3 className={styles.summaryHotelName}>CVK Park Bosphorus...</h3>
              <p className={styles.roomType}>
                Superior room - 1 double bed or 2 twin beds
              </p>
              <div className={styles.ratingContainer}>
                <button 
                  className={styles.ratingButton}
                  aria-label="Hotel rating: 4.2 out of 5"
                >
                  4.2
                </button>
                <span className={styles.reviewText}>
                  <strong>Very Good</strong> 54 reviews
                </span>
              </div>
            </div>
          </div>

          <hr className={styles.divider} aria-hidden="true" />
          
          <p className={styles.protection}>
            Your booking is protected by <strong>golobe</strong>
          </p>
          
          <hr className={styles.divider} aria-hidden="true" />
          
          <section className={styles.priceDetails} aria-labelledby="priceDetailsTitle">
            <h2 id="priceDetailsTitle" className={styles.priceTitle}>
              Price Details
            </h2>
            {priceItems.map((item, index) => (
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
                  >
                    Cancel
                  </Button>
                  <Link to='/hotelPay'>
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
                    onClick={() => handleOpen(accommodation)}
                  >
                    BOOK NOW
                  </Button>
                  </Link>
                </Box>
        </aside>
      </div>
    </main>
  );
};

export default HotelBooking;