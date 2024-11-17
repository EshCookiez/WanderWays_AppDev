import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TravelSection.module.css';
import collage from '././Assets/GlobalAdd.png';
function TravelSection() {
  return (
    <section className={styles.travelSection}>
      <div className={styles.travelContent}>
        <div className={styles.travelPitch}>
            <h2 className={styles.travelTitle}>Let's go places together</h2>
            <Link to="/list-flight">
            <button className={styles.seeAllButton}>See All</button>
            </Link>
        </div>
        <h2 className={styles.travelDescription}>
          Discover the latest offers and news and start planning your next trip with us.
        </h2>
        
      </div>
      <img src={collage} alt="Travel destinations collage" className={styles.travelImage} />
    </section>
  );
}

export default TravelSection;