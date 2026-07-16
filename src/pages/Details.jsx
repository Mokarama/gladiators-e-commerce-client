import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, Truck, ShieldCheck, RotateCcw, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';
import styles from './Details.module.css';

export const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('overview');
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError('');
      try {
        const { data } = await axios.get(`import.meta.env.VITE_API_URL/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Product not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container py-24 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" style={{borderColor: 'var(--primary-color)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite'}}></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-3xl font-bold mb-4 text-error" style={{color: 'var(--error)'}}>Product Not Found</h2>
        <p className="text-secondary mb-8">{error}</p>
        <Link to="/explore">
          <Button>Back to Products</Button>
        </Link>
      </div>
    );
  }

  // Fallback for missing arrays
  const images = product.images?.length > 0 ? product.images : [product.image || 'https://via.placeholder.com/600'];
  const reviewsCount = product.numReviews || 0;
  const rating = product.rating || 0;

  return (
    <div className={`container ${styles.detailsPage}`}>
      <div className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span>/</span>
        <Link to="/explore" className={styles.breadcrumbLink}>Explore</Link>
        <span>/</span>
        <Link to={`/explore?category=${product.category}`} className={styles.breadcrumbLink}>{product.category}</Link>
        <span>/</span>
        <span>{product.title}</span>
      </div>

      <div className={styles.layout}>
        {/* Media Section */}
        <div className={styles.imageGallery}>
          <div className={styles.mainImageWrapper}>
            <img src={images[activeImage]} alt={product.title} className={styles.mainImage} />
          </div>
          <div className={styles.thumbnails}>
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`${styles.thumbnailWrapper} ${activeImage === idx ? styles.thumbnailActive : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className={styles.mainImage} />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className={styles.productInfo}>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.meta}>
            <div className={styles.rating}>
              <Star fill="currentColor" size={20} />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span className={styles.reviews}>({reviewsCount} Reviews)</span>
          </div>

          <div className={styles.price}>${product.price.toFixed(2)}</div>
          
          <p className={styles.description}>{product.description}</p>

          <div className={`${styles.stockStatus} ${product.countInStock > 0 ? styles.inStock : styles.outOfStock}`}>
            {product.countInStock > 0 ? 'In Stock - Ready to Ship' : 'Out of Stock'}
          </div>

          <div className={styles.actions}>
            <Button size="lg" className="flex-grow flex items-center justify-center gap-2" disabled={product.countInStock === 0}>
              <ShoppingCart size={20} /> Add to Cart
            </Button>
            <Button size="lg" variant="secondary" className="px-4">
              <Heart size={20} />
            </Button>
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <Truck size={18} className="text-primary" /> Free Express Shipping on orders over $100
            </div>
            <div className={styles.featureItem}>
              <ShieldCheck size={18} className="text-primary" /> 2-Year Extended Warranty Included
            </div>
            <div className={styles.featureItem}>
              <RotateCcw size={18} className="text-primary" /> 30-Day Money-Back Guarantee
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'overview' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'specs' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          Specifications
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({reviewsCount})
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Product Overview</h3>
            <p className="mb-4">{product.description}</p>
            <p>Designed for the ultimate user experience, this product integrates the finest materials with state-of-the-art technology to ensure that you get the best value for your money.</p>
          </div>
        )}
        {activeTab === 'specs' && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Technical Specifications</h3>
            <div className="max-w-md">
              <div className="flex justify-between py-2 border-b border-color">
                <span className="font-medium text-primary">Brand</span>
                <span>{product.brand || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-color">
                <span className="font-medium text-primary">Category</span>
                <span>{product.category || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">Customer Reviews</h3>
            {reviewsCount === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <p>Review system integration coming soon.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
