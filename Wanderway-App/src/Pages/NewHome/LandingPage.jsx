import React from 'react';
import styles from './styles/Landing.module.css';
import { SearchForm } from './components/SearchForm';
import { DestinationCard } from './components/DestinationCard';
import { NewsletterForm } from './components/NewsletterForm';
import { destinations } from './data/destinations';

export const LandingPage = () => {
  return (
    <main className={styles.landingPage}>
      <header className={styles.hero}>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a4e09e7844fd116f3107c234e89a7d00f11671aa40ee74cc658ac5d2d759609d?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.heroBackground} />
        <nav className={styles.navigation}>
          <div className={styles.navGroup}>
            <div className={styles.navLinks}>
              <button type="button" className={styles.navLink}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/fd18566c817629d93cd2c7f9588b463be36dc7794e2f5532bff86715d7a981cb?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
                <span>Find Flight</span>
              </button>
              <button type="button" className={styles.navLink}>
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/552ae5e38e3cc9d7b283fcba271dc574d7b90d8a0ba6f64d6a8dc0d12ed10fdd?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
                <span>Find Stays</span>
              </button>
            </div>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/75d828465af0c329d57f6f4e1cb7d01b2b7b11431ad7018bc9197e5a41670e76?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="WanderWays" className={styles.logo} />
          </div>
          <div className={styles.authButtons}>
            <button type="button" className={styles.loginButton}>Login</button>
            <button type="button" className={styles.signupButton}>Sign up</button>
          </div>
        </nav>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroSubtitle}>Wander Far, Wander Free with</span>
            <span className={styles.heroMainTitle}>WanderWays.</span>
          </h1>
        </div>
      </header>

      <section className={styles.searchSection}>
        <SearchForm />
      </section>

      <section className={styles.destinationsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Plan your perfect trip</h2>
            <p className={styles.sectionDescription}>
              Search Flights & Places Hire to our most popular destinations
            </p>
          </div>
          <button type="button" className={styles.seeMoreButton}>
            See more places
          </button>
        </div>

        <div className={styles.destinationsGrid}>
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              image={destination.image}
              city={destination.city}
              country={destination.country}
            />
          ))}
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/732721b84d78240a5238f0513cf1a461dd140101b813c7e9272eda749eb26bb2?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.featureImage} />
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>Flights</h2>
            <p className={styles.featureDescription}>
              Search Flights & Places Hire to our most popular destinations
            </p>
            <button type="button" className={styles.featureButton}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3edfec44295c1c233db008b08625723dcbc18529d262b5de09856e0858c65404?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
              <span>Show Flights</span>
            </button>
          </div>
        </div>

        <div className={styles.featureCard}>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/48595ed496dc09d2227f477b5e1d2ad8b89d61bdcbb19949c46a4c3ecb14323d?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" className={styles.featureImage} />
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>Hotels</h2>
            <p className={styles.featureDescription}>
              Search hotels & Places Hire to our most popular destinations
            </p>
            <button type="button" className={styles.featureButton}>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/c61bd6d55097e77d150e23305f277a4dd76fcff6ae3da3bdf514f4f2f4e06ea7?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="" />
              <span>Show Hotels</span>
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <NewsletterForm />
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/15c257088341efefcec2c6bb447f8628d699bade619725ab6824b57c7f0e7a5c?placeholderIfAbsent=true&apiKey=a15e519098c240a2b028acfbd9132f63" alt="WanderWays" className={styles.footerLogo} />
        </div>
      </footer>
    </main>
  );
};


export default LandingPage;