// src/pages/ServicesPage.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import FlowBackground from '../components/FlowBackground';
import { PopupModal } from "react-calendly";
import { HashLink } from 'react-router-hash-link'; // Needed for scrolling to contact

// --- DATA ---
const serviceData = {
  realestate: [
    {
      title: 'Essential',
      price: '$250',
      desc: 'Perfect for standard MLS listings.',
      features: ['25+ HDR Photos', 'Blue Sky Replacement', '48hr Turnaround', 'Print & Web Size'],
      recommended: false,
      calendlyLink: "https://calendly.com/danymajeed/essential-re" 
    },
    {
      title: 'Cinematic',
      price: '$450',
      desc: 'For luxury listings that need emotion.',
      features: ['50+ Flambient Photos', '60sec Highlight Video', 'Drone Photography', 'Virtual Twilight'],
      recommended: true, 
      calendlyLink: "https://calendly.com/danymajeed/cinematic-re"
    },
    {
      title: 'Custom',
      price: 'Custom',
      desc: 'Multiple properties, Commercial, or Airbnb portfolios.',
      features: ['Volume Pricing', 'Consistent Branding', 'Dedicated Asset Manager', 'Flexible Scheduling', 'Commercial Licensing'],
      recommended: false,
      calendlyLink: "" 
    }
  ],
  wedding: [
    {
      title: 'Elopement',
      price: '$1,500',
      desc: 'Intimate coverage for small ceremonies.',
      features: ['4 Hours Coverage', 'Online Gallery', 'High-Res Downloads', 'Print Release'],
      recommended: false,
      calendlyLink: "https://calendly.com/danymajeed/wedding-elopement"
    },
    {
      title: 'Signature',
      price: '$3,200',
      desc: 'Full day story-driven coverage.',
      features: ['8 Hours Coverage', 'Second Shooter', 'Engagement Session', 'Leather Album', 'Drone Coverage'],
      recommended: true,
      calendlyLink: "https://calendly.com/danymajeed/wedding-signature"
    },
    {
      title: 'Legacy',
      price: '$5,000',
      desc: 'The complete visual experience.',
      features: ['All Day Coverage', 'Cinema Video (4k)', 'Rehearsal Dinner', 'Large Album + Prints', 'Raw Footage Option'],
      recommended: false,
      calendlyLink: "https://calendly.com/danymajeed/wedding-legacy"
    }
  ],
  portrait: [
    { title: 'Headshot', price: '$200', desc: 'Studio or Location.', features: ['30 Mins', '2 Retouched Images'], recommended: false, calendlyLink: "https://calendly.com/danymajeed/headshots" },
    { title: 'Editorial', price: '$500', desc: 'Creative branding session.', features: ['2 Hours', 'Multiple Outfits', '10 Retouched Images'], recommended: true, calendlyLink: "https://calendly.com/danymajeed/editorial" },
    { title: 'Campaign', price: 'Custom', desc: 'Full commercial production.', features: ['Half/Full Day', 'Team Coordination', 'License Usage'], recommended: false, calendlyLink: "" },
  ]
};

const categories = [
  { id: 'realestate', label: 'Real Estate' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'portrait', label: 'Portraits' }
];

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('realestate');
  const [isCalendlyOpen, setCalendlyOpen] = useState(false);
  const [activeCalendlyUrl, setActiveCalendlyUrl] = useState("");

  const handleSelectPackage = (pkg) => {
    if (pkg.price === 'Custom' || !pkg.calendlyLink) {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      return;
    }
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
                <button 
                  className="choose-btn"
                  onClick={() => handleSelectPackage(pkg)}
                >
                  {pkg.price === 'Custom' ? 'Contact Us' : 'Check Availability'}
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