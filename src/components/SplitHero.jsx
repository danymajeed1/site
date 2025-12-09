// src/components/SplitHero.jsx
import React from 'react';
import { motion } from 'framer-motion';

function SplitHero() {
  const leftBg = `${process.env.PUBLIC_URL}/hero-realestate.jpg`;
  const rightBg = `${process.env.PUBLIC_URL}/hero-wedding.jpg`;

  return (
    <section className="split-hero">
      <div className="split-hero-inner">
        {/* LEFT – REAL ESTATE / COMMERCIAL */}
        <motion.div
          className="split-panel left-panel"
          style={{
            backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.35)),
              url(${leftBg})
            `,
          }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <div className="panel-overlay" />
          <div className="panel-content">
            <p className="panel-kicker">Real Estate • Commercial</p>
            <h1 className="panel-title">
              Spaces that
              <span>sell themselves.</span>
            </h1>
            <p className="panel-text">
              Clean, sharp imagery and video for listings, Airbnbs, and brands.
              Thoughtful compositions, straight lines, and polished edits that
              feel premium without feeling fake.
            </p>
            <div className="panel-actions">
              <a href="#portfolio" className="btn">
                View Property Work
              </a>
              <a href="#contact" className="btn btn-ghost">
                Book a Shoot
              </a>
            </div>
            <div className="panel-tags">
              <span>HDR &amp; Flambient</span>
              <span>Drone-ready</span>
              <span>Virtual Staging</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT – WEDDINGS / STORIES */}
        <motion.div
          className="split-panel right-panel"
          style={{
            backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.35)),
              url(${rightBg})
            `,
          }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <div className="panel-overlay" />
          <div className="panel-content">
            <p className="panel-kicker">Weddings • Stories • Events</p>
            <h1 className="panel-title">
              Moments that
              <span>feel like cinema.</span>
            </h1>
            <p className="panel-text">
              Intimate weddings, portraits, and events captured with a cinematic
              eye. Real emotion, flattering light, and edits that stand the test
              of time.
            </p>
            <div className="panel-actions">
              <a href="#portfolio" className="btn">
                View Stories
              </a>
              <a href="#contact" className="btn btn-ghost">
                Check Availability
              </a>
            </div>
            <div className="panel-tags">
              <span>Story-driven</span>
              <span>Photo &amp; Video</span>
              <span>Solo Studio</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="split-hero-scroll-hint">
        <span>Scroll to see the story</span>
      </div>
    </section>
  );
}

export default SplitHero;
