import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TravelSection.module.css';
import collage from '././Assets/GlobalAdd.png';
import { useNavigate } from 'react-router-dom';
function TravelSection() {

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/list-flight', {
      state: {
        origin: originSearch,
        destination: destinationSearch,
      },
    });
  };

  return (
    <section className={styles.travelSection}>
      <div className={styles.travelContent}>
        <div className={styles.travelPitch}>
            <h2 className={styles.travelTitle}>Let's go places together</h2>
            <Link to="/list-flight">
            <button className={styles.seeAllButton} onSubmit={handleSubmit}>See All</button>
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