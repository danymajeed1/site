// src/pages/PortfolioPage.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlowBackground from '../components/FlowBackground';

// --- SIMPLIFIED DATA ---
// No titles, no locations. Just ID, Category, and Source.
// Make sure you have these images in your public folder.
const portfolioData = [
  // Real Estate (Wider shots usually look good here)
  { id: 1, category: 'realestate', src: '/photo1.jpg' },
  { id: 4, category: 'realestate', src: '/photo4.jpg' },
  // Weddings (Mix of portrait and landscape)
  { id: 2, category: 'wedding',    src: '/photo2.jpg' },
  { id: 5, category: 'wedding',    src: '/photo5.jpg' },
  // Portraits (Taller shots)
  { id: 3, category: 'portrait',   src: '/photo3.jpg' },
  { id: 7, category: 'portrait',   src: '/hero.jpg' },
  // Events
  { id: 6, category: 'events',     src: '/photo6.jpg' },
  // NEW CATEGORY: ART (Nature, cars, abstract)
  { id: 8, category: 'art',        src: '/re-after.jpg' }, // Example image
  { id: 9, category: 'art',        src: '/wed-after.jpg' }, // Example image
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'realestate', label: 'Real Estate' },
  { id: 'portrait', label: 'Portraits' },
  { id: 'events', label: 'Events' },
  { id: 'art', label: 'Art / Personal' } // <-- New Tab
];

// Animation variants for the grid items
const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeFilter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

  return (
    <div className="portfolio-page">
      <FlowBackground />

      <div className="portfolio-hero">
        <div className="hero-text-wrapper">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-kicker"
          >
            The Archive
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Visual <span className="hollow-text">Legacy.</span>
          </motion.h1>
        </div>
      </div>

      <div className="filter-container">
        <div className="glass-filter-bar">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* MASONRY GRID CONTAINER */}
      <motion.div layout className="masonry-grid-container">
        <AnimatePresence mode='popLayout'>
          {filteredItems.map((item) => (
            <motion.div 
              layout 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={item.id} 
              className="masonry-item"
              onClick={() => setSelectedImage(item.src)}
            >
              <img src={item.src} alt={item.category} loading="lazy" />
              
              {/* SIMPLIFIED HOVER: Just the category badge */}
              <div className="masonry-overlay">
                <span className="cat-badge">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* LIGHTBOX (Simplified) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              src={selectedImage} 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()} 
            />
            <button className="close-lightbox" onClick={() => setSelectedImage(null)}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default PortfolioPage;