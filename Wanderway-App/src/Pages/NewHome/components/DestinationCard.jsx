import React from 'react';
import styles from '../styles/Landing.module.css';

export const DestinationCard = ({ image, city, country }) => {
  return (
    <article className={styles.destinationCard}>
      <div className={styles.imageWrapper}>
        <img loading="lazy" src={image} alt={`${city}, ${country}`} className={styles.destinationImage} />
      </div>
      <div className={styles.destinationInfo}>
        <h3 className={styles.destinationTitle}>{`${city}, ${country}`}</h3>
        <div className={styles.destinationFeatures}>
          <span>Flights</span>
          <span>•</span>
          <span>Hotels</span>
          <span>•</span>
          <span>Resorts</span>
        </div>
      </div>
    </article>
  );
};