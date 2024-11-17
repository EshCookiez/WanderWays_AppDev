import React from 'react';
import styles from './CustomerProfile.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.subscriptionSection}>
          <h2 className={styles.footerTitle}>Wander With Us!</h2>
          <p className={styles.footerDescription}>
            Get inspired! Receive travel discounts, tips and behind the scenes stories.
          </p>
          <form className={styles.subscriptionForm}>
            <label htmlFor="emailInput" className="visually-hidden">Your email address</label>
            <input
              type="email"
              id="emailInput"
              className={styles.emailInput}
              placeholder="Your email address"
              aria-label="Your email address"
            />
            <button type="submit" className={styles.subscribeButton}>Subscribe</button>
          </form>
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f312a81786a6278eeb936c2103e57ccb3884a934afc344902d80594b3192956?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Travel Illustration" className={styles.footerImage} />
      </div>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4156a09ce4ad6fbc6dcc8339949164bf172b908cff38b4051aed65786483481?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Company Logo" className={styles.footerLogo} />
    </footer>
  );
};

export default Footer;