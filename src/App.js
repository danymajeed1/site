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
import InstagramTrack from "./components/InstagramTrack";
import VelocityCTA      from "./components/VelocityCTA";
import ContactFooter    from "./components/ContactFooter";
import FlowBackground   from "./components/FlowBackground";
import FlowBand         from "./components/FlowBand";
import ServicesPage     from "./pages/ServicesPage";
import PortfolioPage    from "./pages/PortfolioPage";

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

function Home() {
  return (
    <>
      <CinematicHero />
      <FlowBand>
        <Section variant={slideLeft}><BioStats /></Section>
        <Section variant={floatUp}><TechVault /></Section>
        <Section variant={floatUp}><ImageReveal /></Section>
      </FlowBand>
      <Section variant={floatUp}><ServicesSection /></Section>
      <Section variant={floatUp}><CreativePartners /></Section>
      
      {/* 2. Insert the new Instagram section here! */}
      <Section variant={floatUp}><InstagramTrack /></Section>
      
      <Section variant={floatUp}><VelocityCTA /></Section>
    </>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  
  // Clean, native scroll tracking (Perfect for mobile)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <Header scrolled={scrolled} />
      <FlowBackground />
      {/* SmoothScroll removed! Native scrolling restored! */}
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/services"  element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact"   element={<div style={{ paddingTop: "200px", textAlign: "center" }}><h1>Contact</h1></div>} />
      </Routes>
      <ContactFooter />
    </div>
  );
}