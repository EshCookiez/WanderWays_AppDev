import React from 'react';
import Header from './Header';
import ProfileInfo from './ProfileInfo';
import AccountDetails from './AccountDetails';
import Footer from './Footer';
import styles from './CustomerProfile.module.css';

const CustomerProfile = () => {
  return (
    <main className={styles.customerProfile}>
      <Header />
      <ProfileInfo />
      <AccountDetails />
      <Footer />
    </main>
  );
};

export default CustomerProfile;