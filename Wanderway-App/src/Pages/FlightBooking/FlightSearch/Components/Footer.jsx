import React, { useState } from 'react';
import styles from './Footer.module.css';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <footer className={styles.newsletter}>
      <div className={styles.newsletterContent}>
        <h2 className={styles.newsletterTitle}>Wander With Us!</h2>
        <div className={styles.newsletterForm}>
          <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
            <label htmlFor="emailInput" className={styles.visuallyHidden}>
              Your email address
            </label>
            <input
              type="email"
              id="emailInput"
              className={styles.emailInput}
              placeholder="Your email address"
              aria-label="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8a97df192e4984ac3a6f4b23e227e9f99e4a0832bf47a6a081dbdbe179651ba?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
        alt="Travel illustration"
        className={styles.newsletterImage}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d39671f4b9bf1ad479ce742a8e3464831bb47c8de4a8341ea2557345657b434?placeholderIfAbsent=true&apiKey=7e996fec0e7d44d186be219bc6f7eea7"
        alt="Company logo"
        className={styles.companyLogo}
      />
    </footer>
  );
}

export default Footer;