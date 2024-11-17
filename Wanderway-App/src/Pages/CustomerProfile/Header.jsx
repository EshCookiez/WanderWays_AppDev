import React from 'react';
import styles from './CustomerProfile.module.css';

const Header = () => {
  return (
    <header className={styles.headerLoggedIn}>
      <nav className={styles.navigation}>
        <div className={styles.navGroup}>
          <a href="#" className={styles.navLink}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d01ba79be3645eb156fe1bf65e7fdf1552523bdee469da5dc9a9a3857874f4ba?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Find Flight Icon" className={styles.navIcon} />
            <span>Find Flight</span>
          </a>
          <a href="#" className={styles.navLink}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/59d964d72298f8718f8057b3b3cf1836eac579d801be71c433672b0c729783f8?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Find Stays Icon" className={styles.navIcon} />
            <span>Find Stays</span>
          </a>
        </div>
      </nav>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/90f551d4ceb90b84a23bf94a255abbb406ded28cdf0c505e23a4b16f23111b8c?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Company Logo" className={styles.logo} />
      <div className={styles.userSection}>
        <a href="#" className={styles.favourites}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a28ab6692507910b4b244f8bc0576178216381a4d124644325124c862f7ad6ac?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Favourites Icon" className={styles.navIcon} />
          <span>Favourites</span>
        </a>
        <div className={styles.userProfile}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a926496e6e252ab885297afc8c8b58622aefe87ce0f3f66c8df95e22a4f15d9?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="User Avatar" className={styles.userAvatar} />
          <span className={styles.userName}>Vince K.</span>
          <div className={styles.notificationDot} />
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8e6300b8e17304b876e6482ef78961bb42bd3f915b39c9b39d23eedd80078eeb?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Dropdown Icon" className={styles.dropdownIcon} />
        </div>
      </div>
    </header>
  );
};

export default Header;