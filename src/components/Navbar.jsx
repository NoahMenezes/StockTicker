// src/components/EchoTickerNavbar.jsx

import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="echo-navbar">
            <div className="navbar-container">
                <a href="/" className="navbar-heading">
                    echoTicker
                </a>
            </div>
        </nav>
    );
}

export default Navbar;