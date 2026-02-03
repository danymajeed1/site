// src/components/IntroSection.jsx
import React from 'react';

function IntroSection() {
  return (
    <section id="intro" className="intro-bridge">
      <div className="intro-inner">
        {/* Left column: headline + text + CTAs */}
        <div className="intro-text">
          <h2>Story-Driven Photography</h2>
          <p>
            Weddings and real estate are my specialty—crafted lighting, editorial
            composition, and post-production you can feel. Explore services below
            or jump straight to the work.
          </p>

          <div className="intro-cta">
            <a className="btn" href="#services">
              Explore Services
            </a>
            <a className="btn btn-ghost" href="#gallery">
              View Gallery
            </a>
          </div>
        </div>

        {/* Right column: your photo + stats */}
        <div className="intro-side">
          <div className="intro-photo">
            <img src="/me.jpg" alt="Photographer Portrait" />
          </div>

          <div className="intro-stats">
            <div className="stat">
              <span className="num">100+</span>
              <span className="label">Events Captured</span>
            </div>
            <div className="stat">
              <span className="num">5</span>
              <span className="label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="num">5★</span>
              <span className="label">Client Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* subtle divider to services */}
      <svg
        className="intro-curve"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,50 C300,90 1140,10 1440,50 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}

export default IntroSection;
