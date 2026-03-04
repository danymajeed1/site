// src/components/CreativePartners.js
import React from 'react';
import { motion } from 'framer-motion';

import lumisLogo from '../assets/lumis.png';
import meeksLogo from '../assets/uncle-meeks.jpg';

const CreativePartners = () => {
  return (
    <section className="creative-partners-section">
      <div className="cp-container">
        
        {/* LEFT: TEXT & LOGOS */}
        <div className="cp-text-side">
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            Collaborations
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Fueling Local <br/>
            <span className="hollow-text">Creativity.</span>
          </motion.h2>
          
          <p className="cp-desc">
            We partner with the city's best culinary and creative minds to translate flavor into visuals.
          </p>

          <div className="cp-logos">
             
             {/* PARTNER 1: LUMI'S CREPES */}
             <div className="cp-logo-row">
                <div className="partner-avatar">
                  <img src={lumisLogo} alt="Lumi's Crepes" />
                </div>
                <div className="cp-logo-text">
                  <div className="brand-name-row">
                    <h3>LUMI'S CREPES</h3>
                    <a href="https://www.instagram.com/lumiscrepes" target="_blank" rel="noopener noreferrer" className="partner-ig-icon" aria-label="Lumi's Crepes Instagram">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                  <span>Official Media Partner</span>
                </div>
             </div>

             {/* PARTNER 2: UNCLE MEEK'S */}
             <div className="cp-logo-row">
                <div className="partner-avatar">
                    <img src={meeksLogo} alt="Uncle Meek's Cuisine" />
                </div>
                <div className="cp-logo-text">
                    <div className="brand-name-row">
                      <h3>UNCLE MEEK'S CUISINE</h3>
                      <a href="https://www.instagram.com/unclemeekscuisine/" target="_blank" rel="noopener noreferrer" className="partner-ig-icon" aria-label="Uncle Meek's Cuisine Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                    </div>
                    <span>Cuisine & Content</span>
                </div>
             </div>

          </div>
        </div>

        {/* RIGHT: THE INSTAGRAM PHONE EMBED */}
        <div className="cp-visual-side">
          <div className="phone-bezel">
            <div className="phone-screen">
               <video 
                  controls={false}      
                  autoPlay              
                  muted                 
                  loop                  
                  playsInline           
                  poster="/chef-reel-poster.jpg" 
                  preload="metadata" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                >
                  <source src="/chef-reel-optimized.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
            </div>
            <div className="phone-gloss"></div>
          </div>
          <div className="cp-visual-bg-glow"></div>
        </div>

      </div>
    </section>
  );
};

export default CreativePartners;