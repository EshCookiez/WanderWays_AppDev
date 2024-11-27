import React from 'react';
import styles from './DestinationCard.module.css';
import { useNavigate } from 'react-router-dom';
function DestinationCard({ name, description, price, image }) {
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
    <article className={styles.destinationCard}>
      <img src={image} alt={`${name} destination`} className={styles.destinationImage} />
      <div className={styles.destinationInfo}>
        <h3 className={styles.destinationName}>{name}</h3>
        <p className={styles.destinationDescription}>{description}</p>
        <p className={styles.destinationPrice}>${price}</p>
        <button className={styles.bookButton} onSubmit={handleSubmit}>Book Flight</button>
      </div>
    </article>
  );
}

export default DestinationCard;