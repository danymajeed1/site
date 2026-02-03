// src/components/WaveHero.js
import React, { useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion'; // Import for animation

const WaveHero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let lines = [];
    const gap = 40; 
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      lines = [];
      for (let y = 100; y < height - 100; y += gap) {
        lines.push({
          y: y,
          amplitude: 20 + Math.random() * 20,
          speed: 0.002 + Math.random() * 0.004,
          offset: Math.random() * Math.PI * 2,
          color: 'rgba(255, 255, 255, 0.12)' // Slightly more transparent for image blend
        });
      }
    };

    const animate = (t) => {
      ctx.clearRect(0, 0, width, height);
      lines.forEach(line => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x += 10) {
          const dx = x - mouse.x;
          const dy = line.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const interaction = Math.max(0, (300 - dist) / 300);
          const y = line.y + 
                    Math.sin(x * 0.005 + t * line.speed + line.offset) * line.amplitude + 
                    (Math.sin(x * 0.05) * 50 * interaction);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="wave-hero">
      {/* 1. THE MEDIA LAYER (Behind the waves) */}
      <div className="hero-media-layer">
        {/* Replace this with your best shot - maybe a wide landscape or cinematic room */}
        <img src="/photo1.jpg" alt="Cinematic Background" />
        <div className="hero-overlay-gradient"></div>
      </div>

      {/* 2. THE CODE LAYER (The Waves) */}
      <canvas ref={canvasRef} className="wave-canvas" />

      {/* 3. THE TEXT LAYER (Animated) */}
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="hero-kicker-small">Dany Majeed Productions</p>
          <h1 className="hero-title-large">
            Visuals that <span className="highlight-word">Move.</span>
          </h1>
          <p className="hero-subtitle">
            Cinematic Photography & Virtual Staging.
          </p>
          <div className="hero-actions">
             <HashLink smooth to="#portfolio" className="btn-hero-primary">
                View Work
             </HashLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WaveHero;