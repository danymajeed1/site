import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './InstagramTrack.css';

// --- IMPORT YOUR ACTUAL INSTAGRAM COVERS HERE ---
// Make sure you save 4 images into your assets folder!
import igPost1 from '../assets/images/ig1.jpg'; 
import igPost2 from '../assets/images/ig2.jpg';
import igPost3 from '../assets/images/ig3.jpg';
import igPost4 from '../assets/images/ig4.webp';

// --- UPDATE WITH YOUR ACTUAL POST LINKS AND STATS ---
const igPosts = [
  {
    id: 1,
    type: "Reel",
    views: "12.4K", // Change to your actual views/likes
    img: igPost1,
    link: "https://www.instagram.com/reel/DL2kv66uxxB/" // Paste your actual IG post URL here
  },
  {
    id: 2,
    type: "Carousel",
    views: "8.2K",
    img: igPost2,
    link: "https://www.instagram.com/p/CzQVpuUO_zV/?img_index=1"
  },
  {
    id: 3,
    type: "Reel",
    views: "2.1K",
    img: igPost3,
    link: "https://www.instagram.com/reel/CrGOm4MvsUW/"
  },
  {
    id: 4,
    type: "Post",
    views: "1K",
    img: igPost4,
    link: "https://www.instagram.com/p/DMSf4uOOvwS/?img_index=1"
  }
];

export default function InstagramTrack() {
  const containerRef = useRef(null);

  return (
    <section className="ig-section" id="social">
      <div className="ig-header-wrapper">
        <div className="ig-header-text">
          <span className="section-tag">Live Journal</span>
          <h2 className="ig-title">
            Behind the <span className="hollow-text">Lens.</span>
          </h2>
          <p className="ig-subtitle">Follow the latest productions, BTS, and final cuts.</p>
        </div>
        
        {/* LINKED DIRECTLY TO YOUR PROFILE */}
        <a href="https://instagram.com/danymajeed" target="_blank" rel="noreferrer" className="ig-follow-btn">
          @danymajeed ↗
        </a>
      </div>

      <div className="ig-track-container" ref={containerRef}>
        <div className="ig-track">
          {igPosts.map((post, i) => (
            <motion.a 
              href={post.link} 
              target="_blank" 
              rel="noreferrer"
              key={post.id}
              className="ig-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="ig-img-wrap">
                <img src={post.img} alt={`Instagram ${post.type} by @danymajeed`} loading="lazy" />
              </div>
              
              {/* Hover Glass Overlay */}
              <div className="ig-overlay">
                <div className="ig-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </div>

              {/* Meta Data */}
              <div className="ig-meta">
                <span className="ig-type">{post.type}</span>
                <span className="ig-views">{post.views}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}