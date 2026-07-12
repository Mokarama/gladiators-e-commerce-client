import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Sun, Moon, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { AuthContext } from '../../context/AuthContext';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;

  useEffect(() => {
    // Check theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = isLoggedIn ? [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Blog', path: '/blog' }
  ] : [
    { name: 'Home', path: '/' },
    { name: 'Explore', path: '/explore' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <ShoppingBag size={28} />
          Gladiator
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`${styles.navLink} ${location.pathname === link.path ? styles.navLinkActive : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions (Theme & Auth) */}
        <div className={styles.actions}>
          <button 
            onClick={toggleTheme} 
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-primary)' }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {isLoggedIn ? (
            <Dropdown 
              trigger={
                <Button className="flex items-center gap-2">
                  <User size={18} /> Profile
                </Button>
              }
              items={[
                { label: 'Dashboard', onClick: () => navigate('/dashboard') },
                { label: 'Logout', onClick: handleLogout }
              ]}
              align="right"
            />
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.mobileMenuBtn} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      <div className={`container ${styles.mobileMenu} ${isMenuOpen ? styles.isOpen : ''}`}>
        {navLinks.map((link) => (
          <Link 
            key={link.name} 
            to={link.path} 
            className={styles.mobileNavLink}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
        {!isLoggedIn && (
          <Link to="/login" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        )}
        {isLoggedIn && (
          <button 
            onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
            className={styles.mobileNavLink}
            style={{ border: 'none', background: 'transparent', textAlign: 'left', cursor: 'pointer', width: '100%', fontSize: '1rem' }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
