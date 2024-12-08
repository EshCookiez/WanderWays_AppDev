import React from 'react';
import { IoAirplane } from 'react-icons/io5';
import styles from './AirplaneSpinner.module.css'; 

const AirplaneSpinner = () => {
  return (
    <div className={styles.spinner_container}>
      <IoAirplane className={styles.airplane_icon} />
    </div>
  );
};

export default AirplaneSpinner;