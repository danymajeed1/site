// src/components/ServicesSection.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// --- FIXED IMAGE IMPORTS ---
// This guarantees the images load correctly regardless of folder structure
import weddingImg from '../assets/images/wedding2.webp';
import realEstateImg from '../assets/images/realestate-cover.jpg';
import portraitImg from '../assets/images/portrait.jpg';
import eventsImg from '../assets/images/events.jpg';

const services = [
  { 
    id: 'weddings', 
    title: 'Luxury Weddings', 
    subtitle: 'Timeless Romance',
    img: weddingImg,
    link: '/services',
    area: 'wed' // Custom Grid Area Name
  },
  { 
    id: 'portraits', 
    title: 'Editorial Portraits', 
    subtitle: 'Personal Branding',
    img: portraitImg,
    link: '/services',
    area: 'por' // Vertical Area
  },
  { 
    id: 'realestate', 
    title: 'Real Estate', 
    subtitle: 'Architectural Precision',
    img: realEstateImg,
    link: '/services',
    area: 'res' // Horizontal Area
  },
  { 
    id: 'events', 
    title: 'Corporate Events', 
    subtitle: 'Dynamic Coverage',
    img: eventsImg,
    link: '/services',
    area: 'eve' // Horizontal Area
  }
];

// Stagger Animation
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

const ServicesSection = () => {
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
            <Link to={service.link} className="service-link-wrapper">
              
              <div className="service-img-wrapper">
                <img src={service.img} alt={service.title} />
              </div>

              <div className="service-overlay"></div>

              <div className="service-content">
                <span className="service-subtitle">{service.subtitle}</span>
                <h3 className="service-title">{service.title}</h3>
                
                <div className="service-action">
                  <span>Explore</span>
                  <div className="arrow-icon">→</div>
                </div>
              </div>

              <div className="service-border"></div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesSection;