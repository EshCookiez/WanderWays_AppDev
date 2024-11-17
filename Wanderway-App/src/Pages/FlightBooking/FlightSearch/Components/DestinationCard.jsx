import React from 'react';
import styles from './DestinationCard.module.css';

function DestinationCard({ name, description, price, image }) {
  return (
    <article className={styles.destinationCard}>
      <img src={image} alt={`${name} destination`} className={styles.destinationImage} />
      <div className={styles.destinationInfo}>
        <h3 className={styles.destinationName}>{name}</h3>
        <p className={styles.destinationDescription}>{description}</p>
        <p className={styles.destinationPrice}>${price}</p>
        <button className={styles.bookButton}>Book Flight</button>
      </div>
    </article>
  );
}

export default DestinationCard;