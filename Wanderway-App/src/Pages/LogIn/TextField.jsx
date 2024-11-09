import React, { useState } from 'react';
import styles from './TextField.module.css';

const TextField = ({ label, type = 'text', defaultValue = '', showPasswordToggle = false }) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType(prevType => prevType === 'password' ? 'text' : 'password');
  };

  return (
    <div className={styles.textField}>
      <label className={styles.label}>
        <span className={styles.labelText}>{label}</span>
        <input
          type={inputType}
          defaultValue={defaultValue}
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
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/63ae0ae246a0b90feebf192979f7a6b12b620dc89c644bd3d45b90c10b29f90a?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="" className={styles.toggleIcon} />
        </button>
      )}
    </div>
  );
};

export default TextField;