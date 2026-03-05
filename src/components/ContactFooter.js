// src/components/ContactFooter.js
import React, { useRef, useState } from 'react';

const ContactFooter = () => {
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(""); 
  const [status, setStatus] = useState(""); 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("Sending your vision...");
    const formData = new FormData(event.target);
    formData.append("access_key", "8766c67d-857d-4b42-91ff-a8d6b9e680d7"); //

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setStatus("Inquiry received. I'll be in touch shortly.");
        event.target.reset();
        setSelectedService("");
      } else {
        setStatus("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <section className="grand-finale" ref={containerRef} id="contact">
      <div className="contact-zone">
        <div className="contact-header">
          <span className="section-tag">Custom Projects</span>
          <h2>Have a unique vision? <br/>Let's discuss.</h2>
        </div>

        <form className="luxury-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <input type="text" placeholder=" " required id="name" name="name" />
              <label htmlFor="name">Your Name *</label>
            </div>
            <div className="form-group">
              <input type="email" placeholder=" " required id="email" name="email" />
              <label htmlFor="email">Email Address *</label>
            </div>
          </div>

          <div className="form-group">
            <input type="tel" placeholder=" " id="phone" name="phone" />
            <label htmlFor="phone">Phone Number</label>
          </div>
          
          <div className="form-group">
            {/* UPDATED DROPDOWN TO MATCH PACKAGES */}
            <select 
              id="service" 
              name="service_type"
              required 
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="" disabled hidden></option>
              <optgroup label="Portraits">
                <option value="portrait-editorial">Editorial Portrait</option>
                <option value="portrait-legacy">Legacy Session</option>
                <option value="portrait-custom">Custom Campaign</option>
              </optgroup>
              <optgroup label="Weddings">
                <option value="wedding-intimate">Intimate Wedding</option>
                <option value="wedding-cinematic">Cinematic Story</option>
                <option value="wedding-narrative">The Narrative (Full Day)</option>
              </optgroup>
              <optgroup label="Real Estate">
                <option value="re-professional">Professional Listing</option>
                <option value="re-cinematic">Cinematic Luxury</option>
                <option value="re-developer">Developer Portfolio</option>
              </optgroup>
              <optgroup label="Events">
                <option value="event-social">Social Event</option>
                <option value="event-corporate">Gala / Corporate</option>
                <option value="event-full-day">Full Day / Multi-Day</option>
              </optgroup>
              <option value="other">Other / Custom Vision</option>
            </select>
            <label htmlFor="service">Desired Service *</label>
            <div className="select-arrow">↓</div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <input 
                type="text" 
                placeholder=" " 
                name="event_date"
                onFocus={(e) => e.target.type = 'date'} 
                onBlur={(e) => e.target.type = 'text'}
                id="date" 
              />
              <label htmlFor="date">Target Date</label>
            </div>
            <div className="form-group">
              <input type="text" placeholder=" " id="location" name="location" />
              <label htmlFor="location">Location / Venue</label>
            </div>
          </div>

          {/* NEW: VISION & EXTRA NOTES BOX */}
          <div className="form-group">
            <textarea 
              placeholder=" " 
              id="vision" 
              name="project_vision" 
              rows="4"
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#fff', outline: 'none', paddingTop: '20px' }}
            ></textarea>
            <label htmlFor="vision">Tell me about your vision or specific needs...</label>
          </div>

          <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

          <button type="submit" className="submit-btn">
            Send Inquiry
          </button>

          {status && (
            <p style={{ marginTop: '15px', color: '#fff', textAlign: 'center', fontSize: '0.9rem' }}>
              {status}
            </p>
          )}
        </form>
      </div>

      <footer className="footer-zone">
        <div className="footer-bg-text">DANY</div>
        <div className="footer-content">
          <div className="footer-left"><p>© {new Date().getFullYear()} DANY MAJEED.</p></div>
          <button onClick={scrollToTop} className="back-to-top" aria-label="Scroll to top">↑</button>
          <div className="footer-right">
            <a href="#home">Home</a>
            <a href="#showcase">Showcase</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
            <a href="https://instagram.com/danymajeed" target="_blank" rel="noopener noreferrer" className="ig-link">Instagram ↗</a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactFooter;