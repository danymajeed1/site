// src/pages/PortfolioPage.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import FlowBackground from '../components/FlowBackground';
import SEO from '../components/SEO';

const portfolioData = [
  // --- REAL ESTATE ---
  { id: 101, category: 'realestate', src: 'realestate/1.webp' },
  { id: 102, category: 'realestate', src: 'realestate/2.webp' },
  { id: 103, category: 'realestate', src: 'realestate/3.webp' },
  { id: 104, category: 'realestate', src: 'realestate/4.webp' },
  { id: 105, category: 'realestate', src: 'realestate/5.webp' },
  { id: 106, category: 'realestate', src: 'realestate/6.webp' },
  { id: 107, category: 'realestate', src: 'realestate/7.webp' },
  { id: 108, category: 'realestate', src: 'realestate/8.webp' },
  { id: 109, category: 'realestate', src: 'realestate/9.webp' },
  { id: 110, category: 'realestate', src: 'realestate/10.webp' },
  { id: 111, category: 'realestate', src: 'realestate/11.webp' },
  { id: 112, category: 'realestate', src: 'realestate/12.webp' },
  { id: 113, category: 'realestate', src: 'realestate/13.webp' },

  // --- MATERNITY ---
  { id: 201, category: 'maternity', src: '/maternity/1.webp' },
  { id: 202, category: 'maternity', src: '/maternity/2.webp' },
  { id: 203, category: 'maternity', src: '/maternity/3.webp' },
  { id: 204, category: 'maternity', src: '/maternity/4.webp' },
  { id: 205, category: 'maternity', src: '/maternity/5.webp' },
  { id: 206, category: 'maternity', src: '/maternity/6.webp' },
  { id: 207, category: 'maternity', src: '/maternity/7.webp' },
  { id: 208, category: 'maternity', src: '/maternity/8.webp' },
  { id: 209, category: 'maternity', src: '/maternity/9.webp' },
  { id: 210, category: 'maternity', src: '/maternity/10.webp' },

  // --- WEDDINGS ---
  { id: 300, category: 'wedding',   src: '/wedding/photo2.jpg' }, 
  { id: 301, category: 'wedding',   src: '/wedding/1.webp' }, 
  { id: 302, category: 'wedding',   src: '/wedding/2.webp' },
  { id: 303, category: 'wedding',   src: '/wedding/3.webp' },
  { id: 304, category: 'wedding',   src: '/wedding/4.webp' },
  { id: 305, category: 'wedding',   src: '/wedding/5.webp' },
  { id: 306, category: 'wedding',   src: '/wedding/6.webp' },
  { id: 307, category: 'wedding',   src: '/wedding/7.webp' },
  { id: 308, category: 'wedding',   src: '/wedding/8.webp' }, 
  { id: 309, category: 'wedding',   src: '/wedding/9.webp' },
  { id: 310, category: 'wedding',   src: '/wedding/10.webp' },
  { id: 311, category: 'wedding',   src: '/wedding/11.webp' },
  { id: 312, category: 'wedding',   src: '/wedding/12.webp' },
  { id: 313, category: 'wedding',   src: '/wedding/13.webp' },
  { id: 314, category: 'wedding',   src: '/wedding/14.webp' },
  { id: 315, category: 'wedding',   src: '/wedding/15.webp' },
  { id: 316, category: 'wedding',   src: '/wedding/16.webp' },
  { id: 317, category: 'wedding',   src: '/wedding/17.webp' },
  { id: 318, category: 'wedding',   src: '/wedding/18.webp' },
  { id: 319, category: 'wedding',   src: '/wedding/19.webp' },
  { id: 320, category: 'wedding',   src: '/wedding/20.webp' },
  
  // --- PORTRAITS ---
  { id: 401, category: 'portrait',   src: 'portraits/1.webp' },
  { id: 402, category: 'portrait',   src: 'portraits/2.webp' },
  { id: 403, category: 'portrait',   src: 'portraits/3.webp' },
  { id: 404, category: 'portrait',   src: 'portraits/4.webp' },
  { id: 405, category: 'portrait',   src: 'portraits/5.webp' },
  { id: 406, category: 'portrait',   src: 'portraits/6.webp' },
  { id: 407, category: 'portrait',   src: 'portraits/7.webp' },
  { id: 408, category: 'portrait',   src: 'portraits/8.webp' },
  { id: 409, category: 'portrait',   src: 'portraits/9.webp' },
  { id: 410, category: 'portrait',   src: 'portraits/10.webp' },
  { id: 411, category: 'portrait',   src: 'portraits/11.webp' },
  { id: 412, category: 'portrait',   src: 'portraits/12.webp' },
  { id: 413, category: 'portrait',   src: 'portraits/13.webp' },
  { id: 414, category: 'portrait',   src: 'portraits/14.webp' },
  { id: 415, category: 'portrait',   src: 'portraits/15.webp' },
  { id: 416, category: 'portrait',   src: 'portraits/16.webp' },
  { id: 417, category: 'portrait',   src: 'portraits/17.webp' },

  // --- EVENTS ---
  { id: 501, category: 'events',     src: 'event/1.webp' },
  { id: 502, category: 'events',     src: 'event/2.webp' },
  { id: 503, category: 'events',     src: 'event/3.webp' },
  { id: 504, category: 'events',     src: 'event/4.webp' },
  { id: 505, category: 'events',     src: 'event/5.webp' },
  { id: 506, category: 'events',     src: 'event/6.webp' },
  { id: 507, category: 'events',     src: 'event/7.webp' },
  { id: 508, category: 'events',     src: 'event/8.webp' },
  { id: 509, category: 'events',     src: 'event/9.webp' },
  { id: 510, category: 'events',     src: 'event/10.webp' },
  { id: 511, category: 'events',     src: 'event/11.webp' },

  // --- ART ---
  { id: 601, category: 'art',        src: 'art/1.webp' }, 
  { id: 602, category: 'art',        src: 'art/2.webp' }, 
  { id: 603, category: 'art',        src: 'art/3.webp' }, 
  { id: 604, category: 'art',        src: 'art/4.webp' }, 
  { id: 605, category: 'art',        src: 'art/5.webp' },
  { id: 606, category: 'art',        src: 'art/6.webp' },
  { id: 607, category: 'art',        src: 'art/7.webp' },
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'maternity', label: 'Maternity' },
  { id: 'realestate', label: 'Real Estate' },
  { id: 'portrait', label: 'Portraits' },
  { id: 'events', label: 'Events' },
  { id: 'art', label: 'Art / Personal' }
];

