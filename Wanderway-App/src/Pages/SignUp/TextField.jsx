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
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/70bd6d991a505b479114bbbc98c23ce41a59c538932b97852e60ad0ca1131ee9?placeholderIfAbsent=true&apiKey=918132c67bed4c9f95d44f9d99b73e78" alt="Toggle password visibility" className={styles.toggleIcon} />
      )}
    </div>
  );
};

export default TextField;