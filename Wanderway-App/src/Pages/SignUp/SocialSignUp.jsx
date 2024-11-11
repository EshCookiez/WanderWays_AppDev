import React from 'react';
import styles from './SocialSignUp.module.css';

const SocialSignUp = () => {
  const socialIcons = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/155153ce32e7feae960ef639db382407f07d7f75cf82b58f8beaceeaabde664f?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78", alt: "Facebook sign up" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b3e976746d37f22c98a198729208f812b1b5e3ea2563e924cd36e882006f164?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78", alt: "Google sign up" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/60dfdce926da552ca4d3dab3fcc71cbc465ba1c04766b0d995c6fd58b9d69942?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78", alt: "Apple sign up" }
  ];

  return (
    <div className={styles.socialSignUp}>
      {socialIcons.map((icon, index) => (
        <button key={index} className={styles.socialButton}>
          <img src={icon.src} alt={icon.alt} className={styles.socialIcon} />
        </button>
      ))}
    </div>
  );
};

export default SocialSignUp;