import React from 'react';
import Header from '../../Components/Header'
import ProfileInfo from './ProfileInfo';
import AccountDetails from './AccountDetails';
import Footer from '../../Components/Footer/Footer';
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