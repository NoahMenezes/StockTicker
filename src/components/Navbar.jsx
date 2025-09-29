// src/components/EchoTickerNavbar.jsx

import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className='echo-navbar'>
            <div className="navbar-container">
                <a href="/" className="navbar-heading">EchoTicker</a>
                <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span>Online</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;