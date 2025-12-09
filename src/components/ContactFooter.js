// src/components/ContactFooter.js
import React, { useRef, useState } from 'react';
import { useScroll } from 'framer-motion';

const ContactFooter = () => {
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(""); 

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // --- SCROLL TO TOP LOGIC ---
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth glide back up
    });
  };

  return (
    <section className="grand-finale" ref={containerRef} id="contact">
      
      {/* 1. THE CONTACT FORM ZONE */}
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

          {selectedService === 'other' && (
            <div className="form-group slide-in">
              <input type="text" placeholder=" " id="other-specify" />
              <label htmlFor="other-specify">Please Specify</label>
            </div>
          )}

          {/* ROW 3: Date & Location */}
          <div className="form-row">
            <div className="form-group">
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
               <label htmlFor="budget">Estimated Budget (Optional)</label>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Send Inquiry
          </button>
        </form>
      </div>

      {/* 2. THE FOOTER ZONE */}
      <footer className="footer-zone">
        <div className="footer-bg-text">DANY</div>

        <div className="footer-content">
          
          <div className="footer-left">
            <p>© {new Date().getFullYear()} DANY MAJEED.</p>
          </div>

          {/* CENTER: BACK TO TOP BUTTON */}
          <button onClick={scrollToTop} className="back-to-top" aria-label="Scroll to top">
            ↑
          </button>

          <div className="footer-right">
            <a href="#home">Home</a>
            <a href="#showcase">Showcase</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            
            <a 
              href="https://instagram.com/danymajeed" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ig-link"
            >
              Instagram ↗
            </a>
          </div>

        </div>
      </footer>
    </section>
  );
};

export default ContactFooter;