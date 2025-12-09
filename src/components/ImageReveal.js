// src/components/ImageReveal.js
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowBackground from './FlowBackground'; // <--- Import

const ImageReveal = () => {
  const [activeTab, setActiveTab] = useState('realestate');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  // DATA: Updated image paths to generic placeholders
  const tabs = [
    { 
      id: 'realestate', 
      label: 'Real Estate', 
      title: 'HDR & Flambient Blending',
      description: 'I manually blend multiple exposures to ensure windows are clear, interiors are bright, and colors are accurate.',
      // Pair 1
      before: '/photo1.jpg', 
      after: '/photo2.jpg' 
    },
    { 
      id: 'wedding', 
      label: 'Weddings', 
      title: 'Timeless Color Grading',
      description: 'My skin tone science ensures you look natural, while the environment pops with cinematic depth.',
      // Pair 2
      before: '/photo3.jpg', 
      after: '/photo4.jpg' 
    },
    { 
      id: 'restore', 
      label: 'Restoration', 
      title: 'AI-Powered Restoration',
      description: 'Using advanced AI models, I reconstruct missing details and colorize vintage memories.',
      // Pair 3
      before: '/photo5.jpg', 
      after: '/photo6.jpg' 
    }
  ];

  const currentPair = tabs.find(t => t.id === activeTab);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <section className="reveal-section">
      {/* 1. THE PIANO BLACK BACKGROUND */}
      <FlowBackground />

      <div className="reveal-content-grid" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* LEFT: DYNAMIC TEXT */}
        <div className="reveal-text-side">
          <div className="reveal-tabs">
            {tabs.map(tab => (
              <button 
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode='wait'>
            <motion.div
              key={activeTab} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="dynamic-description"
            >
              <h3>{currentPair.title}</h3>
              <p>{currentPair.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: THE SLIDER */}
        <div 
          className="reveal-container" 
          ref={containerRef}
          onMouseMove={(e) => handleMove(e.clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        >
          <img src={currentPair.after} alt="Edited" className="reveal-img-bg" draggable="false" />
          
          <div 
            className="reveal-img-fg" 
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          >
            <img src={currentPair.before} alt="Raw" draggable="false" />
            <span className="label-badge before">RAW</span>
          </div>

          <span className="label-badge after">EDITED</span>

          <div className="reveal-handle" style={{ left: `${sliderPosition}%` }}>
            <div className="handle-circle"><>&#8644;</></div>
          </div>
        </div>

      </div>
      <p className="reveal-hint" style={{ position: 'relative', zIndex: 2 }}>Drag slider to compare</p>
    </section>
  );
};

export default ImageReveal;