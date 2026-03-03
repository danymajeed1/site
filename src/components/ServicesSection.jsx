// src/components/ServicesSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
    portfolioLink: '/portfolio', // Takes them to your pictures
    servicesLink: '/services',   // Takes them to your pricing
    area: 'wed' 
  },
  { 
    id: 'portraits', 
    title: 'Editorial Portraits', 
    subtitle: 'Personal Branding',
    img: portraitImg,
    portfolioLink: '/portfolio',
    servicesLink: '/services',
    area: 'por' 
  },
  { 
    id: 'realestate', 
    title: 'Real Estate', 
    subtitle: 'Architectural Precision',
    img: realEstateImg,
    portfolioLink: '/portfolio',
    servicesLink: '/services',
    area: 'res' 
  },
  { 
    id: 'events', 
    title: 'Corporate Events', 
    subtitle: 'Dynamic Coverage',
    img: eventsImg,
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
            {/* Switched from a global <Link> to a structural <div> */}
            <div className="service-card-inner">
              
              <div className="service-img-wrapper">
                <img src={service.img} alt={service.title} />
              </div>

              <div className="service-overlay"></div>

              <div className="service-content">
                <span className="service-subtitle">{service.subtitle}</span>
                <h3 className="service-title">{service.title}</h3>
                
                {/* DUAL BUTTON LAYOUT */}
                <div className="service-dual-actions">
                  <Link to={service.portfolioLink} className="btn-showcase">Showcase</Link>
                  <Link to={service.servicesLink} className="btn-book">Book Now</Link>
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