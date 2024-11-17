import React from 'react';
import AccountField from './AccountField.jsx';
import styles from './CustomerProfile.module.css';

const AccountDetails = () => {
  const accountFields = [
    { label: 'Name', value: 'Vince Kimlo Tan' },
    { label: 'Email', value: 'vincekimlo.tan@cit.edu' },
    { label: 'Password', value: '************' },
    { label: 'Phone number', value: '09665566551' },
    { label: 'Address', value: 'Blk 4 Lot 17, Chivas Cabancalan I, Bulacao Cebu City' },
    { label: 'Date of birth', value: '05-10-2003' }
  ];

  return (
    <section className={styles.accountDetails}>
      <h2 className={styles.sectionTitle}>Account</h2>
      <div className={styles.fieldsContainer}>
        {accountFields.map((field, index) => (
          <AccountField key={index} label={field.label} value={field.value} />
        ))}
      </div>
    </section>
  );
};

export default AccountDetails;