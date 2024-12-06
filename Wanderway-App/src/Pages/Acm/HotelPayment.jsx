import React from 'react';
import styles from './HotelPayment.module.css';

export const HotelPayment = () => {
  const hotelData = {
    location: {
      country: 'Turkey',
      city: 'Istanbul'
    },
    hotel: {
      name: 'CVK Park Bosphorus Hotel Istanbul',
      address: 'Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437'
    },
    price: 265,
    booking: {
      checkIn: {
        date: 'Thur, Dec 8',
        time: '12:00pm'
      },
      checkOut: {
        date: 'Fri, Dec 9',
        time: '11:30pm'
      },
      guest: {
        name: 'Vince Kimlo'
      },
      room: {
        type: 'Superior room - 1 double bed or 2 twin beds'
      }
    }
  };

  return (
    <main className={styles.bookingConfirmation} role="main">
      <nav className={styles.locationNav} aria-label="Hotel location">
        <div className={styles.breadcrumb}>
          <span>{hotelData.location.country}</span>
          <img src="/icons/separator.svg" alt="" className={styles.separator} />
          <span>{hotelData.location.city}</span>
          <img src="/icons/separator.svg" alt="" className={styles.separator} />
          <span className={styles.hotelName}>{hotelData.hotel.name}</span>
        </div>
      </nav>

      <section className={styles.hotelInfoContainer} aria-labelledby="hotelName">
        <div className={styles.details}>
          <h1 id="hotelName" className={styles.title}>{hotelData.hotel.name}</h1>
          <div className={styles.address}>
            <img src="/icons/location.svg" alt="" className={styles.locationIcon} />
            <span>{hotelData.hotel.address}</span>
          </div>
        </div>
        <div className={styles.booking}>
          <div className={styles.price} aria-label={`Price: ${hotelData.price} dollars`}>
            ${hotelData.price}
          </div>
          <div className={styles.actions}>
            <button 
              className={styles.iconButton} 
              aria-label="Share booking details"
              onClick={() => {}}
            >
              <img src="/icons/share.svg" alt="" className={styles.actionIcon} />
            </button>
            <button 
              className={styles.downloadButton}
              onClick={() => {}}
            >
              Download
            </button>
          </div>
        </div>
      </section>

      <section className={styles.bookingDetails} aria-label="Booking details">
        <div className={styles.dateSection}>
          <div className={styles.checkInOut}>
            <div className={styles.date}>
              <div className={styles.dateValue}>{hotelData.booking.checkIn.date}</div>
              <div className={styles.dateLabel}>Check-In</div>
            </div>
            <div className={styles.dateSeparator} aria-hidden="true">
              <img src="/icons/arrow-top.svg" alt="" />
              <img src="/icons/arrow-middle.svg" alt="" />
              <img src="/icons/arrow-bottom.svg" alt="" />
            </div>
            <div className={styles.date}>
              <div className={styles.dateValue}>{hotelData.booking.checkOut.date}</div>
              <div className={styles.dateLabel}>Check-Out</div>
            </div>
          </div>
        </div>

        <div className={styles.guestInfo}>
          <div className={styles.guestHeader}>
            <img 
              src={`/avatars/${hotelData.booking.guest.name.toLowerCase()}.jpg`} 
              alt={hotelData.booking.guest.name}
              className={styles.guestAvatar} 
            />
            <span className={styles.guestName}>{hotelData.booking.guest.name}</span>
            <span className={styles.roomType}>{hotelData.booking.room.type}</span>
          </div>

          <div className={styles.timings}>
            <div className={styles.timeInfo}>
              <img src="/icons/clock.svg" alt="" className={styles.timeIcon} />
              <div className={styles.timeDetails}>
                <div className={styles.timeLabel}>Check-In time</div>
                <div className={styles.timeValue}>{hotelData.booking.checkIn.time}</div>
              </div>
            </div>
            <div className={styles.timeInfo}>
              <img src="/icons/clock.svg" alt="" className={styles.timeIcon} />
              <div className={styles.timeDetails}>
                <div className={styles.timeLabel}>Check-Out time</div>
                <div className={styles.timeValue}>{hotelData.booking.checkOut.time}</div>
              </div>
            </div>
            <div className={styles.timeInfo}>
              <img src="/icons/room.svg" alt="" className={styles.timeIcon} />
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
                  src="/icons/barcode-segment.svg"
                  alt=""
                  className={styles.barcodeSegment}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className={styles.qrContainer} aria-label="Booking QR code">
        <img src="/qr/booking-code.svg" alt="" className={styles.qrCode} />
      </div>

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