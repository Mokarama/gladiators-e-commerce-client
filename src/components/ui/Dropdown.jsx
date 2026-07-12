import React, { useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';

export const Dropdown = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <div 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.menuOpen : ''} ${align === 'left' ? styles.menuLeft : ''}`}>
        {items.map((item, index) => (
          <button
            key={index}
            className={styles.item}
            onClick={() => {
              item.onClick();
              setIsOpen(false);
            }}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
