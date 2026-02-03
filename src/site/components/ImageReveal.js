import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageReveal.css';

const examples = [
  {
    id: "real-estate",
    label: "REAL ESTATE",
    before: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600",
    after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600",
    title: "ARCHITECTURAL PRECISION",
    description: "Neutralizing harsh window light and recovering deep shadow detail through advanced HDR blending."
  },
  {
    id: "weddings",
    label: "WEDDINGS",
    before: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600",
    after: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1600",
    title: "CINEMATIC GRADING",
    description: "Protecting natural skin tones while applying a sophisticated, film-inspired color science."
  },
  {
    id: "restoration",
    label: "RESTORATION",
    before: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1600",
    after: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1600",
    title: "NEURAL RECOVERY",
    description: "Deep-learning scratch removal and AI-driven colorization to breathe life into historical archives."
  }
];

const ImageReveal = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos] = useState(50);
  const [frameWidth, setFrameWidth] = useState(0);
  const containerRef = useRef(null);

  // Updates the image width to prevent distortion when resizing
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setFrameWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

const handleMove = (e) => {
  if (!containerRef.current) return;
  const { left, width } = containerRef.current.getBoundingClientRect();
  const percent = ((e.clientX - left) / width) * 100;
  
  // requestAnimationFrame is like 120fps for your code logic
  requestAnimationFrame(() => {
    containerRef.current.style.setProperty('--reveal-pos', `${percent}%`);
  });
};

// In your return, use 'var(--reveal-pos, 50%)' for the width/left styles

  return (
    <div className="reveal-master-wrapper">
      
      {/* MINIMALIST SEAMLESS TITLE */}
      <motion.div 
        className="reveal-title-box"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="reveal-main-h2">POST-PRODUCTION</h2>
      </motion.div>

      <div className="reveal-workstation">
        
        {/* NAV: LEFT */}
        <div className="reveal-nav-area">
          {examples.map((ex, i) => (
            <button 
              key={ex.id}
              className={activeIdx === i ? "reveal-btn active" : "reveal-btn"}
              onClick={() => setActiveIdx(i)}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* CENTER: THE LARGE VIEWER */}
        <div className="reveal-viewer-big" ref={containerRef} onMouseMove={handleMove}>
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIdx}
              className="reveal-engine-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* EDITED IMAGE */}
              <div 
                className="reveal-img after-img" 
                style={{ backgroundImage: `url(${examples[activeIdx].after})` }} 
              />
              
              {/* RAW IMAGE (Clipped) */}
              <div 
                className="reveal-img-clip" 
                style={{ width: `${sliderPos}%` }} 
              >
                <div 
                  className="reveal-img before-img" 
                  style={{ 
                    backgroundImage: `url(${examples[activeIdx].before})`,
                    width: `${frameWidth}px` 
                  }} 
                />
              </div>

              {/* SLIDER LINE */}
              <div className="reveal-slider-line" style={{ left: `${sliderPos}%` }}>
                <div className="line-glow"></div>
                <div className="line-handle"></div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* POPPING LABELS */}
          <div className="reveal-tags-glow">
            <span className="tag-raw">SOURCE_RAW</span>
            <span className="tag-grade">FINAL_GRADE</span>
          </div>
        </div>

        {/* INFO: RIGHT */}
        <div className="reveal-info-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="reveal-h3">{examples[activeIdx].title}</h3>
              <p className="reveal-p">{examples[activeIdx].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ImageReveal;