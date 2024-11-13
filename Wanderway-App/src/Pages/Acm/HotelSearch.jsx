import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './HotelSearch.module.css';
import logo from './acmAssets/HotelSearchBg.png';
import wander from '../../assets/LogoIMG.png';
const destinations = [
  { name: 'Melbourne', description: 'An amazing journey', price: '$ 700', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/37fe1a318de4cd8f7f690a808f8ab0a4e85c60478cec2cc36b434cbbabf3fe2e?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
  { name: 'Paris', description: 'A Paris Adventure', price: '$ 600', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c15c171de52a6ac99b6f0aee1e2bc93c03a0677cfb9c422d9920a898ced0e191?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
  { name: 'London', description: 'London eye adventure', price: '$ 350', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d7951b712c9aea4bcfe7233ec8d8142d5b13ad8dab65db34438413559b027047?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
  { name: 'Columbia', description: 'Amazing streets', price: '$ 700', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/eaf9f4d6b040161b258d387644a9e75270007b705a1a885f8c3bcc4617466d78?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
];

function HotelSearch() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomsGuests, setRoomsGuests] = useState('');
  const [email, setEmail] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <main className={styles.hotelSearch}>
      <header className={styles.header}>
        <div className={styles.headerIndicator} />
        <div className={styles.headerIndicator} />
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d01ba79be3645eb156fe1bf65e7fdf1552523bdee469da5dc9a9a3857874f4ba?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.navIcon} />
              <a href="#findFlight">Find Flight</a>
            </li>
            <li className={styles.navItem}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/59d964d72298f8718f8057b3b3cf1836eac579d801be71c433672b0c729783f8?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.navIcon} />
              <a href="#findStays">Find Stays</a>
            </li>
          </ul>
        </nav>
        <Link to="/">
        <img src={wander} alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.userActions}>
          <div className={styles.favorites}>
            <Link to="/favorites" className={styles.favorites}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a28ab6692507910b4b244f8bc0576178216381a4d124644325124c862f7ad6ac?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.navIcon} />
            
            <span>Favourites</span>
            </Link>
          </div>
          <span className={styles.separator}>|</span>
          <div className={styles.userProfile}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/37549d2d96f1b3c7d7388bc8db4642b5df8094db435487ff329eef0cabb96b63?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="User avatar" className={styles.userAvatar} />
            <span>Vince K.</span>
            <div className={styles.userStatus} />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e6300b8e17304b876e6482ef78961bb42bd3f915b39c9b39d23eedd80078eeb?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.dropdownIcon} />
          </div>
        </div>
      </header>

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
            <label htmlFor="destination" className={styles.visuallyHidden}>Enter Destination</label>
            <input
              type="text"
              id="destination"
              className={styles.formInput}
              placeholder="Cebu, Philippines"
              aria-label="Enter Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d31d1300ee5999b99bed53a98f31e50b947fbb664fd83fb9448e1adf8215cfbb?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.inputIcon} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="checkIn" className={styles.visuallyHidden}>Check In</label>
            <input
              type="text"
              id="checkIn"
              className={styles.formInput}
              placeholder="Fri 12/2"
              aria-label="Check In Date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bd01c8d2046e2d99796de5c03865284dad82fe80f830c5097331ec55f0d1954?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.inputIcon} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="checkOut" className={styles.visuallyHidden}>Check Out</label>
            <input
              type="text"
              id="checkOut"
              className={styles.formInput}
              placeholder="Sun 12/4"
              aria-label="Check Out Date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bd01c8d2046e2d99796de5c03865284dad82fe80f830c5097331ec55f0d1954?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.inputIcon} />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="roomsGuests" className={styles.visuallyHidden}>Rooms & Guests</label>
            <input
              type="text"
              id="roomsGuests"
              className={styles.formInput}
              placeholder="1 room, 2 guests"
              aria-label="Rooms and Guests"
              value={roomsGuests}
              onChange={(e) => setRoomsGuests(e.target.value)}
            />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e97fdca654d48ed0d599f0b8084d6e57d66c163d17a016e9d3b24f3bedc3f841?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.inputIcon} />
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1cf7c3f17008bea66f4d4017b6e7de5c5fd105cef9d09b5eb87da37baf792db?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.inputIcon} />
          </div>
          <div className={styles.formActions}>
            <button type="button" className={styles.promoButton}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcc71c9333e1e93d37ec5e537a9ff799f13d327420f759b5ebb16134b3e31926?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.buttonIcon} />
              Add Promo Code
            </button>
            <button type="submit" className={styles.searchButton}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3841b1045beb14d265982d29d508bce5abea64959f24625829fde09ae69aa5f6?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.buttonIcon} />
              Show Places
            </button>
          </div>
        </form>
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

      <footer className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Wander With Us!</h2>
          <div className={styles.newsletterForm}>
            <p className={styles.newsletterDescription}>
              <strong>The Ways</strong>
              <br />
              Get inspired! Receive travel discounts, tips and behind the scenes stories.
            </p>
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <label htmlFor="emailInput" className={styles.visuallyHidden}>Your email address</label>
              <input
                type="email"
                id="emailInput"
                className={styles.emailInput}
                placeholder="Your email address"
                aria-label="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.subscribeButton}>Subscribe</button>
            </form>
          </div>
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8a97df192e4984ac3a6f4b23e227e9f99e4a0832bf47a6a081dbdbe179651ba?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="Travel illustration" className={styles.newsletterImage} />
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d39671f4b9bf1ad479ce742a8e3464831bb47c8de4a8341ea2557345657b434?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="Company logo" className={styles.companyLogo} />
      </footer>
    </main>
  );
}

export default HotelSearch;