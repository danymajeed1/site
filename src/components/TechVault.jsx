import React from 'react';
import { motion } from 'framer-motion';
import './TechVault.css';

const techItems = [
  {
    id: "camera",
    colSpan: 8, // Spans wide on desktop
    category: "Primary Body",
    title: "Sony α7 Series", // Elevated from a7iii
    hero: "FULL-FRAME",
    desc: "15-stop dynamic range for pristine low-light performance and 4K cinematic capture."
  },
  {
    id: "lens",
    colSpan: 4, // Spans small on desktop
    category: "Optics",
    title: "Sony G-Master",
    hero: "f/1.4",
    desc: "Industry-leading glass for razor-sharp details, flawless autofocus, and beautiful bokeh."
  },
  {
    id: "drone",
    colSpan: 4,
    category: "Aerial Cinema",
    title: "DJI 4K System", // Elevated from Mini 4K
    hero: "4K UHD",
    desc: "Precision flight dynamics for dramatic establishing shots and high-speed subject tracking."
  },
  {
    id: "action",
    colSpan: 4,
    category: "Immersive",
    title: "Insta360 X-Series", // Keeps it vague and professional
    hero: "8K 360°",
    desc: "Invisible camera techniques and impossible angles for high-energy action reframing."
  },
  {
    id: "software",
    colSpan: 4,
    category: "Finishing",
    title: "Adobe CC Suite",
    hero: "10-BIT",
    desc: "Advanced color grading and timeline mastering via Premiere Pro and After Effects."
  }
];

export default function TechVault() {
  return (
    <section className="arsenal-section">
      <div className="arsenal-header">
        <span className="section-tag">The Arsenal</span>
        <h2 className="arsenal-h2">Production <span className="hollow-text">Gear.</span></h2>
      </div>

      <div className="arsenal-grid">
        {techItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`arsenal-card span-${item.colSpan}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="arsenal-content">
              <span className="arsenal-cat">{item.category}</span>
              <h3 className="arsenal-title">{item.title}</h3>
              <p className="arsenal-desc">{item.desc}</p>
            </div>
            {/* The giant hollow background text */}
            <div className="arsenal-hero" aria-hidden="true">{item.hero}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}