import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar({ onCartClick }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { totalItems } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Add background when scrolled
            setIsScrolled(currentScrollY > 50);

            // Hide/show based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <a href="#" className="navbar-logo">
                    <span className="logo-text">Galande</span>
                    <span className="logo-accent">Snacks</span>
                    <span className="logo-year">Est. 1999</span>
                </a>

                {/* Navigation Links */}
                <div className="navbar-links">
                    <a href="#products" className="nav-link">Products</a>
                    <a href="#story" className="nav-link">Our Story</a>
                    <a href="#contact" className="nav-link">Contact</a>
                </div>

                {/* Cart Button */}
                <button className="cart-trigger" onClick={onCartClick}>
                    <svg
                        className="cart-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M6 6h15l-1.5 9h-12z" />
                        <circle cx="9" cy="20" r="1" />
                        <circle cx="18" cy="20" r="1" />
                        <path d="M6 6L5 3H2" />
                    </svg>
                    {totalItems > 0 && (
                        <span className="cart-count">{totalItems}</span>
                    )}
                </button>
            </div>
        </nav>
    );
}
