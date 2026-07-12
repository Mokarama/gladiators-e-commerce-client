import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import styles from './Card.module.css';
import { Button } from './Button';

export const Card = ({ 
  item, 
  onActionClick, 
  actionText = "View Details",
  hoverable = true 
}) => {
  return (
    <div className={`${styles.card} ${hoverable ? styles.hoverable : ''}`}>
      <Link to={`/product/${item.id}`} className={styles.imageContainer}>
        {item.image ? (
          <img src={item.image} alt={item.title} className={styles.image} loading="lazy" />
        ) : (
          <div className={`${styles.image} flex items-center justify-center`} style={{ backgroundColor: 'var(--border-color)' }}>
            No Image
          </div>
        )}
      </Link>
      
      <div className={styles.content}>
        <Link to={`/product/${item.id}`}>
          <h3 className={styles.title}>{item.title}</h3>
        </Link>
        <p className={styles.description}>
          {item.description?.substring(0, 80)}
          {item.description?.length > 80 ? '...' : ''}
        </p>
        
        <div className={styles.meta}>
          <span className={styles.price}>${item.price?.toFixed(2)}</span>
          {item.rating && (
            <span className={styles.rating}>
              <Star size={16} fill="currentColor" /> {item.rating}
            </span>
          )}
        </div>
        
        <div className={styles.actions}>
          <Link to={`/product/${item.id}`} style={{ width: '100%', display: 'block' }}>
            <Button fullWidth onClick={() => onActionClick && onActionClick(item.id)}>
              {actionText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
