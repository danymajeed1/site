// src/components/ServicesSection.jsx
import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';


// NO MORE IMAGE IMPORTS HERE! 🎉

const services = [
  { 
    id: 'weddings', 
    title: 'Luxury Weddings', 
    subtitle: 'Timeless Romance',
    img: 'wedding/1.webp', // <--- Now pointing directly to the public folder
    portfolioLink: '/portfolio', 
    servicesLink: '/services',   
    area: 'wed' 
  },
  { 
    id: 'portraits', 
    title: 'Editorial Portraits', 
    subtitle: 'Personal Branding',
    img: 'portraits/1.webp',
    portfolioLink: '/portfolio',
    servicesLink: '/services',
    area: 'por' 
  },
  { 
    id: 'realestate', 
    title: 'Real Estate', 
    subtitle: 'Architectural Precision',
    img: 'realestate/11.webp',
    portfolioLink: '/portfolio',
    servicesLink: '/services',
    area: 'res' 
  },
  { 
    id: 'events', 
    title: 'Corporate Events', 
    subtitle: 'Dynamic Coverage',
    img: 'event/3.webp',
    portfolioLink: '/portfolio',
    servicesLink: '/services',
    area: 'eve' 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const tileVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function ServicesSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // The Global Shutter Function (with Ninja Scroll)
  const shutterTo = useCallback((to) => {
    if (to === path) return;
    document.body.classList.add("shutter-on");
    
    window.setTimeout(() => {
      navigate(to);
      window.scrollTo(0, 0); // Snaps to top in the dark
      
      window.setTimeout(() => {
        document.body.classList.remove("shutter-on");
      }, 60);
    }, 380); 
  }, [navigate, path]);

  return (
    <section className="services-section" id="services">
      <div className="services-header">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Curated <span className="hollow-text">Services.</span>
        </motion.h2>
      </div>

      <motion.div 
        className="services-grid-mosaic"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {services.map((service) => (
          <motion.div 
            key={service.id} 
            className={`service-card-new area-${service.area}`}
            variants={tileVariants}
          >
            <div className="service-card-inner">
              
              <div className="service-img-wrapper">
                <img src={service.img} alt={service.title} />
              </div>

              <div className="service-overlay"></div>

              <div className="service-content">
                <span className="service-subtitle">{service.subtitle}</span>
                <h3 className="service-title">{service.title}</h3>
                
                {/* DUAL BUTTON LAYOUT (Using shutterTo) */}
                <div className="service-dual-actions">
                  <button onClick={() => shutterTo(service.portfolioLink)} className="btn-showcase">Showcase</button>
                  <button onClick={() => shutterTo(service.servicesLink)} className="btn-book">Book Now</button>
                </div>
              </div>

              <div className="service-border"></div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}