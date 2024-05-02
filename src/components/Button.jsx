import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, ...rest }) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;