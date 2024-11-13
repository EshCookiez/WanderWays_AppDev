import React from 'react';
import styles from './TextField.module.css';

const TextField = ({ label, type = 'text', value, onChange, name }) => {
  return (
    <div className={styles.fieldWrapper}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className={styles.input}
        required
      />
    </div>
  );
};

export default TextField;
