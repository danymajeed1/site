// src/components/VelocityCTA.js
import React, { useRef, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from 'framer-motion';
// IMPORT CALENDLY POPUP
import { PopupModal } from "react-calendly";

/* --- UTILITY HELPER --- */
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/* --- MARQUEE COMPONENT --- */
function MarqueeText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="marquee-line">
      <motion.div className="marquee-track" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

/* --- MAIN COMPONENT --- */
const VelocityCTA = () => {
  // State to control the Scheduling Popup
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="velocity-cta-section">
      
      {/* 1. INFINITE SCROLLING BACKGROUND TEXT */}
      <div className="velocity-marquee-wrapper">
        <MarqueeText baseVelocity={-2}>Ready to Shoot? •</MarqueeText>
        <MarqueeText baseVelocity={2}>Secure Your Date •</MarqueeText>
      </div>

      {/* 2. THE GLASS CARD */}
      <div className="cta-card-container">
        <div className="cta-glass-card">
          <h2 className="cta-title">Lock in your date.</h2>
          <p className="cta-subtitle">
            Skip the back-and-forth emails. Check my real-time availability and book your session instantly.
          </p>
          
          <div className="cta-actions">
            {/* BUTTON 1: OPENS CALENDAR POPUP */}
            <button 
              className="btn-cta-primary"
              onClick={() => setIsOpen(true)}
            >
              Book Now
            </button>

            {/* BUTTON 2: SCROLLS TO CONTACT FORM (For custom quotes) */}
            <a href="#contact" className="btn-cta-ghost">
              Request Quote
            </a>
          </div>
        </div>
      </div>

      {/* 3. THE CALENDLY POPUP COMPONENT */}
      <PopupModal
        url="https://calendly.com/danymajeed-demo" // REPLACE THIS WITH YOUR REAL LINK LATER
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        /* Uses the parent element to mount */
        rootElement={document.getElementById("root")}
      />
      
    </section>
  );
};

export default VelocityCTA;