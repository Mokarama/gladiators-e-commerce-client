import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  isLoading = false,
  disabled,
  ...props 
}) => {
  const className = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    props.className || ''
  ].join(' ').trim();

  return (
    <button 
      className={className} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 size={16} className={styles.spinner} />}
      {children}
    </button>
  );
};
