import React from 'react';
import SearchForm from './SearchForm';
import styles from './FlightSearch.module.css';
import logo from '././Assets/Docked-Airplane4.jpg';
import TravelSection from './TravelSection';
import Header from '../../../Components/Header.jsx'
import FallIntoTravel from './FallIntoTravel';
import Footer from './Components/Footer.jsx';

const FlightSearch = () => {
  return (
    <div className={styles.flightSearchContainer}>
      <Header/>
      <main className={styles.mainContent}>
        <section className={styles.heroSection}>
            <img src={logo} alt="Travel destination" className={styles.heroImage} />
            <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>Fly with us Now!</h1>
            </div>
        </section>
        <SearchForm /> 
        <TravelSection />
        <FallIntoTravel />
      </main>
      <Footer/>
    </div>
  );
};

export default FlightSearch;