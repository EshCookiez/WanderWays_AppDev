import React from 'react';
import styles from '../styles/Landing.module.css';

export const SearchForm = () => {
  return (
    <form className={styles.searchForm} role="search">
      <div className={styles.searchTabs}>
        <div className={styles.tabGroup}>
          <button type="button" className={styles.activeTab}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b30ebb09752c5be1f7e03dcce3e5c021421682b18a7d109a9e081c7a5018bbf?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.tabIcon} />
            <span>Flights</span>
          </button>
          <div className={styles.tabDivider} />
          <button type="button" className={styles.tab}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a39ca4594adf4b36fb2bbf048839e604b7928cc8c3da02299eb8aa227313554?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.tabIcon} />
            <span>Stays</span>
          </button>
        </div>
      </div>
      
      <div className={styles.searchFields}>
        <div className={styles.inputField}>
          <label htmlFor="location" className={styles.inputLabel}>From - To</label>
          <input
            type="text"
            id="location"
            className={styles.input}
            defaultValue="Cebu - Philippines"
          />
          <button type="button" className={styles.inputIcon}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/645318c014425ae3812890648b8ee22eb36149b0380c731706e2d744886e423f?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
          </button>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="trip" className={styles.inputLabel}>Trip</label>
          <input
            type="text"
            id="trip"
            className={styles.input}
            defaultValue="Return"
          />
          <button type="button" className={styles.inputIcon}>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/83125170e42496aabb4c5c39d128dfb166422384700b88a2cf13afc89644a349?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
          </button>
        </div>
      </div>

      <button type="submit" className={styles.searchButton}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cf0331be78decd972bbfa7afa1d106fb2d6835d5181e702cd865712ec9d9bb8?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.buttonIcon} />
        <span>Show Flights</span>
      </button>
    </form>
  );
};