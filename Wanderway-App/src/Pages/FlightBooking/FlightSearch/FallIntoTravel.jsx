import React from 'react';
import DestinationCard from './Components/DestinationCard';
import styles from './FallIntoTravel.module.css';
import Melbourne from '././Assets/Melbourne.png';
import Paris from '././Assets/Paris.png';
import London from '././Assets/London.png';
import Columbia from '././Assets/Columbia.png';

const destinations = [
  { name: 'Melbourne', description: 'An amazing journey', price: '700', image: Melbourne },
  { name: 'Paris', description: 'A Paris Adventure', price: '600', image: Paris},
  { name: 'London', description: 'London eye adventure', price: '350', image: London},
  { name: 'Columbia', description: 'Amazing streets', price: '700', image: Columbia}
];

function FallIntoTravel() {
  return (
    <section className={styles.fallIntoTravel}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Fall into travel</h2>
        <p className={styles.sectionDescription}>
          Going somewhere to celebrate this season? Whether you're going home or somewhere to roam, we've got the travel tools to get you to your destination.
        </p>
      </div>
      <div className={styles.destinationGrid}>
        {destinations.map((destination, index) => (
          <DestinationCard key={index} {...destination} />
        ))}
      </div>
    </section>
  );
}

export default FallIntoTravel;