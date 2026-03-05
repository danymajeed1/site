// src/pages/ServicesPage.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import FlowBackground from '../components/FlowBackground';
import { PopupModal } from "react-calendly";
import { HashLink } from 'react-router-hash-link'; // Needed for scrolling to contact

// --- DATA ---
// src/pages/ServicesPage.js

const categories = [
  { id: 'portrait', label: 'Portraits' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'realestate', label: 'Real Estate' },
  { id: 'events', label: 'Events' }
];

const serviceData = {
  portrait: [
    { 
      title: 'Signature', 
      price: '$300', 
      desc: 'High-end editorial look for individuals and brands.', 
      features: ['60 Minute Session', 'Studio Lighting Setup', 'Unlimited Captures', 'Professional Retouching'], 
      recommended: false, 
      calendlyLink: "https://calendly.com/danymajeed/booking" 
    },
    { 
      title: 'Editorial', 
      price: '$500', 
      desc: 'Deep-dive creative production with maximum variety.', 
      features: ['Up to 2 Hours', 'Multiple Lighting Styles', 'Unlimited Outfits', 'Advanced Art Retouching', 'Priority Delivery'], 
      recommended: true, 
      calendlyLink: "https://calendly.com/danymajeed/booking" 
    },
    { 
      title: 'Legacy', 
      price: 'Custom', 
      desc: 'Full-day commercial or high-fashion campaigns.', 
      features: ['Full Day Production', 'Location Scouting', 'Commercial Licensing', 'Multi-Asset Delivery'], 
      recommended: false, 
      calendlyLink: "" // Request Consultation
    }
  ],
  realestate: [
    { 
      title: 'Professional', 
      price: '$300', 
      desc: 'Perfect for high-end residential listings.', 
      features: ['Up to 2,500 Sq Ft', 'AEB Bracketed HDR', 'Drone Photography Included', '24hr-48hr Turnaround'], 
      recommended: false, 
      calendlyLink: "https://calendly.com/danymajeed/booking" 
    },
    { 
      title: 'Cinematic', 
      price: '$500', 
      desc: 'The complete luxury marketing package.', 
      features: ['Up to 4,000 Sq Ft', 'Cinematic Walkthrough Video', 'Drone Video Coverage', 'Twilight Enhancement', 'Interactive Floorplan'], 
      recommended: true, 
      calendlyLink: "https://calendly.com/danymajeed/booking" 
    },
    { 
      title: 'Developer', 
      price: 'Custom', 
      desc: 'Estates over 4,000 Sq Ft or commercial portfolios.', 
      features: ['Volume Pricing', 'Asset Management', 'Full Licensing', 'Dedicated Support'], 
      recommended: false, 
      calendlyLink: "" // Request Consultation
    }
  ],
  events: [
    { 
      title: 'Social', 
      price: '$350', 
      desc: 'Candid, high-energy coverage for private events.', 
      features: ['60 Minute Coverage', 'Unlimited Captures', 'Digital Gallery Delivery', '48hr Sneak Peeks'], 
      recommended: false, 
      calendlyLink: "https://calendly.com/danymajeed/booking" 
    },
    { 
      title: 'Gala / Corporate', 
      price: '$600', 
      desc: 'Comprehensive coverage for high-stakes events.', 
      features: ['Up to 2 Hours', 'Extended Highlight Gallery', 'Step & Repeat Ready', 'Social Media Teasers', 'Unlimited Usage Rights'], 
      recommended: true, 
      calendlyLink: "https://calendly.com/danymajeed/booking" 
    },
    { 
      title: 'Full Day', 
      price: 'Custom', 
      desc: 'Festivals, Conferences, or Multi-Day Summits.', 
      features: ['Multiple Days', 'Same-Day Highlights', 'Marketing Content Strategy'], 
      recommended: false, 
      calendlyLink: "" // Request Consultation
    }
  ],
  wedding: [
    { 
      title: 'Intimate', 
      price: '$500', 
      desc: 'Capturing the core essence of your ceremony.', 
      features: ['1-2 Hours Coverage', 'Signature Moment Focus', 'High-Res Digital Gallery', 'Print Release'], 
      recommended: false, 
      calendlyLink: "https://calendly.com/danymajeed/booking" 
    },
    { 
      title: 'Cinematic Story', 
      price: '$1,200', 
      desc: 'A hybrid experience of stills and motion highlights.', 
      features: ['4 Hours Coverage', 'Cinematic Highlight Film', 'Full Stills Gallery', 'Online Hosting'], 
      recommended: true, 
      calendlyLink: "" // Request Consultation
    },
    { 
      title: 'The Narrative', 
      price: 'Custom', 
      desc: 'Tailored full-day coverage for your legacy.', 
      features: ['Extended Hours', 'Luxury Printed Album', 'Fine Art Retouching', 'Custom Requests'], 
      recommended: false, 
      calendlyLink: "" // Request Consultation
    }
  ]
};

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('portrait');
  const [isCalendlyOpen, setCalendlyOpen] = useState(false);
  const [activeCalendlyUrl, setActiveCalendlyUrl] = useState("");

  const handleSelectPackage = (pkg) => {
    // If there is NO calendly link, scroll them down to the inquiry form!
    if (!pkg.calendlyLink) {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    // Otherwise, open Calendly to get paid instantly
    setActiveCalendlyUrl(pkg.calendlyLink);
    setCalendlyOpen(true);
  };

  return (
    <div className="services-page">
      <FlowBackground />

      <div className="services-hero">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Invest in <span className="hollow-text">Excellence.</span>
        </motion.h1>
        <p>Transparent pricing packages tailored to your vision.</p>
      </div>

      <div className="services-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`svc-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div layout className="pricing-grid">
        <AnimatePresence mode='wait'>
          {serviceData[activeTab].map((pkg, index) => (
            <Tilt 
              key={index} 
              tiltMaxAngleX={5} 
              tiltMaxAngleY={5} 
              scale={1.02} 
              transitionSpeed={2500}
              className={`tilt-card-wrapper ${pkg.recommended ? 'rec-wrapper' : ''}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`pricing-card ${pkg.recommended ? 'recommended' : ''}`}
              >
                {pkg.recommended && <div className="rec-badge">Most Popular</div>}
                <div className="card-header">
                  <h3>{pkg.title}</h3>
                  <div className="price">{pkg.price}</div>
                  <p className="desc">{pkg.desc}</p>
                </div>
                <ul className="features-list">
                  {pkg.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
                {/* Replace your current <button className="choose-btn"> with this: */}
<button 
  className="choose-btn"
  onClick={() => handleSelectPackage(pkg)}
>
  {/* Dynamic Button Text based on the link! */}
  {pkg.calendlyLink ? 'Book Session' : 'Request Consultation'}
</button>
                <div className="card-gloss"></div>
              </motion.div>
            </Tilt>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- NEW SECTION: THE CONSULTATION BREAKER --- */}
      <section className="consultation-breaker">
        {/* The White Background that expands */}
        <motion.div 
          className="breaker-bg"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Bezier for smooth "shutter" feel
        >
          <div className="breaker-content">
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4, duration: 0.6 }}
            >
              Don't fit in a box?
            </motion.h2>
            
            <motion.p
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 0.6, duration: 0.6 }}
            >
              Your project deserves a custom strategy. Let's discuss your specific needs before we shoot.
            </motion.p>
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.7 }}
            >
              <HashLink smooth to="#contact" className="breaker-btn">
                Start a Conversation →
              </HashLink>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CALENDLY POPUP */}
      <PopupModal
        url={activeCalendlyUrl} 
        onModalClose={() => setCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById("root")}
      />
    </div>
  );
};

export default ServicesPage;