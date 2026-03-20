// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

import Header           from "./components/Header";
import CinematicHero    from "./components/CinematicHero";
import BioStats         from "./components/BioStats";
import TechVault        from "./components/TechVault";
import ImageReveal      from "./components/ImageReveal";
import ServicesSection  from "./components/ServicesSection";
import CreativePartners from "./components/CreativePartners";
import InstagramTrack   from "./components/InstagramTrack";
import VelocityCTA      from "./components/VelocityCTA";
import ContactFooter    from "./components/ContactFooter";
import FlowBackground   from "./components/FlowBackground";
import FlowBand         from "./components/FlowBand";
import ServicesPage     from "./pages/ServicesPage";
import PortfolioPage    from "./pages/PortfolioPage";
import ScrollToTop from "./components/ScrollToTop";
import SEO from "./components/SEO";

// --- ANIMATION VARIANTS ---
const slideLeft = {
  hidden:  { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};
const floatUp = {
  hidden:  { opacity: 0, y: 70 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const Section = ({ children, variant, amount = 0.08 }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount }}
    variants={variant}
  >
    {children}
  </motion.div>
);

// --- MAIN HOME COMPONENT ---
function Home() {
  return (
    <>
    <SEO 
        title="Dany Majeed Productions | Cinematic Photographer" 
        description="Premium cinematic photography and production exclusively serving Austin, TX. Specializing in luxury real estate, editorial portraits, and high-end weddings."
        url="https://danymajeed.com"
      />
      <CinematicHero />
      <FlowBand>
        <Section variant={slideLeft}><BioStats /></Section>
        <Section variant={floatUp}><TechVault /></Section>
        <Section variant={floatUp}><ImageReveal /></Section>
      </FlowBand>
      <Section variant={floatUp}><ServicesSection /></Section>
      <Section variant={floatUp}><CreativePartners /></Section>
      <Section variant={floatUp}><InstagramTrack /></Section>
      <Section variant={floatUp}><VelocityCTA /></Section>
    </>
  );
}

// --- NEW: DEDICATED CONTACT PAGE WRAPPER ---
// This acts as a spacer so the global ContactFooter is pushed down naturally,
// creating a beautiful standalone page experience.
function ContactPage() {
  return (
    <div style={{ minHeight: "40vh", background: "transparent" }}>
      {/* The empty space allows the FlowBackground to show through before the footer */}
    </div>
  );
}

// --- APP ROUTING & LAYOUT ---
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  
  // Clean, native scroll tracking optimized for performance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Header scrolled={scrolled} />
      <FlowBackground />
      
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/services"  element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        
        {/* FIX: Removed the ugly placeholder and attached the proper wrapper */}
        <Route path="/contact"   element={<ContactPage />} />
      </Routes>
      
      {/* The footer renders globally at the bottom of every route */}
      <ContactFooter />
    </div>
  );
}