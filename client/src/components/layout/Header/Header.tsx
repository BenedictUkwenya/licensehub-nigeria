// /client/src/components/layout/Header/Header.tsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    // Close menu when a link is clicked
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">LicenseHub</Link>
            </div>
            
            {/* Hamburger Menu Icon for Mobile */}
            <div className={styles.menuIcon} onClick={toggleMenu}>
                ☰ {/* This is the hamburger icon character */}
            </div>

            {/* Navigation links */}
            <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
                {user ? (
                    // Links to show when user is logged IN
                    <>
                        <span className={styles.welcomeText}>Welcome, {user.name.split(' ')[0]}!</span>
                        <Link to="/dashboard" className={styles.navLink} onClick={handleLinkClick}>Dashboard</Link>
                        <button onClick={logout} className={styles.button}>Logout</button>
                    </>
                ) : (
                    // Links to show when user is logged OUT
                    <>
                        <Link to="/login" className={styles.navLink} onClick={handleLinkClick}>Login</Link>
                        <Link to="/register" className={styles.buttonPrimary} onClick={handleLinkClick}>Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;