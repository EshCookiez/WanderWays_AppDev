import React from 'react';
import styles from './SocialLoginButton.module.css';

const SocialLoginButton = ({ icon, alt }) => {
  return (
    <button className={styles.socialButton}>
      <img src={icon} alt={alt} className={styles.socialIcon} />
    </button>
  );
};

export default SocialLoginButton;