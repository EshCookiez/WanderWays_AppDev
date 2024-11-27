import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../../Components/Header';
import TextField from '@mui/material/TextField';
import styles from './HotelSearch.module.css';
import logo from './acmAssets/HotelSearchBg.png';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Footer from '../../Components/Footer/Footer.jsx';

const destinations = [
  { name: 'Melbourne', description: 'An amazing journey', price: '$ 700', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/37fe1a318de4cd8f7f690a808f8ab0a4e85c60478cec2cc36b434cbbabf3fe2e?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
  { name: 'Paris', description: 'A Paris Adventure', price: '$ 600', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c15c171de52a6ac99b6f0aee1e2bc93c03a0677cfb9c422d9920a898ced0e191?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
  { name: 'London', description: 'London eye adventure', price: '$ 350', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d7951b712c9aea4bcfe7233ec8d8142d5b13ad8dab65db34438413559b027047?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
  { name: 'Columbia', description: 'Amazing streets', price: '$ 700', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/eaf9f4d6b040161b258d387644a9e75270007b705a1a885f8c3bcc4617466d78?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
];

function HotelSearch() {
  const location = useLocation();
  const { selectedTab, destination, checkIn, checkOut, roomsGuests } = location.state || { 
    selectedTab: "Stays",
    destination: '',
    checkIn: '',
    checkOut: '',
    roomsGuests: ''
  };

  const [destinationState, setDestinationState] = useState(destination);
  const [checkInState, setCheckInState] = useState(checkIn);
  const [checkOutState, setCheckOutState] = useState(checkOut);
  const [roomsGuestsState, setRoomsGuestsState] = useState(roomsGuests);
  const [email, setEmail] = useState('');
  const [dateError, setDateError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (new Date(checkInState) >= new Date(checkOutState)) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }
    setDateError('');
    // Perform search logic here
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Perform subscribe logic here
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <main className={styles.hotelSearch}>
      <Header className={styles.header} />

      <section className={styles.heroSection}>
        <img src={logo} alt="Travel destination" className={styles.heroImage} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Make your travel now!</h1>
          <p className={styles.heroSubtitle}>Special offers to suit your plan</p>
        </div>
      </section>

      <section className={styles.searchForm}>
        <h2 className={styles.searchTitle}>Where are you staying?</h2>
        <form onSubmit={handleSearch} className={styles.formContainer}>
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
                style: { textAlign: 'center', marginTop: '0px' } // Center the label text
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
              min={getCurrentDate()}
              inputProps={{ min: getCurrentDate() }} 
              onChange={(e) => setCheckInState(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <TextField
              id="checkOut"
              label="Check Out"
              type="date"
              variant="outlined"
              fullWidth
              
              className={styles.customTextField}
              InputLabelProps={{
                shrink: true,
              }}
              value={checkOutState}
              inputProps={{ min: checkInState }}
              onChange={(e) => setCheckOutState(e.target.value)}
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
              InputLabelProps={{
                style: { textAlign: 'left', marginTop: '0px' } 
              }}
            >
              <MenuItem value="1 room, 1 guest" >1 room, 1 guest</MenuItem>
              <MenuItem value="1 room, 2 guests">1 room, 2 guests</MenuItem>
              <MenuItem value="2 rooms, 4 guests">2 rooms, 4 guests</MenuItem>
              <MenuItem value="3 rooms, 6 guests">3 rooms, 6 guests</MenuItem>
            </TextField>
          </div>
          
        </form>
        {dateError && <p className={styles.error}>{dateError}</p>}
        <div className={styles.formActions}>
          <Link to="/hotelListing">
            <button type="submit" className={styles.searchButton}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3841b1045beb14d265982d29d508bce5abea64959f24625829fde09ae69aa5f6?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.buttonIcon} />
              Show Places
            </button>
            </Link>
          </div>
      </section>

      <section className={styles.travelDestinations}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Fall into travel</h2>
          <p className={styles.sectionDescription}>
            Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.
          </p>
          <button className={styles.seeAllButton}>See All</button>
        </div>
        <div className={styles.destinationGrid}>
          {destinations.map((destination, index) => (
            <article key={index} className={styles.destinationCard}>
              <img src={destination.image} alt={destination.name} className={styles.destinationImage} />
              <div className={styles.destinationInfo}>
                <div className={styles.destinationHeader}>
                  <div>
                    <h3 className={styles.destinationName}>{destination.name}</h3>
                    <p className={styles.destinationDescription}>{destination.description}</p>
                  </div>
                  <p className={styles.destinationPrice}>{destination.price}</p>
                </div>
                <button className={styles.bookButton}>Book a Hotel</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.travelExperience}>
        <div className={styles.experienceContent}>
          <h2 className={styles.experienceTitle}>Backpacking Sri Lanka</h2>
          <div className={styles.experiencePrice}>
            <span>From</span>
            <strong>$700</strong>
          </div>
          <p className={styles.experienceDescription}>
            Traveling is a unique experience as it's the best way to unplug from the pushes and pulls of daily life. It helps us to forget about our problems, frustrations, and fears at home. During our journey, we experience life in different ways. We explore new places, cultures, cuisines, traditions, and ways of living.
          </p>
          <button className={styles.bookFlightButton}>Book Flight</button>
        </div>
        <div className={styles.experienceGallery}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2df6ef95b1c3e879ae915a504b5a1f4d3d29f8fd19587c9052ed10548e6f636?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="Sri Lanka experience 1" className={styles.galleryImage} />
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f0e491cd5a92a71805303bfc3fe56a05a3e118e4c2ccb288c43ce134bcec3ee?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="Sri Lanka experience 2" className={styles.galleryImage} />
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d6d7992a3217630455dd86693da740f9134978c142427f756469b0c57b7d57e?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="Sri Lanka experience 3" className={styles.galleryImage} />
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/013e29ffdc746f1e1385a95723bb079dbfc4e108b7a7dbbd1ac2c531ae876876?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="Sri Lanka experience 4" className={styles.galleryImage} />
        </div>
      </section>

      <Footer/>
    </main>
  );
}

export default HotelSearch;