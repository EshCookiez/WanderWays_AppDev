import React from 'react';
import styles from './CustomerProfile.module.css';

const AccountField = ({ label, value }) => {
  return (
    <div className={styles.accountField}>
      <div className={styles.fieldInfo}>
        <span className={styles.fieldLabel}>{label}</span>
        <span className={styles.fieldValue}>{value}</span>
      </div>
      <button className={styles.changeButton}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8c8d8b722232c8bfbb0889ca5f8a9d682956775092eaa32b9c162bdb3809de1?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Change Icon" className={styles.changeIcon} />
        <span>Change</span>
      </button>
    </div>
  );
};

export default AccountField;