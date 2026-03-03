import React, { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') { 
        if (window.scrollY > lastScrollY && window.scrollY > 80) {
          setShowNav(false); // Hide when scrolling down
        } else {
          setShowNav(true);  // Show when scrolling up
        }
        setLastScrollY(window.scrollY); 
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const isActive = (route) => path === route;

  const shutterTo = useCallback((to) => {
    if (to === path) return;
    document.body.classList.add("shutter-on");
    window.setTimeout(() => {
      navigate(to);
      window.setTimeout(() => {
        document.body.classList.remove("shutter-on");
      }, 60);
    }, 520);
  }, [navigate, path]);

  return (
    <header className={`${scrolled ? "scrolled" : ""} ${!showNav ? "nav-hidden" : ""}`}>
      {/* THE DARK GRADIENT (Only visible at the very top of the site) */}
      <div className="header-scrim"></div>

      <div className="logo-wrapper">
        <button type="button" onClick={() => shutterTo("/")} className="logo-btn">
          <img src="/logo.png" alt="Dany Majeed" className="logo" />
        </button>
      </div>

      <nav>
        <button type="button" onClick={() => shutterTo("/portfolio")} className={`nav-link ${isActive("/portfolio") ? "active-page" : ""}`}>
          Showcase
        </button>
        <button type="button" onClick={() => shutterTo("/")} className={`nav-link nav-home ${isActive("/") ? "active-page" : ""}`}>
          Home
        </button>
        <button type="button" onClick={() => shutterTo("/services")} className={`nav-link ${isActive("/services") ? "active-page" : ""}`}>
          Services
        </button>
      </nav>
    </header>
  );
};

export default Header;