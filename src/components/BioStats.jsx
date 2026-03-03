import React, { useState, useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './BioStats.css'; 

// --- COUNTER COMPONENT ---
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

export default function BioStats() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "center center"] 
  });

  const mobileRotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const mobileFilter = useTransform(scrollYProgress, [0, 1], ["brightness(0.6)", "brightness(1)"]);
  const mobileScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section className="bio-section-premium" id="about">
      <div className="bio-container-premium">
        
        {/* PHOTO ZONE (Your amazing 3D Tilt Effect) */}
        <div className="bio-picture-zone" ref={targetRef}>
          {isMobile ? (
            <motion.div 
              className="bio-card photo-card"
              style={{
                rotateX: mobileRotateX,
                filter: mobileFilter,
                scale: mobileScale,
                perspective: 1000
              }}
            >
              <img src="/me.webp" alt="Dany Majeed" className="bio-img" />
              <div className="bio-overlay">
                <div className="bio-badge">Creative Director</div>
                <h3>Dany Majeed</h3>
              </div>
              <div className="card-border"></div>
            </motion.div>
          ) : (
            <Tilt 
              tiltEnable={true} 
              trackOnWindow={false}
              tiltMaxAngleX={10} 
              tiltMaxAngleY={10} 
              perspective={1000} 
              scale={1.02} 
              className="bio-tilt-wrapper"
            >
              <div className="bio-card photo-card">
                <img src="/me.webp" alt="Dany Majeed" className="bio-img" />
                <div className="bio-overlay">
                  <div className="bio-badge">Creative Director</div>
                  <h3>Dany Majeed</h3>
                </div>
                <div className="card-border"></div>
              </div>
            </Tilt>
          )}
        </div>

        {/* PREMIUM EDITORIAL CONTENT */}
        <div className="bio-content-premium">
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            The Architect
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="bio-h2-premium"
          >
            Story Driven. <br/>
            <span className="hollow-text">Detail Obsessed.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bio-p-premium"
          >
            I build visual assets that sell brands, properties, and stories. 
            By combining technical <span className="text-glow">Computer Science</span> logic with 
            artistic intuition, I deliver absolute perfection in every frame.
          </motion.p>

          {/* STATS BENTO DASHBOARD */}
          <motion.div 
            className="bio-stats-dashboard"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="stat-block">
              <span className="stat-number"><Counter from={0} to={5} />+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-block">
              <span className="stat-number"><Counter from={0} to={100} />+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-block">
              <span className="stat-number">5<span className="star">★</span></span>
              <span className="stat-label">Rating</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}