import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import styles from './Home.module.css';

// Dummy data for initial UI showcase, usually fetched from backend
const DUMMY_ITEMS = [
  { id: 1, title: 'Premium Wireless Headphones', price: 299.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', description: 'High-fidelity audio with active noise cancellation.' },
  { id: 2, title: 'Smart Fitness Watch', price: 199.50, rating: 4.6, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', description: 'Track your health, workouts, and stay connected.' },
  { id: 3, title: 'Ultra-thin Laptop', price: 1299.00, rating: 4.9, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', description: 'Powerful performance in a sleek, lightweight design.' },
  { id: 4, title: '4K Action Camera', price: 349.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1512753360435-329c4535a9a7?w=500&q=80', description: 'Capture your adventures in stunning 4K resolution.' },
];

export const Home = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className="container relative">
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>v2.0 Now Available</span>
            <h1 className={styles.heroTitle}>
              Discover & Shop The <span>Best Products</span> Online.
            </h1>
            <p className={styles.heroSubtitle}>
              Welcome to Gladiator, your premier destination for high-quality electronics, fashion, and more. Upgrade your lifestyle today.
            </p>
            <div className={styles.heroActions}>
              <Link to="/explore">
                <Button size="lg">Start Exploring</Button>
              </Link>
              <Button size="lg" variant="secondary">View Offers</Button>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Electronics" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose Gladiator?</h2>
            <p className={styles.sectionSubtitle}>We provide the best shopping experience with premium quality products.</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><Shield size={32} /></div>
              <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
              <p className="text-secondary">Your data is protected with industry-leading security and encryption.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><Zap size={32} /></div>
              <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
              <p className="text-secondary">Get your items delivered quickly with our premium logistics partners.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}><TrendingUp size={32} /></div>
              <h3 className="font-bold text-xl mb-2">Top Quality</h3>
              <p className="text-secondary">Every product is vetted for quality and comes with a guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Categories Section */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Shop By Category</h2>
            <p className={styles.sectionSubtitle}>Find exactly what you are looking for.</p>
          </div>
          <div className="grid grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-4">
            {['Electronics', 'Fashion', 'Home & Living', 'Sports'].map(cat => (
              <div key={cat} className="flex items-center justify-center p-8 bg-surface rounded-xl border border-color shadow-sm cursor-pointer hover:-translate-y-1 transition duration-300" style={{backgroundColor: 'var(--surface-color)'}}>
                <h3 className="font-semibold text-lg">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Items Section */}
      <section className={styles.section}>
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className={styles.sectionTitle} style={{marginBottom: 0}}>Featured Items</h2>
              <p className={styles.sectionSubtitle} style={{marginLeft: 0}}>Handpicked selections for you.</p>
            </div>
            <Link to="/explore" className="text-primary font-medium flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className={styles.itemsGrid}>
            {DUMMY_ITEMS.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Statistics Section */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Active Users</div>
            </div>
            <div>
              <div className={styles.statNumber}>50K+</div>
              <div className={styles.statLabel}>Products Sold</div>
            </div>
            <div>
              <div className={styles.statNumber}>99%</div>
              <div className={styles.statLabel}>Satisfaction Rate</div>
            </div>
            <div>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSubtitle}>Three simple steps to get what you need.</p>
          </div>
          <div className="grid grid-cols-3 md-grid-cols-1 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-color)'}}>1</div>
              <h3 className="font-bold text-xl mb-2">Browse & Select</h3>
              <p className="text-secondary">Find your desired products from our extensive catalog.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-color)'}}>2</div>
              <h3 className="font-bold text-xl mb-2">Secure Checkout</h3>
              <p className="text-secondary">Pay securely using your preferred payment method.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4" style={{backgroundColor: 'var(--primary-color)'}}>3</div>
              <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
              <p className="text-secondary">Receive your order at your doorstep in no time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-2 md-grid-cols-1 gap-6">
            <div className="p-6 bg-surface rounded-xl border border-color shadow-sm" style={{backgroundColor: 'var(--surface-color)'}}>
              <div className="flex gap-1 text-warning mb-4">
                {[1,2,3,4,5].map(star => <StarIcon key={star} />)}
              </div>
              <p className="text-secondary italic mb-4">"The best shopping experience I've had online. The product quality is top-notch, and the delivery was incredibly fast. Highly recommended!"</p>
              <div className="font-bold">- Jane Doe, Verified Buyer</div>
            </div>
            <div className="p-6 bg-surface rounded-xl border border-color shadow-sm" style={{backgroundColor: 'var(--surface-color)'}}>
              <div className="flex gap-1 text-warning mb-4">
                {[1,2,3,4,5].map(star => <StarIcon key={star} />)}
              </div>
              <p className="text-secondary italic mb-4">"I love the intuitive layout and how easy it is to track my orders on the dashboard. Will definitely be a returning customer."</p>
              <div className="font-bold">- Mark Smith, Tech Enthusiast</div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.newsletter}>
            <h2 className={styles.newsletterTitle}>Join Our Newsletter</h2>
            <p className="mb-6 opacity-90">Get the latest updates, exclusive offers, and more.</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className={styles.newsletterInput} 
                required
              />
              <button type="submit" className={styles.newsletterBtn}>Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="var(--warning)" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
