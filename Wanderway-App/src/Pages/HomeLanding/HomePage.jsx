import React from 'react';
import styles from './HomePage.module.css';

const Home = () => {
    return (
        <nav className={styles.navigation-container}>
            <div className={styles.heroSection}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ecbcda5e6c33634a976aa932ec7feac908d3caa287b9c88c7e835e1a1c4cbbd?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.heroBackground} />
                <div className={styles.navWrapper}>
                    <div className={styles.navLinks}>
                        <div className={styles.navItems}>
                            <div className={styles.navItem}>
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/acb46477b92a1f8acae7e0a99465929b356bd9f589f08663921d25fe23505374?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.navIcon} />
                                <span>Find Flight</span>
                            </div>
                            <div className={styles.navItem}>
                                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f89685dfe33ac9dae4aed888369ae4284d69c8a9dacf22bf885758f978f709a?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.navIcon} />
                                <span>Find Stays</span>
                            </div>
                        </div>
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a43d8ee81e73412e4563c8548d6b128daa6877e326f2188d38a6b6a992329435?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="WanderWays Logo" className={styles.logo} />
                    </div>
                    <div className={styles.authButtons}>
                        <button className={styles.login}>Login</button>
                        <button className={styles.signupBtn}>Sign up</button>
                    </div>
                </div>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <p className={styles.heroSubtitle}>Wander Far, Wander Free with</p>
                        <h1 className={styles.heroTitle}>WanderWays.</h1>
                    </div>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <div className={styles.searchIndicator}></div>
                <div className={styles.searchContent}>
                    <div className={styles.searchTabs}>
                        <div className={styles.tabItem}>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/59924a9cb79a4f34e8b135a613c8a2b10d6e31cc2e9bad530639b7eb0d5fbf1b?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.navIcon} />
                            <span>Flights</span>
                        </div>
                        <div className={styles.tabDivider}></div>
                        <div className={styles.tabItem}>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d31d1300ee5999b99bed53a98f31e50b947fbb664fd83fb9448e1adf8215cfbb?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.navIcon} />
                            <span>Stays</span>
                        </div>
                    </div>
                    <form className={styles.searchFields}>
                        <div className={styles.searchField}>
                            <div className={styles.fieldContent}>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor="location" className={styles.inputLabel}>From - To</label>
                                    <input type="text" id="location" className={styles.inputText} value="Cebu - Philippines" />
                                </div>
                                <div className={styles.fieldIcon}>
                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/864668711294bfe60d913d9764b84c0e655a855677a954c4740a9a88f205f46d?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.searchField}>
                            <div className={styles.fieldContent}>
                                <div className={styles.inputWrapper}>
                                    <label htmlFor="trip" className={styles.inputLabel}>Trip</label>
                                    <input type="text" id="trip" className={styles.inputText} value="Return" />
                                </div>
                                <div className={styles.fieldIcon}>
                                    <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c280963efe520f86c1bd818b06d99a6bdad48fab825216c142d4f4abaeee0ad?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className={styles.searchActions}>
                        <button className={styles.searchButton}>
                            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e97c1d29db0ead3fba444ca304acd2a6ebbc24524f3af9c940c87ab9989a2186?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
                            <span>Show Flights</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Home;