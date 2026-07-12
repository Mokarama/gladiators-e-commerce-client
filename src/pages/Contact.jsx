import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import styles from './Contact.module.css';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStatus({ type: 'success', message: 'Your message has been sent successfully! We will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="container py-12">
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>Have any questions? We'd love to hear from you.</p>
      </div>

      <div className={styles.layout}>
        {/* Contact Info */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Get in Touch</h2>
          
          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 className={styles.infoTitle}>Our Location</h3>
                <p className={styles.infoText}>123 Gladiator Street, Tech City, TC 10100</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Phone size={24} />
              </div>
              <div>
                <h3 className={styles.infoTitle}>Phone Number</h3>
                <p className={styles.infoText}>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <Mail size={24} />
              </div>
              <div>
                <h3 className={styles.infoTitle}>Email Address</h3>
                <p className={styles.infoText}>support@gladiator.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.card}>
          <form onSubmit={handleSubmit}>
            {status.message && (
              <div className={`${styles.alert} ${status.type === 'error' ? styles.alertError : styles.alertSuccess}`}>
                {status.message}
              </div>
            )}
            
            <Input 
              label="Your Name" 
              name="name" 
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
            />
            
            <Input 
              label="Your Email" 
              name="email" 
              type="email" 
              placeholder="john@example.com" 
              value={formData.email}
              onChange={handleChange}
            />
            
            <div className={styles.textareaWrapper}>
              <label className={styles.textareaLabel}>Message</label>
              <textarea 
                name="message"
                rows="5" 
                className={styles.textarea}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <Button type="submit" fullWidth isLoading={isLoading}>Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};
