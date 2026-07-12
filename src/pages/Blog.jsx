import React, { useState } from 'react';
import { Calendar, Clock, Share2, MoreVertical } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Dropdown } from '../components/ui/Dropdown';
import styles from './Blog.module.css';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'The Future of Wearable Technology in 2026',
    excerpt: 'Explore how the latest advancements in smartwatches and fitness trackers are revolutionizing personal health monitoring and connectivity.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1510007559134-8c8879685601?w=800&q=80',
    date: 'Oct 15, 2026',
    readTime: '5 min read'
  },
  {
    id: 2,
    title: 'Sustainable Fashion: A Trend or the New Normal?',
    excerpt: 'Discover why top brands are shifting towards eco-friendly materials and how it impacts the global fashion industry and our planet.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80',
    date: 'Oct 12, 2026',
    readTime: '4 min read'
  },
  {
    id: 3,
    title: 'Top 5 Tech Gadgets for Your Smart Home',
    excerpt: 'From voice-controlled lighting to intelligent security systems, here are the essential gadgets you need to upgrade your living space.',
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    date: 'Oct 08, 2026',
    readTime: '7 min read'
  },
  {
    id: 4,
    title: 'Ultimate Guide to Buying a New Laptop',
    excerpt: 'Feeling overwhelmed by specs? We break down everything you need to know about processors, RAM, and storage before making a purchase.',
    category: 'Buying Guide',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    date: 'Oct 05, 2026',
    readTime: '10 min read'
  },
  {
    id: 5,
    title: 'How to Build the Perfect Workout Routine',
    excerpt: 'Combine the right equipment with data tracking to maximize your fitness gains and achieve your health goals faster.',
    category: 'Health & Fitness',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
    date: 'Sep 28, 2026',
    readTime: '6 min read'
  },
  {
    id: 6,
    title: 'E-Commerce Security: Safe Shopping Online',
    excerpt: 'Learn how to identify secure websites, protect your credit card information, and avoid the most common online shopping scams.',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    date: 'Sep 22, 2026',
    readTime: '8 min read'
  }
];

export const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleShare = (network) => {
    console.log(`Sharing on ${network}...`);
  };

  return (
    <div className="container py-12">
      <div className={styles.header}>
        <h1 className={styles.title}>Gladiator Insights</h1>
        <p className={styles.subtitle}>The latest news, trends, and buying guides from our experts.</p>
      </div>

      <div className={styles.grid}>
        {BLOG_POSTS.map(post => (
          <article key={post.id} className={styles.blogCard}>
            <div className={styles.imageWrapper}>
              <img src={post.image} alt={post.title} className={styles.image} />
            </div>
            
            <div className={styles.content}>
              <div className="flex justify-between items-start mb-2">
                <span className={styles.category}>{post.category}</span>
                <Dropdown 
                  trigger={<button aria-label="More options" className="text-secondary hover:text-primary transition-colors"><MoreVertical size={18} /></button>}
                  items={[
                    { label: 'Share on Twitter', onClick: () => handleShare('Twitter') },
                    { label: 'Share on Facebook', onClick: () => handleShare('Facebook') },
                    { label: 'Copy Link', onClick: () => handleShare('Clipboard') },
                  ]}
                  align="right"
                />
              </div>
              
              <h2 className={styles.postTitle}>{post.title}</h2>
              <p className={styles.excerpt}>{post.excerpt}</p>
              
              <div className={styles.meta}>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <Button 
                variant="secondary" 
                className="mt-6 w-full"
                onClick={() => setSelectedPost(post)}
              >
                Read Article
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Integration Verification */}
      <Modal 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)}
        title={selectedPost?.title}
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelectedPost(null)}>Close</Button>
            <Button className="flex items-center gap-2"><Share2 size={16} /> Share</Button>
          </>
        }
      >
        {selectedPost && (
          <div>
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="w-full h-48 object-cover rounded-md mb-6"
            />
            <div className="flex gap-4 mb-6 text-sm text-secondary font-medium">
              <span>{selectedPost.category}</span>
              <span>•</span>
              <span>{selectedPost.date}</span>
            </div>
            <p className="mb-4 text-base line-height-1.6 text-primary" style={{color: 'var(--text-primary)'}}>
              {selectedPost.excerpt}
            </p>
            <p className="line-height-1.6 mb-4 text-secondary">
              This is a full article preview rendered inside our new reusable Modal component. 
              The Modal supports dynamic content, header titles, and footer action buttons.
              It also traps focus and prevents background scrolling, ensuring a highly accessible user experience.
            </p>
            <p className="line-height-1.6 text-secondary">
              At Gladiator, we ensure that every interaction feels premium. Whether you're exploring the latest tech gadgets or sustainable fashion trends, our platform is designed to provide you with seamless performance and beautiful aesthetics.
            </p>
          </div>
        )}
      </Modal>

    </div>
  );
};
