import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, fullWidth }) => {
  return (
    <button className={`${styles.button} ${fullWidth ? styles.fullWidth : ''}`}>
      {text}
    </button>
  );
};

export default Button;