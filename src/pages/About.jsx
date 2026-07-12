import React from 'react';
import styles from './About.module.css';

export const About = () => {
  return (
    <div className="container py-12">
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>About Gladiator</h1>
        <p className={styles.heroSubtitle}>We are on a mission to redefine the e-commerce experience by providing premium quality products with unmatched customer service.</p>
      </div>

      <div className={styles.storySection}>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Our Team" 
            className={styles.storyImage}
          />
        </div>
        <div>
          <h2 className={styles.storyTitle}>Our Story</h2>
          <p className={styles.storyText}>
            Founded in 2026, Gladiator started with a simple idea: to make high-quality products accessible to everyone without compromising on the shopping experience. What began as a small startup has grown into a leading platform serving thousands of customers worldwide.
          </p>
          <p className={styles.storyText}>
            We believe in transparency, sustainability, and innovation. Our team works tirelessly to curate the best items, ensuring that every purchase you make meets the highest standards of quality and durability.
          </p>
        </div>
      </div>

      <div className={styles.joinSection}>
        <h2 className={styles.joinTitle}>Join Our Journey</h2>
        <p className={styles.joinText}>
          We're constantly expanding and looking for talented individuals to join our team. If you're passionate about tech, e-commerce, and making a difference, we'd love to hear from you.
        </p>
        <button className={styles.joinBtn}>
          View Open Positions
        </button>
      </div>
    </div>
  );
};
