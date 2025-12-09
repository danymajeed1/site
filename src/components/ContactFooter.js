// src/components/ContactFooter.js
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactFooter = () => {
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(""); // Track selection

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="grand-finale" ref={containerRef} id="contact">
      
      {/* 1. THE CONTACT FORM */}
      <div className="contact-zone">
        <div className="contact-header">
          <span className="section-tag">Custom Projects</span>
          <h2>Have a unique vision? <br/>Let's discuss.</h2>
        </div>

        <form className="luxury-form">
          {/* ROW 1: Name & Email */}
          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder=" " required id="name" />
              <label htmlFor="name">Your Name *</label>
            </div>
            <div className="form-group">
              <input type="email" placeholder=" " required id="email" />
              <label htmlFor="email">Email Address *</label>
            </div>
          </div>
          
          {/* ROW 2: Service Selection */}
          <div className="form-group">
            <select 
              id="service" 
              required 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="" disabled hidden></option>
              <option value="wedding">Wedding Photography</option>
              <option value="realestate">Real Estate / HDR</option>
              <option value="portrait">Editorial Portrait</option>
              <option value="maternity">Maternity Session</option>
              <option value="event">Corporate/Social Event</option>
              <option value="commercial">Commercial / Brand</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="service">Project Type *</label>
            <div className="select-arrow">↓</div>
          </div>

          {/* CONDITIONAL: "Other" Specification */}
          {selectedService === 'other' && (
            <div className="form-group slide-in">
              <input type="text" placeholder=" " id="other-specify" />
              <label htmlFor="other-specify">Please Specify</label>
            </div>
          )}

          {/* ROW 3: Date & Location */}
          <div className="form-row">
            <div className="form-group">
              {/* Using text type with onFocus to show date picker keeps the label clean */}
              <input 
                type="text" 
                placeholder=" " 
                onFocus={(e) => e.target.type = 'date'} 
                onBlur={(e) => e.target.type = 'text'}
                id="date" 
              />
              <label htmlFor="date">Event Date</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder=" " id="location" />
              <label htmlFor="location">Location / Venue</label>
            </div>
          </div>

          {/* ROW 4: Hours & Budget */}
          <div className="form-row">
            <div className="form-group">
              <input type="number" placeholder=" " id="duration" />
              <label htmlFor="duration">Estimated Hours</label>
            </div>
            <div className="form-group">
               <input type="text" placeholder=" " id="budget" />
               {/* Label will float high above the line */}
               <label htmlFor="budget">Estimated Budget (Optional)</label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Send Inquiry
          </button>
        </form>
      </div>

      {/* 2. THE FOOTER */}
      <div className="footer-zone">
        <motion.div className="footer-bg-text" style={{ y }}>
          DANY MAJEED
        </motion.div>

        <div className="footer-content">
          <div className="footer-cols">
            <div className="col">
              <h4>Sitemap</h4>
              <Link to="/">Home</Link>
              <Link to="/portfolio">Showcase</Link>
              <Link to="/services">Services</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="col">
              <h4>Socials</h4>
              <a href="#!" target="_blank" rel="noreferrer">Instagram</a>
              <a href="#!" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="#!" target="_blank" rel="noreferrer">Behance</a>
            </div>
            <div className="col">
              <h4>Legal</h4>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <span className="copyright">© 2025 Dany Majeed.</span>
            </div>
          </div>
          <button onClick={scrollToTop} className="back-to-top">↑ Top</button>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;