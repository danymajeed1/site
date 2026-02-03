import React, { useMemo, useRef, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./CinematicHero.css";

// Images
import weddingImg from "../assets/images/wedding2.webp";
import realEstateImg from "../assets/images/realestate-cover.jpg";
import portraitImg from "../assets/images/portrait.jpg";
import eventsImg from "../assets/images/events.jpg";

// --- THE "LIVING LIQUID" ENGINE ---
const LiquidBackground = () => (
  <div className="liquid-stage" aria-hidden="true">
    
    {/* 1. The SVG Filter that creates the "Goo/Liquid" effect */}
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter id="liquid-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>

    {/* 2. The Living Orbs (They will merge and detach autonomously) */}
    <div className="liquid-container">
      <div className="l-orb orb-1" />
      <div className="l-orb orb-2" />
      <div className="l-orb orb-3" />
      <div className="l-orb orb-4" />
      <div className="l-orb orb-5" />
    </div>

    {/* 3. The "Squiggly" Data Lines (Drawing autonomously) */}
    <svg className="squiggle-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
       <path className="sq-path p1" d="M-100,500 C200,300 400,800 1100,500" />
       <path className="sq-path p2" d="M-100,200 C300,400 600,100 1100,300" />
       <path className="sq-path p3" d="M200,-100 C100,300 500,600 400,1100" />
    </svg>

    {/* 4. Texture overlay */}
    <div className="liquid-noise" />
  </div>
);

export default function CinematicHero() {
  const navigate = useNavigate();

  const shots = useMemo(
    () => [
      { id: "weddings", label: "Weddings", title: "Cinematic Stories.", sub: "Editorial emotion. Film-inspired color.", img: weddingImg },
      { id: "realestate", label: "Real Estate", title: "Architectural Precision.", sub: "HDR balance. Detail that sells.", img: realEstateImg },
      { id: "portraits", label: "Portraits", title: "Modern Design.", sub: "Personal branding with direction.", img: portraitImg },
      { id: "events", label: "Events", title: "Clean Coverage.", sub: "Dynamic moments captured consistently.", img: eventsImg },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [shutter, setShutter] = useState(false);

  // --- PARALLAX LOGIC ---
  const heroRef = useRef(null);
  const rafRef = useRef(0);
  const pending = useRef({ hx: 0, hy: 0 });

  const commit = () => {
    rafRef.current = 0;
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--hx", String(pending.current.hx));
    el.style.setProperty("--hy", String(pending.current.hy));
  };

  const onHeroMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const hx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const hy = ((e.clientY - r.top) / r.height - 0.5) * 2;
    pending.current.hx = Math.max(-1, Math.min(1, hx)).toFixed(3);
    pending.current.hy = Math.max(-1, Math.min(1, hy)).toFixed(3);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(commit);
  };

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const onShowcase = () => {
    setShutter(true);
    window.setTimeout(() => navigate("/portfolio"), 550);
  };

  return (
    <section ref={heroRef} className="hero9" onMouseMove={onHeroMove}>
      
      {/* 1. FLUID BACKGROUND */}
      <LiquidBackground />

      <motion.div
        className="hero9__frame"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* 2. THE 3D POSTER (SPLASH REVEAL) */}
        <div className="hero9__posterWrap">
          <Tilt
            tiltEnable={true}
            trackOnWindow={false}
            tiltMaxAngleX={4} // Very subtle, heavy glass feel
            tiltMaxAngleY={4}
            perspective={1200}
            scale={1.0}
            transitionSpeed={2500}
            gyroscope={false}
            className="hero9__tiltWrap"
          >
            <div className="hero9__poster">
              
              {/* LAYER 1: CINEMATIC BASE (Desaturated but warm) */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={`base-${shots[active].id}`}
                  src={shots[active].img}
                  alt={shots[active].label}
                  className="hero9__img base-layer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              </AnimatePresence>

              {/* LAYER 2: SPLASH COLOR (Reveals radially from center) */}
              <div className="hero9__splashMask">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`splash-${shots[active].id}`}
                    src={shots[active].img}
                    alt=""
                    className="hero9__img vivid-layer"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                </AnimatePresence>
              </div>

              {/* OVERLAYS */}
              <div className="hero9__vignette" aria-hidden="true" />
              <div className="hero9__scanlines" aria-hidden="true" />

              {/* TAG */}
              <div className="hero9__tag">
                <span className="h-tag-line" />
                {shots[active].label}
              </div>
            </div>
          </Tilt>

          {/* 3D FLOATING SHADOW (Detached) */}
          <div className="hero9__floatShadow" />
        </div>

        {/* 3. COPY & CONTROLS */}
        <div className="hero9__copy">
          
          <motion.div
            className="hero9__kicker"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            DANY MAJEED <span className="k-slash">{"//"}</span> PRODUCTIONS
          </motion.div>

          <div className="hero9__textMask">
            <AnimatePresence mode="wait">
              <motion.h1
                key={shots[active].title}
                className="hero9__title"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {shots[active].title}
              </motion.h1>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={shots[active].sub}
              className="hero9__sub"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {shots[active].sub}
            </motion.p>
          </AnimatePresence>

          <div className="hero9__actions">
            <button className="hero9__btn hero9__btnPrimary" onClick={onShowcase}>
              Showcase
            </button>
            <a className="hero9__btn hero9__btnGhost" href="#contact">
              Inquire
            </a>
          </div>

          {/* 4. PROFESSIONAL THUMBNAILS */}
          <div className="hero9__sheet" aria-label="Select hero category">
            {shots.map((s, i) => (
              <button
                key={s.id}
                className={`hero9__thumb ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
                type="button"
              >
                {/* Thumb Image & Glare */}
                <div className="thumb-frame">
                   <img src={s.img} alt="" />
                   <div className="thumb-glare" />
                </div>
                
                {/* Thumb Meta */}
                <div className="thumb-meta">
                   <span className="thumb-num">0{i+1}</span>
                   <span className="thumb-label">{s.label}</span>
                </div>
                
                {/* The "Living" Progress Line */}
                <div className="thumb-progress">
                   <div className="tp-fill" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SHUTTER TRANSITION */}
      <AnimatePresence>
        {shutter && (
          <motion.div className="hero9__shutter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <motion.div className="s-circle" initial={{ scale: 0 }} animate={{ scale: 3 }} transition={{ duration: 0.6, ease: "circIn" }} />
             <motion.div className="s-flash" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 0.4, duration: 0.3 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}