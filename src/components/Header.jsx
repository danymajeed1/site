// src/components/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ scrolled }) => {
  const location = useLocation(); 
  const path = location.pathname; 

  const isActive = (route) => path === route;

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="logo-wrapper">
        {/* LOGO (Stays on top) */}
        <Link to="/">
           <img src="/logo.png" alt="Dany Majeed" className="logo" />
        </Link>
        
        {/* NAV: SYMMETRICAL LAYOUT */}
        <nav>
          {/* LEFT: Showcase */}
          <Link 
            to="/portfolio" 
            className={`nav-link ${isActive('/portfolio') ? 'active-page' : ''}`}
          >
            Showcase
          </Link>

          {/* CENTER: Home */}
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active-page' : ''}`}
          >
            Home
          </Link>

          {/* RIGHT: Services */}
          <Link 
            to="/services" 
            className={`nav-link ${isActive('/services') ? 'active-page' : ''}`}
          >
            Services
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;