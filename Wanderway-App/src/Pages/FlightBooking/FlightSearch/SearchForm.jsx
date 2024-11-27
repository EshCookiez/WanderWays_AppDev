import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.css';
import TextField from '../../../Components/TextField/TextField'

const SearchForm = () => {
  const [originSearch, setOriginSearch] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    navigate('/list-flight', {
      state: {
        origin: originSearch,
        destination: destinationSearch,
      },
    });
  };

  return (
    <section className={styles.searchFormContainer}>
      <h2 className={styles.formTitle}>Where are you flying?</h2>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="from" className={styles.visuallyHidden}>From</label>
          <TextField
            label="From"
            type="text"
            id="fromTo"
            className={styles.formInput}
            placeholder="From"
            value={originSearch}
            onChange={(e) => setOriginSearch(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="To" className={styles.visuallyHidden}>To</label>
          <TextField
            label="To"
            type="text"
            id="To"
            className={styles.formInput}
            placeholder="To"
            value={destinationSearch}
            onChange={(e) => setDestinationSearch(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Show Flights</button>
      </form>
    </section>
  );
};

export default SearchForm;