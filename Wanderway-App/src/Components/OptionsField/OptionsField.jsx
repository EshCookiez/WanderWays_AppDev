import React, { useState } from 'react';
import styles from './OptionsField.module.css';

const OptionsField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  options = [],
  showPasswordToggle = false
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={styles.OptionsField}>
        <label className={styles.label}>
        <span className={styles.labelText}>{label}</span>
        {type === 'select' ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={styles.input}
          >
            <option value="" disabled>
              Select an option
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            className={styles.input}
          />
        )}
      </label>
      {showPasswordToggle && type === 'password' && (
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

export default OptionsField;