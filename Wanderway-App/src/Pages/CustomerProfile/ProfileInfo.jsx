import React, { useState } from 'react';
import styles from './CustomerProfile.module.css';

const ProfileInfo = () => {
  const [coverImage, setCoverImage] = useState(
    'https://cdn.builder.io/api/v1/image/assets/TEMP/a3386b9fafcd2269a6ef9a613dcb30b96205d8a0628cf3404f910a0de7465bc8?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78'
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a temporary URL for the uploaded image
      setCoverImage(imageUrl);
    }
  };

  return (
    <section className={styles.profileInfo}>
      <div className={styles.coverImageContainer}>
        <img src={coverImage} alt="Profile Cover" className={styles.coverImage} />
        <label className={styles.uploadButton}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06b0266ba47011b31cb5312d5b57f6cacf7c3ed122dd29b290ea8d47b3411725?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78"
            alt="Upload Icon"
            className={styles.uploadIcon}
          />
          <span>Upload new cover</span>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput} // Hidden input field
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className={styles.profileDetails}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3cdbe11-e3c8-4be3-adc0-ea5c4c5d6cc7?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78"
          alt="Profile Picture"
          className={styles.profilePicture}
        />
        <div className={styles.userInfo}>
          <h1 className={styles.userName}>Vince Kimlo</h1>
          <p className={styles.userEmail}>vincekimlo.tan@cit.edu</p>
        </div>
      </div>
      <nav className={styles.profileNav}>
        <a href="#" className={`${styles.navItem} ${styles.active}`}>
          Account
        </a>
        <a href="#" className={styles.navItem}>
          History
        </a>
        <a href="#" className={styles.navItem}>
          Payment methods
        </a>
      </nav>
    </section>
  );
};

export default ProfileInfo;
