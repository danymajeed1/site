// src/components/CreativePartners.js
import React from 'react';
import { motion } from 'framer-motion';

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
             
             {/* PARTNER 1: LUMI'S CREPES (With Logo) */}
             <div className="cp-logo-row">
                {/* Ensure 'lumis.png' is in your PUBLIC folder */}
                <div className="partner-avatar">
                  <img src="/lumis.png" alt="Lumi's Crepes" />
                </div>
                <div className="cp-logo-text">
                  <h3>LUMI'S CREPES</h3>
                  <span>Official Media Partner</span>
                </div>
             </div>

             {/* PARTNER 2: UNCLE MEEK'S */}
             <div className="cp-logo-row">
                    {/* NEW: Using the downloaded image */}
                    <div className="partner-avatar">
                        <img src="/uncle-meeks.jpg" alt="Uncle Meek's Cuisine" />
                    </div>
                    <div className="cp-logo-text">
                        <h3>UNCLE MEEK'S CUISINE</h3>
                        <span>Cuisine & Content</span>
                    </div>
                    </div>

          </div>
        </div>

        {/* RIGHT: THE INSTAGRAM PHONE EMBED */}
        <div className="cp-visual-side">
          <div className="phone-bezel">
            <div className="phone-screen">
              {/* UPDATED REEL LINK */}
           <video 
  controls={false}      
  autoPlay              
  muted                 /* CRITICAL for mobile inline playback */
  loop                  
  playsInline           /* CRITICAL for iOS/Android */
  poster="/chef-reel-poster.jpg" 
  preload="metadata" 
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
>
  <source src="/chef-reel-optimized.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
            </div>
            {/* Glossy reflection on phone */}
            <div className="phone-gloss"></div>
          </div>
          
          <div className="cp-visual-bg-glow"></div>
        </div>

      </div>
    </section>
  );
};

export default CreativePartners;