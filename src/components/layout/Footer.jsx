import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Globe, Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          
          <div className={styles.col}>
            <div className="flex items-center gap-2 mb-4" style={{ color: 'var(--primary-color)', fontSize: '1.25rem', fontWeight: 'bold' }}>
              <ShoppingBag size={24} />
              Gladiator
            </div>
            <p>Your one-stop destination for feature-rich, scalable, and premium quality items. Built for the modern web.</p>
            <div className={styles.socials}>
              <a href="#" aria-label="Website" className={styles.socialLink}><Globe size={20} /></a>
              <a href="#" aria-label="Email" className={styles.socialLink}><Mail size={20} /></a>
              <a href="#" aria-label="Phone" className={styles.socialLink}><Phone size={20} /></a>
              <a href="#" aria-label="Location" className={styles.socialLink}><MapPin size={20} /></a>
            </div>
          </div>

          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link to="/explore" className={styles.link}>Explore Items</Link></li>
              <li><Link to="/about" className={styles.link}>About Us</Link></li>
              <li><Link to="/blog" className={styles.link}>Our Blog</Link></li>
              <li><Link to="/contact" className={styles.link}>Contact Us</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Support</h4>
            <ul className={styles.linkList}>
              <li><Link to="/faq" className={styles.link}>FAQ</Link></li>
              <li><Link to="/help" className={styles.link}>Help Center</Link></li>
              <li><Link to="/privacy" className={styles.link}>Privacy Policy</Link></li>
              <li><Link to="/terms" className={styles.link}>Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Contact Info</h4>
            <ul className={styles.linkList}>
              <li className={styles.link}>123 Gladiator Street</li>
              <li className={styles.link}>Tech City, TC 10100</li>
              <li className={styles.link}>Phone: +1 (555) 123-4567</li>
              <li className={styles.link}>Email: support@gladiator.com</li>
            </ul>
          </div>

        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Gladiator Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