// --- SHUFFLE FUNCTION ---
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // --- RANDOMIZE IMAGES ON LOAD ---
  // useMemo ensures it only shuffles once when the user visits the page
  const randomizedPortfolio = useMemo(() => shuffleArray(portfolioData), []);

  const shutterTo = useCallback((to) => {
    if (to === path) return;
    document.body.classList.add("shutter-on");
    setSelectedIndex(null);
    
    window.setTimeout(() => {
      navigate(to);
      window.scrollTo(0, 0); 
      window.setTimeout(() => {
        document.body.classList.remove("shutter-on");
      }, 60);
    }, 380); 
  }, [navigate, path]);

  // Use the randomized array for filtering
  const filteredItems = activeFilter === 'all' 
    ? randomizedPortfolio 
    : randomizedPortfolio.filter(item => item.category === activeFilter);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  }, [filteredItems.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  }, [filteredItems.length]);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev, closeLightbox]);

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedIndex]);

  return (
    <div className="portfolio-page">
      <FlowBackground />
    <SEO 
        title="Premium Photography Services in Austin, TX" 
        description="Book luxury real estate photography, intimate cinematic weddings, and high-end editorial portraits. Specializing in bold, bright imagery with dramatic shadows."
        url="https://danymajeed.com/services"
      />
      
      <div className="portfolio-hero">
        <div className="hero-text-wrapper">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-tag"
          >
            The Archive
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
              onClick={() => {
                setActiveFilter(cat.id);
                setSelectedIndex(null); 
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeFilter} 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="masonry-grid-container"
        >
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className="masonry-item"
              onClick={() => setSelectedIndex(index)}
            >
              <img 
                src={item.src} 
                alt={item.category} 
                loading="lazy" 
                decoding="async" 
              />
              <div className="masonry-overlay">
                <span className="cat-badge">{item.category}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button className="lightbox-nav left" onClick={handlePrev} aria-label="Previous image">&#10094;</button>

            <motion.img 
              key={filteredItems[selectedIndex].src}
              src={filteredItems[selectedIndex].src} 
              alt="Expanded view"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()} 
            />

            <button className="lightbox-nav right" onClick={handleNext} aria-label="Next image">&#10095;</button>
            <button className="close-lightbox" onClick={closeLightbox} aria-label="Close gallery">&times;</button>
            
            <button 
              className="lightbox-inquire-btn" 
              onClick={(e) => {
                e.stopPropagation(); 
                shutterTo('/contact'); 
              }}
            >
              Inquire About This Style
            </button>

            <div className="lightbox-counter">
              {selectedIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default PortfolioPage;