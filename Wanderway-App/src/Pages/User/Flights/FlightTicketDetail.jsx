import React from 'react';
import styles from './FlightTicketDetail.module.css';

export const FlightTicketDetail = ({ icon, label, value, ariaLabel }) => {
  return (
    <div className={styles.detailRow} role="group" aria-label={ariaLabel}>
      CalendarMonthIcon
      <div className={styles.detailContent}>
        <span className={styles.detailLabel}>{label}</span>
        <span className={styles.detailValue}>{value}</span>
      </div>
    </div>
  );
};