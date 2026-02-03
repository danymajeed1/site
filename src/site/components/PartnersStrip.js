// src/components/PartnersStrip.js
import React from 'react';
import { motion } from 'framer-motion';

const attributes = [
  { id: 1, text: 'FAA Part 107 Certified' }, // Shows legal compliance for drones
  { id: 2, text: 'Zillow Certified Photographer' }, // Real Estate authority
  { id: 3, text: 'Sony Imaging Pro' }, // Gear authority
  { id: 4, text: '48hr Turnaround' }, // Speed guarantee
  { id: 5, text: '5-Star Rated' }, // Social proof
];

const PartnersStrip = () => {
  return (
    <div className="partners-strip">
      <div className="partners-label">Credentials</div>
      
      <div className="partners-track">
        {attributes.map((attr, index) => (
          <motion.div 
            key={attr.id}
            className="partner-item"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
          >
            <span className="partner-text">{attr.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PartnersStrip;