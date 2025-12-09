// src/components/BioStats.js
import React, { useState, useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import FlowBackground from './FlowBackground'; 

// --- COUNTER COMPONENT (Kept the same) ---
const Counter = ({ from, to }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let start = from;
      const duration = 2000;
      const stepTime = Math.abs(Math.floor(duration / (to - from)));
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === to) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, from, to]);

  return <span ref={ref}>{count}</span>;
};

const BioStats = () => {
  // 1. MOBILE CHECK
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. SCROLL ANIMATION HOOKS (For Mobile Only)
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"] 
    // "start end" = when top of card hits bottom of screen
    // "center center" = when center of card hits center of screen
  });

  // Mobile Transformations:
  // TILT: Starts tilted back 25 degrees, stands up to 0 degrees
  const mobileRotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  // LIGHT: Starts dark (60% brightness), goes to full brightness (100%)
  const mobileFilter = useTransform(scrollYProgress, [0, 1], ["brightness(0.6)", "brightness(1)"]);
  // SCALE: Slight zoom in as it focuses
  const mobileScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);


  return (
    <section className="bio-section" id="about">
      <FlowBackground />

      <div className="bio-container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* === PHOTO ZONE === */}
        {/* We use a different component wrapper based on Mobile vs Desktop */}
        
        <div className="bio-picture-zone" ref={targetRef}>
          {isMobile ? (
            /* --- MOBILE VERSION (Scroll Driven) --- */
            <motion.div 
              className="bio-card photo-card"
              style={{
                rotateX: mobileRotateX, // The "Standing Up" effect
                filter: mobileFilter,   // The "Lighting Up" effect
                scale: mobileScale,
                perspective: 1000       // Needs perspective to look 3D
              }}
            >
              <img src="/me.jpg" alt="Dany Majeed" className="bio-img" />
              <div className="bio-overlay">
                <div className="bio-badge">Creative Director</div>
                <h3>Dany Majeed</h3>
              </div>
              <div className="card-border"></div>
            </motion.div>
          ) : (
            /* --- DESKTOP VERSION (Mouse Driven) --- */
            <Tilt 
              tiltEnable={true} 
              trackOnWindow={false} /* FIXED: No longer follows mouse everywhere */
              tiltMaxAngleX={10} 
              tiltMaxAngleY={10} 
              perspective={1000} 
              scale={1.02} 
              className="bio-tilt-wrapper"
            >
              <div className="bio-card photo-card">
                <img src="/me.jpg" alt="Dany Majeed" className="bio-img" />
                <div className="bio-overlay">
                  <div className="bio-badge">Creative Director</div>
                  <h3>Dany Majeed</h3>
                </div>
                <div className="card-border"></div>
              </div>
            </Tilt>
          )}
        </div>

        {/* RIGHT: TEXT CONTENT (Unchanged) */}
        <div className="bio-content">
          <motion.h2 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bio-title"
          >
            Story Driven. <br/>
            <span className="highlight-text">Detail Obsessed.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bio-text"
          >
            I don't just take pictures; I build visual assets that sell brands and properties.
            With a background in <strong>Computer Science</strong>, I combine technical precision with 
            artistic intuition to deliver perfection in every pixel.
          </motion.p>

          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-num stat-pop"><Counter from={0} to={5} />+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-box">
              <span className="stat-num stat-pop"><Counter from={0} to={100} />+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-box">
              <span className="stat-num stat-pop">5<span className="star-icon">★</span></span>
              <span className="stat-label">Client Rating</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BioStats;