import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './HomeLanding.module.css';
import logo from '../../assets/LogoMain.png';
import pic from '../../assets/Picture.png';
import './HomeLanding.css';

function HomeLanding() {
  const [selectedTab, setSelectedTab] = useState("Flights");
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomsGuests, setRoomsGuests] = useState('');
  const [dateError, setDateError] = useState('');
  const navigate = useNavigate();

  const handleShowFlights = (e) => {
    e.preventDefault();
    navigate('/flight', { state: { selectedTab: "Flights" } });
  };

  const handleShowPlaces = (e) => {
    e.preventDefault();
    if (new Date(checkIn) >= new Date(checkOut)) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }
    setDateError('');
    navigate('/hotelsearch', { 
      state: { 
        selectedTab: "Stays",
        destination,
        checkIn,
        checkOut,
        roomsGuests
      } 
    });
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className={styles.landingPage}>
      <header className={styles.header}>
        <img src={pic} alt="" className={styles.rectangle} />
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link to="/list-flight" className={styles.navLink}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/acb46477b92a1f8acae7e0a99465929b356bd9f589f08663921d25fe23505374?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                  alt=""
                  className={styles.navIcon}
                />
                Find Flight
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/hotelsearch" className={styles.navLink}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f89685dfe33ac9dae4aed888369ae4284d69c8a9dacf22bf885758f978f709a?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                  alt=""
                  className={styles.navIcon}
                />
                Find Stays
              </Link>
            </li>
          </ul>
        </nav>
        <Link to="/home" className={styles.homeLinkTemporary}>
        <img src={logo} alt="WanderWays Logo" className={styles.logo} />
        </Link>
        <div className={styles.authButtons}>
          <Link to="/login">
          <button className={styles.loginButton}>Login</button>
          </Link>
          <Link to="/signup">
          <button className={styles.signupButton}>Sign up</button>
          </Link>
        </div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.mainTitle}>
          <span className={styles.mainTitlePrefix}>Wander Far, Wander Free with</span>
          <span className={styles.mainTitleHighlight}>WanderWays.</span>
        </h1>

        <section className={styles.searchSection}>
          <div className={styles.tabContainer}>
            <button
              className={`${styles.tabButton} ${selectedTab === "Flights" ? styles.active : ""}`}
              onClick={() => setSelectedTab("Flights")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/59924a9cb79a4f34e8b135a613c8a2b10d6e31cc2e9bad530639b7eb0d5fbf1b?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                alt=""
                className={styles.tabIcon}
              />
              Flights
            </button>
            <button
              className={`${styles.tabButton} ${selectedTab === "Stays" ? styles.active : ""}`}
              onClick={() => setSelectedTab("Stays")}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d31d1300ee5999b99bed53a98f31e50b947fbb664fd83fb9448e1adf8215cfbb?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                alt=""
                className={styles.tabIcon}
              />
              Stays
            </button>
          </div>

          {selectedTab === "Flights" ? (
            <div>
              <form className={styles.searchForm} onSubmit={handleShowFlights}>
                <div className={styles.inputGroup}>
                  <label htmlFor="fromTo" className={styles.label}>From - To</label>
                  <input type="text" id="fromTo" className={styles.input} placeholder="Cebu - Philippines" />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/864668711294bfe60d913d9764b84c0e655a855677a954c4740a9a88f205f46d?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                    alt=""
                    className={styles.inputIcon}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="trip" className={styles.label}>Trip</label>
                  <select id="trip" className={styles.input}>
                    <option value="return">Return</option>
                    <option value="one-way">One-way</option>
                  </select>
                </div>
                <button type="submit" className={styles.searchButton}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ebb0d5ae989a073bbe0b35604d2c7f478d137cf3f362ac925b59ce14ded9be8?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                    alt=""
                    className={styles.searchIcon}
                  />
                  Show Flights
                </button>
              </form>
            </div>
          ) : (
            <div>
              <form className={styles.searchForm} onSubmit={handleShowPlaces}>
                <div className={styles.inputGroup}>
                  <label htmlFor="destination" className={styles.label}>Enter Destination</label>
                  <input 
                    type="text" 
                    id="destination" 
                    className={styles.input} 
                    placeholder="Cebu, Philippines" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="checkIn" className={styles.label}>Check In</label>
                  <input 
                    type="date" 
                    id="checkIn" 
                    className={styles.input} 
                    value={checkIn}
                    min={getCurrentDate()}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="checkOut" className={styles.label}>Check Out</label>
                  <input 
                    type="date" 
                    id="checkOut" 
                    className={styles.input} 
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="roomsGuests" className={styles.label}>Rooms & Guests</label>
                  <select 
                    id="roomsGuests" 
                    className={styles.input} 
                    value={roomsGuests}
                    onChange={(e) => setRoomsGuests(e.target.value)}
                  >
                    <option value="1 room, 1 guest">1 room, 1 guest</option>
                    <option value="1 room, 2 guests">1 room, 2 guests</option>
                    <option value="2 rooms, 4 guests">2 rooms, 4 guests</option>
                    <option value="3 rooms, 6 guests">3 rooms, 6 guests</option>
                  </select>
                </div>
                {dateError && <p className={styles.error}>{dateError}</p>}
                <button type="submit" className={styles.searchButton}>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5ebb0d5ae989a073bbe0b35604d2c7f478d137cf3f362ac925b59ce14ded9be8?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
                    alt=""
                    className={styles.searchIcon}
                  />
                  Show Places
                </button>
              </form>
            </div>
          )}
        </section>

        <section className={styles.destinationSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Plan your perfect trip</h2>
            <button className={styles.seeMoreButton}>See more places</button>
          </div>
          <div className="section-Description">
          <p className={styles.sectionDescription}>
              Search Flights & Places Hire to our most popular destinations
          </p>
          </div>

          <div className={styles.destinationGrid}>
            {[
              { id: 1, name: 'Istanbul, Turkey', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7ed5a748c9c1cc1aff3acedaf6eebcc4ac1160ab982b9aa08bef79ea1755110d?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 2, name: 'Sydney, Australia', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/5a3c0037bc72c7c233a3d05dfcd4c8ec85bbc443d9b7b5e14d31c866b455b9c8?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 3, name: 'Baku, Azerbaijan', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/de49b8f24358a4f2e0c5f0766369d3fbab63c7e0a3773cf79d4bd1ee5b266517?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 4, name: 'Malé, Maldives', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/199499845b6d59cb8a68de6da99fa398ff07bc537ae7a04148e4bb98843d4482?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 5, name: 'Paris, France', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ec65ac85d7dd476791e6c6835494b1261cf87f7f1ed8266fe3984a2a14e7db7f?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 6, name: 'New York, US', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7e9516ec5862d3a153f8d9f68329355b28fce93ded627ce3b686ca89f42be7e1?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 7, name: 'London, UK', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/19a21eb159ae670a59edc9533877f6d8e1415dce2bf6b12af185f99bfed1365a?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 8, name: 'Tokyo, Japan', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/75a4aed6ae707d860e93da606913b0f21d3c1cb1474f673f789b38e0419cae58?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
              { id: 9, name: 'Dubai, UAE', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/64d1a4bf7119247e5ed4f168030e6121ef7e7977a02f3cbbd7b6129c0b83a38f?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7' },
            ].map((destination) => (
              <div key={destination.id} className={styles.card}>
                <img src={destination.image} alt={destination.name} className={styles.image} />
                <div className={styles.content}>
                  <h3 className={styles.name}>{destination.name}</h3>
                  <div className={styles.tags}>
                    <span className={styles.tag}>Flights</span>
                    <span className={styles.tagSeparator}>•</span>
                    <span className={styles.tag}>Hotels</span>
                    <span className={styles.tagSeparator}>•</span>
                    <span className={styles.tag}>Resorts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.travelOptions}>
          <div className={styles.optionCard}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/732721b84d78240a5238f0513cf1a461dd140101b813c7e9272eda749eb26bb2?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.optionImage} />
            <div className={styles.optionContent}>
              <h2 className={styles.optionTitle}>Flights</h2>
              <p className={styles.optionDescription}>
                Search Flights & Places Hire to our most popular destinations
              </p>
              <Link to="/list-flight">
                <button className={styles.optionButton}>
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1621daca02bcb5aacc082af98626b872482611b9ffab1cee341ef40025380ef1?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.buttonIcon} />
                  Show Flights
                </button>              
              </Link>

            </div>
          </div>
          <div className={styles.optionCard}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48595ed496dc09d2227f477b5e1d2ad8b89d61bdcbb19949c46a4c3ecb14323d?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.optionImage} />
            <div className={styles.optionContent}>
              <h2 className={styles.optionTitle}>Hotels</h2>
              <p className={styles.optionDescription}>
                Search hotels & Places Hire to our most popular destinations
              </p>
              <Link to="/list-accommodation">
                <button className={styles.optionButton}>
                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/936a6564ba922fa9343b13081aaf959dd62af07cc90b98dd33e6d6167c5234ca?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.buttonIcon} />
                  Show Hotels
                </button>
              </Link> 
            </div>
          </div>
        </section>
      </main>

      <section className={styles.newsletter}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Wander With Us!</h2>
          <div className={styles.newsletterDescription}>
            <h3 className={styles.newsletterSubtitle}>The Ways</h3>
            <p className={styles.newsletterText}>
              Get inspired! Receive travel discounts, tips and behind the scenes stories.
            </p>
          </div>
          <form className={styles.newsletterForm}>
            <div className={styles.newsletterInputWrapper}>
              <label htmlFor="email" className={styles.newsletterLabel}>Your email address</label>
              <input type="email" id="email" className={styles.newsletterInput} placeholder="Your email address" required />
            </div>
            <button type="submit" className={styles.newsletterButton}>Subscribe</button>
          </form>
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a327d15f29a2a363d65feb56bfde3a34c995861662b582a6ce54a8ef1a5ce0b?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="" className={styles.newsletterImage} />
      </section>

      <footer className={styles.footer}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/cd1b6544ae9b1ea63b83722c7b828974b387eb05af6063fc1bc39fd1d9fecac3?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7" alt="WanderWays Logo" className={styles.footerLogo} />
      </footer>
    </div>
  );
}

export default HomeLanding;