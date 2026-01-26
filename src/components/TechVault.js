import React from 'react';
import { motion } from 'framer-motion';

const techItems = [
  { title: "PHASE ONE XF", category: "Optics", desc: "100MP medium format precision for unmatched detail." },
  { title: "NEURAL ENGINE", category: "Processing", desc: "AI-driven upscaling and noise reduction clusters." },
  { title: "8K COLOR SUITE", category: "Post-Production", desc: "EIZO calibrated monitoring for true-to-life grading." },
];

const TechVault = () => {
  return (
    <section className="tech-vault-section">
      <div className="vault-header">
        <span className="section-tag">The Equipment</span>
        <h2>Precision <span className="hollow-text">Instruments.</span></h2>
      </div>

      <div className="vault-grid">
        {techItems.map((item, index) => (
          <motion.div 
            key={index}
            className="tech-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="card-glass">
              <span className="tech-cat">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <div className="tech-glow"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechVault;