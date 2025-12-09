// src/components/VelocityCTA.js
import React, { useRef, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useSpring, 
  useTransform, 
  useMotionValue, 
  useVelocity, 
  useAnimationFrame 
} from 'framer-motion';
import { PopupModal } from "react-calendly";

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // We wrap the % movement to create the infinite loop
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax-text">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

const VelocityCTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="velocity-cta-section">
      
      {/* This container is now rotated and huge.
          It sits in the background but bleeds out.
      */}
      <div className="velocity-angled-wrapper">
        <ParallaxText baseVelocity={-1}>CREATE LEGACY — BUILD VALUE —</ParallaxText>
        <ParallaxText baseVelocity={1}>CAPTURE MOMENTS — DEFINE STYLE —</ParallaxText>
        <ParallaxText baseVelocity={-2}>VISUAL EXCELLENCE — TIMELESS —</ParallaxText>
        <ParallaxText baseVelocity={2}>STORY DRIVEN — DETAIL OBSESSED —</ParallaxText>
        <ParallaxText baseVelocity={-1}>CREATE LEGACY — BUILD VALUE —</ParallaxText>
        <ParallaxText baseVelocity={1}>CAPTURE MOMENTS — DEFINE STYLE —</ParallaxText>
        <ParallaxText baseVelocity={-2}>VISUAL EXCELLENCE — TIMELESS —</ParallaxText>
        <ParallaxText baseVelocity={2}>STORY DRIVEN — DETAIL OBSESSED —</ParallaxText>
        <ParallaxText baseVelocity={-1}>CREATE LEGACY — BUILD VALUE —</ParallaxText>
        <ParallaxText baseVelocity={1}>CAPTURE MOMENTS — DEFINE STYLE —</ParallaxText>
      </div>

      {/* FOREGROUND BOX (Pure & Sharp) */}
      <div className="cta-interaction-box">
        <div className="cta-content">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            Ready to <br/>
            <span className="hollow-text-white">Stand Out?</span>
          </motion.h2>
          
          <p>Secure your date. Elevate your brand.</p>
          
          <motion.button 
            className="velocity-book-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
          >
            Book Now
          </motion.button>
        </div>
        <div className="box-gloss"></div>
      </div>

      <PopupModal
        url="https://calendly.com/danymajeed/essential-re" 
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={document.getElementById("root")}
      />
    </section>
  );
};

export default VelocityCTA;