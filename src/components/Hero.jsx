// src/components/Hero.jsx
import React from 'react';

function Hero({ showArrow, onArrowClick, heroSlide }) {
  return (
    <section
      id="home"
      className={`hero ${heroSlide ? 'slide-up' : ''}`}
      style={{
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(0,0,0,0.65),
          rgba(0,0,0,0.25) 55%,
          rgba(0,0,0,0.10) 100%
        ), url(${process.env.PUBLIC_URL}/bg.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="hero-inner">
        <div className="hero-badge hero-stack">
          <div className="hero-line vision">Your Vision.</div>

          <div className="hero-line timeless">
            <span
              className="typewriter"
              style={{ '--n': 10, '--type-dur': '2.1s' }}
            >
              Timelessly
            </span>
          </div>

          <div className="hero-line framed">Framed.</div>
        </div>
      </div>

      {showArrow && (
        <div className="scroll-arrow" onClick={onArrowClick}>
          <div className="arrow-track">
            <div className="arrow-line-mask">
              <div className="arrow-line"></div>
            </div>
          </div>
          <div className="arrow-head-animate"></div>
        </div>
      )}
    </section>
  );
}

export default Hero;
