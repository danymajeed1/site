// src/App.js
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css";

import Header from "./components/Header";
import CinematicHero from "./components/CinematicHero";
import ShowreelMontage from "./components/ShowreelMontage";
import BioStats from "./components/BioStats";
import ImageReveal from "./components/ImageReveal";
import TechVault from "./components/TechVault";
import CreativePartners from "./components/CreativePartners";
import ServicesSection from "./components/ServicesSection";
import VelocityCTA from "./components/VelocityCTA";
import ContactFooter from "./components/ContactFooter";

import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";

import FlowBackground from "./components/FlowBackground";
import FlowBand from "./components/FlowBand"; // keep if you’re using it

const slideLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const floatUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Section = ({ children, variant }) => (
  <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={variant}>
    {children}
  </motion.div>
);

const FLOW_BEHIND_HERO = false;

function Home() {
  const heroNode = <CinematicHero />;

  return (
    <>
      {/* HERO (no flow behind it) */}
      {FLOW_BEHIND_HERO ? <FlowBand>{heroNode}</FlowBand> : heroNode}

{/* SHOWREEL (Video) */}
<Section variant={floatUp}>
  <ShowreelMontage />
</Section>

      {/* ABOUT / TRUST + POST + TECH + VIDEO PROOF */}
      <FlowBand>
        <Section variant={slideLeft}>
          <BioStats />
        </Section>

        <ImageReveal />

        <TechVault />

        <Section variant={floatUp}>
          <CreativePartners />
        </Section>
      </FlowBand>

      {/* CONVERSION */}
      <Section variant={floatUp}>
        <ServicesSection />
      </Section>

      <Section variant={floatUp}>
        <VelocityCTA />
      </Section>
    </>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <Header scrolled={scrolled} />

      {/* Global flow background (your CSS/hero mask blocks it where needed) */}
      <FlowBackground />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<div style={{ paddingTop: "200px", textAlign: "center" }}><h1>Scroll Down</h1></div>} />
      </Routes>

      <ContactFooter />
    </div>
  );
}
