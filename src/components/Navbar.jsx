// src/components/EchoTickerNavbar.jsx

import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`echo-navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <a href="/" className="navbar-heading">
                    <span className="navbar-logo">📈</span>
                    <span className="navbar-text">EchoTicker</span>
                    <div className="navbar-glow"></div>
                </a>
                <div className="navbar-nav">
                    <div className="navbar-status">
                        <span className="status-indicator"></span>
                        <span className="status-text">Live</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;