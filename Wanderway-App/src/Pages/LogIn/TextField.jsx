import React, { useState } from 'react';
import styles from './TextField.module.css';

const TextField = ({ label, type = 'text', value, onChange, showPasswordToggle = false }) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={styles.textField}>
      <label className={styles.label}>
        <span className={styles.labelText}>{label}</span>
        <input
          type={inputType}
          value={value} // Use value to bind to the component's state
          onChange={onChange} // Pass the onChange function to handle updates
          className={styles.input}
        />
      </label>
      {showPasswordToggle && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.togglePassword}
          aria-label={inputType === 'password' ? 'Show password' : 'Hide password'}
        >
          {inputType === 'password' ? 'Show' : 'Hide'}
        </button>
      )}
    </div>
  );
};

export default TextField;
