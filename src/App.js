// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

// --- COMPONENTS ---
import Header from './components/Header';
import LensHero from './components/LensHero';
import BioStats from './components/BioStats';
import ImageReveal from './components/ImageReveal';
import ServicesSection from './components/ServicesSection';
import VelocityCTA from './components/VelocityCTA';
import ContactFooter from './components/ContactFooter'; // <--- The new combined footer
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage'; // <--- NEW IMPORT
import PartnersStrip from './components/PartnersStrip';
import CreativePartners from './components/CreativePartners';

// --- ANIMATION CONFIG ---
const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

/* const slideRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
};
*/
const floatUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// Wrapper for animations
const Section = ({ children, variant }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variant}
      style={{ overflow: 'visible' }} 
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header scrolled={scrolled} />

      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={
          <>
            <LensHero />
            
            <PartnersStrip />

            <Section variant={slideLeft}>
              <BioStats />
            </Section>

            
              <ImageReveal />
            

            <Section variant={floatUp}>
              <ServicesSection />
            </Section>

            <Section variant={floatUp}>
              <CreativePartners />
            </Section>

            <Section variant={floatUp}>
              <VelocityCTA />
            </Section>
          </>
        } />

        {/* SERVICES PAGE */}
        <Route path="/services" element={<ServicesPage />} />
        
        {/* PORTFOLIO PAGE (We will build this next!) */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        
        {/* CONTACT PAGE (Redirects to bottom for now) */}
        <Route path="/contact" element={<div style={{paddingTop: '200px', textAlign:'center'}}><h1>Scroll Down</h1></div>} />

      </Routes>

      {/* THE GRAND FINALE (Visible on all pages) */}
      <ContactFooter /> 

    </div>
  );
}

export default App;