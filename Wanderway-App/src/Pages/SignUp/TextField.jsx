import React from 'react';
import styles from './TextField.module.css';

const TextField = ({ label, placeholder, type = 'text' }) => {
  return (
    <div className={styles.textField}>
      <label className={styles.label} htmlFor={label.toLowerCase().replace(' ', '-')}>
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase().replace(' ', '-')}
        placeholder={placeholder}
        className={styles.input}
      />
      {type === 'password' && (
        <img src="" />
      )}
    </div>
  );
};

export default TextField;