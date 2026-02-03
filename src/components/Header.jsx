// src/components/Header.jsx
import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ scrolled }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isActive = (route) => path === route;

  const shutterTo = useCallback(
    (to) => {
      if (to === path) return;

      // trigger global shutter (CSS will handle animation)
      document.body.classList.add("shutter-on");

      // navigate after shutter closes
      window.setTimeout(() => {
        navigate(to);

        // remove class shortly after route change
        window.setTimeout(() => {
          document.body.classList.remove("shutter-on");
        }, 60);
      }, 520);
    },
    [navigate, path]
  );

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="logo-wrapper">
        {/* LOGO */}
        <button
          type="button"
          onClick={() => shutterTo("/")}
          aria-label="Go to Home"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <img src="/logo.png" alt="Dany Majeed" className="logo" />
        </button>

        {/* NAV */}
        <nav>
          <button
            type="button"
            onClick={() => shutterTo("/portfolio")}
            className={`nav-link ${isActive("/portfolio") ? "active-page" : ""}`}
          >
            Showcase
          </button>

          <button
            type="button"
            onClick={() => shutterTo("/")}
            className={`nav-link ${isActive("/") ? "active-page" : ""}`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => shutterTo("/services")}
            className={`nav-link ${isActive("/services") ? "active-page" : ""}`}
          >
            Services
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
