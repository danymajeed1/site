import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageReveal.css';

const database = {
  "real-estate": [
    { id: "re1", before: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1920", after: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920", title: "HDR Window Pulls", desc: "Neutralizing harsh exterior light and recovering deep interior shadow detail." },
    { id: "re2", before: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920", after: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1920", title: "Twilight Conversion", desc: "Transforming flat daylight captures into premium, mood-driven twilight real estate." },
    { id: "re3", before: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1920", after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920", title: "Color Cast Removal", desc: "Stripping mixed indoor lighting temperatures to create pure, clean whites and natural tones." }
  ],
  "weddings": [
    { id: "wd1", before: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920", after: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1920", title: "Cinematic Grade", desc: "Applying a sophisticated, film-inspired color science while protecting natural skin tones." },
    { id: "wd2", before: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1920", after: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=1920", title: "Harsh Light Rescue", desc: "Softening blown-out mid-day ceremony highlights into dreamy, editorial exposures." },
    { id: "wd3", before: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1920", after: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1920", title: "Low-Light Polish", desc: "Removing reception ISO noise and enhancing ambient practical lighting." }
  ],
  "artwork": [
    { id: "aw1", before: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=1920", after: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1920", title: "Neural Recovery", desc: "AI-driven scratch removal and textural enhancement for archival preservation." },
    { id: "aw2", before: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1920", after: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1920", title: "Color Accuracy", desc: "Precision spectrum matching to ensure digital copies represent exact physical pigments." },
    { id: "aw3", before: "https://images.unsplash.com/photo-1561214115-f1f115383184?q=80&w=1920", after: "https://images.unsplash.com/photo-1578926288548-c2b48911762c?q=80&w=1920", title: "Sculptural Depth", desc: "Dodging and burning specific highlights to accentuate 3D geometry in 2D space." }
  ]
};

const categories = [
  { id: "real-estate", label: "Real Estate" },
  { id: "weddings", label: "Weddings" },
  { id: "artwork", label: "Artwork" }
];

export default function ImageReveal() {
  const [activeCat, setActiveCat] = useState("real-estate");
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  
  // Directly control the slider via React State (Foolproof for Safari/Mobile)
  const [sliderPos, setSliderPos] = useState(50);
  
  const activeData = database[activeCat][activeImgIdx];
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let percent = ((clientX - left) / width) * 100;
    
    // Lock it between 0% and 100%
    setSliderPos(Math.max(0, Math.min(100, percent)));
  };

  const handleCategoryChange = (catId) => {
    setActiveCat(catId);
    setActiveImgIdx(0);
    setSliderPos(50); // Reset slider to middle
  };

  return (
    <motion.div 
      className="post-master-wrapper"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      
      <div className="post-header">
        <span className="section-tag">Refinement</span>
        <h2 className="post-h2">
          Post <span className="hollow-text">Production.</span>
        </h2>
        <div className="post-tabs">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              className={`post-tab-btn ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="post-viewer-stage">
        <div 
          className="post-reveal-container" 
          ref={containerRef} 
          onMouseMove={handleMove}
          onTouchMove={handleMove}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeData.id}
              className="post-image-layers"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* AFTER IMAGE (Bottom Layer) */}
              <div 
                className="post-layer after-layer" 
                style={{ backgroundImage: `url(${activeData.after})` }} 
              />
              
              {/* BEFORE IMAGE (Top Layer, Clipped inline for guaranteed Safari support) */}
              <div 
                className="post-layer before-layer" 
                style={{ 
                  backgroundImage: `url(${activeData.before})`,
                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                  WebkitClipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`
                }} 
              />

              {/* SCRUBBER (Positioned inline) */}
              <div 
                className="post-scrubber" 
                style={{ left: `${sliderPos}%` }}
              >
                <div className="scrub-line"></div>
                <div className="scrub-handle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="post-tags">
            <span className="tag raw">RAW</span>
            <span className="tag final">FINAL</span>
          </div>
        </div>

        {/* CLICKABLE TEXT MENU */}
        <div className="post-meta-interactive">
          <div className="post-selector-row">
            {database[activeCat].map((item, idx) => (
              <button
                key={item.id}
                className={`post-select-btn ${activeImgIdx === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveImgIdx(idx);
                  setSliderPos(50); // Reset slider when clicking a new image
                }}
              >
                <span className="ps-num">0{idx + 1}</span>
                <span className="ps-title">{item.title}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="post-desc"
            >
              {activeData.desc}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}