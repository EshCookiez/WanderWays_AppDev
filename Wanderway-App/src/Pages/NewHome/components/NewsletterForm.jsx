import React from 'react';
import styles from '../styles/Landing.module.css';

export const NewsletterForm = () => {
  return (
    <form className={styles.newsletterForm}>
      <div className={styles.newsletterContent}>
        <h2 className={styles.newsletterTitle}>
          Wander <br />
          With Us!
        </h2>
        <div className={styles.newsletterDescription}>
          <h3 className={styles.newsletterSubtitle}>The Ways</h3>
          <p className={styles.newsletterText}>
            Get inspired! Receive travel discounts, tips and behind the scenes stories.
          </p>
        </div>
        <div className={styles.subscribeField}>
          <div className={styles.inputWrapper}>
            <label htmlFor="email" className={styles.inputLabel}>Your email address</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              required
              aria-required="true"
            />
          </div>
          <button type="submit" className={styles.subscribeButton}>
            Subscribe
          </button>
        </div>
      </div>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/91b24a46734427187655ab0e635a36dea98138a42fa77177dcb1f759bae3c968?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.newsletterImage} />
    </form>
  );
};