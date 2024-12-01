import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <div className={styles.newsletterText}>
            <h2>Wander<br />With Us!</h2>
            <div className={styles.newsletterDescription}>
              <h3>The Ways</h3>
              <p>Get inspired! Receive travel discounts, tips and behind the scenes stories.</p>
            </div>
          </div>
          <form className={styles.newsletterForm} action="/subscribe" method="POST" onSubmit={handleSubscribe}>
            <div className={styles.formGroup}>
              <label htmlFor="emailInput" className={styles.visuallyHidden}>Your email address</label>
              <input
                type="email"
                id="emailInput"
                name="email"
                placeholder="Your email address"
                required
                aria-required="true"
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.subscribeButton}>Subscribe</button>
          </form>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3c421e7d672e58f65301786988cdca4cfa107d08851356b1903c8626dbfaaa1?placeholderIfAbsent=true&apiKey=4c9b7a8638d54a2aa888e9713432a64e"
          alt="Newsletter illustration"
          className={styles.newsletterImage}
        />
      </div>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2763a8078b49beed7969e98ef4579ec044a5cadc12a8a49d86fa81abb4d9856f?placeholderIfAbsent=true&apiKey=4c9b7a8638d54a2aa888e9713432a64e"
        alt="Footer logo"
        className={styles.footerLogo}
      />
    </footer>
  );
};

export default Footer;