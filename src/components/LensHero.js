// src/components/LensHero.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'; 
import { Link } from 'react-router-dom';

const LensHero = () => {
  // --- MOBILE CHECK ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- INTERACTION LOGIC ---
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 }); // Start off-screen
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);
  
  // Smaller lens on mobile for better proportions
  const size = isMobile ? 250 : 350; 
  const imgUrl = "/bg.jpg"; 

  // ELASTIC CONFIG (Desktop Only)
  const curveX = useMotionValue(0);
  const curveY = useMotionValue(0);
  const smoothX = useSpring(curveX, { stiffness: 600, damping: 15 });
  const smoothY = useSpring(curveY, { stiffness: 600, damping: 15 });

  const path = useTransform([smoothX, smoothY], ([x, y]) => {
    const width = window.innerWidth;
    const curveWidth = 250; 
    const startX = Math.max(0, x - curveWidth);
    const endX = Math.min(width, x + curveWidth);
    return `M0,0 L${startX},0 Q${x},${y} ${endX},0 L${width},0`;
  });

  // --- AUTOMATION FOR MOBILE (The Ghost Lens) ---
  useEffect(() => {
    // Only run this "Ghost" animation on Mobile
    if (!isMobile) return;

    let animationFrameId;
    let time = 0;

    const animateMobileLens = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Calculate center of the hero section
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // MOVEMENT LOGIC: Smooth Figure-8 Pattern
      // We use Math.sin and Math.cos with different speeds to create an organic loop
      const offsetX = Math.sin(time * 0.0015) * (rect.width * 0.25); // Moves Left/Right
      const offsetY = Math.cos(time * 0.002) * (rect.height * 0.1);  // Moves Up/Down

      const newX = centerX + offsetX;
      const newY = centerY + offsetY;

      setMousePos({ x: newX, y: newY });
      setIsHovering(true); // Force the reveal layer to stay ON

      time += 16; // Increment time
      animationFrameId = requestAnimationFrame(animateMobileLens);
    };

    animateMobileLens();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isMobile]);


  // --- DESKTOP MOUSE HANDLER ---
  const handleMouseMove = (e) => {
    if (isMobile) return; // Disable manual mouse tracking on mobile
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    setIsHovering(true);

    // Elastic Drag Logic (Desktop)
    const distFromBottom = rect.height - y;
    if (distFromBottom < 250 && distFromBottom > 0) {
       const pullStrength = (250 - distFromBottom) * 0.8; 
       curveX.set(e.clientX); 
       curveY.set(pullStrength); 
    } else {
       curveY.set(0);
    }
  };

  const handleMouseLeave = () => {
     if (isMobile) return; 
     setIsHovering(false);
     curveY.set(0); 
  }

  const styleVars = {
    '--x': `${mousePos.x}px`,
    '--y': `${mousePos.y}px`,
    '--size': `${size}px`
  };

  return (
    <section 
      ref={containerRef}
      className="lens-hero"
      // Attach handlers only if Desktop
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
      style={styleVars} 
    >
      <div className="hero-top-gradient"></div>

      {/* IMAGE LAYERS */}
      <div className="hero-image-clipper">
        {/* Layer 1: Dark/Blurred Background */}
        <div className="hero-layer base-layer">
          <img src={imgUrl} alt="Background" />
          <div className="dark-overlay"></div>
        </div>

        {/* Layer 2: The Reveal */}
        {/* logic: If hovering (Desktop) OR if Mobile (Always Active) */}
        <div className={`hero-layer reveal-layer ${isHovering ? 'active' : ''}`}>
          <img src={imgUrl} alt="Reveal" className="clean-img"/>
        </div>
      </div>

      {/* DESKTOP: ELASTIC CURTAIN (Hidden on Mobile) */}
      {!isMobile && (
        <div className="elastic-border">
          <svg width="100%" height="300" style={{ overflow: 'visible' }}>
            <defs>
              <pattern id="stretch-img" patternUnits="userSpaceOnUse" width="100%" height="1000">
                <image href={imgUrl} x="0" y="-800" width="100%" height="1200" preserveAspectRatio="xMidYMid slice"/>
              </pattern>
            </defs>
            <motion.path 
              d={path} 
              fill="url(#stretch-img)" 
              stroke="rgba(255,255,255,0.6)" 
              strokeWidth="3" 
            />
          </svg>
        </div>
      )}

      {/* TEXT CONTENT */}
      <div className="hero-content-lens">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="lens-title">
            FOCUS ON <br/>
            <span className="hollow-text">THE UNSEEN</span>
          </h1>
          <div className="hero-actions">
            <Link to="/portfolio" className="lens-btn">
              Explore Work
            </Link>
          </div>
        </motion.div>
      </div>

      {/* HINT (Desktop Only) */}
      {!isMobile && (
        <div className="lens-hint">
          <span>Drag bottom to exit</span>
        </div>
      )}
    </section>
  );
};

export default LensHero;