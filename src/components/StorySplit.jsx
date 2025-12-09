// src/components/StorySplit.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const storyImages = ['/story1.jpg', '/story2.jpg', '/story3.jpg', '/story4.jpg'];

function StorySplit() {
  const [activeIndex, setActiveIndex] = useState(0);

  // simple auto-rotate slideshow
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % storyImages.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="story-split">
      <div className="story-split-inner">
        {/* LEFT: TEXT / STORY */}
        <motion.div
          className="story-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className="story-kicker">About the studio</p>
          <h2>Every frame is a decision.</h2>
          <p>
            I&apos;m a one-person studio focused on real estate, weddings, events, and
            visual storytelling. That means you get my full attention—from planning,
            to shooting, to the final color grade.
          </p>
          <p>
            Whether it&apos;s a home that needs to feel warm and inviting, or a
            couple&apos;s day that deserves to feel like a movie, I combine technical
            precision with a filmmaker&apos;s eye.
          </p>
          <div className="story-highlights">
            <div>
              <span className="label">Services</span>
              <p>Photo • Video • Editing • Virtual Staging</p>
            </div>
            <div>
              <span className="label">Based in</span>
              <p>Customize this with your city</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: SLIDESHOW / COLLAGE */}
        <motion.div
          className="story-visual"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="story-frame">
            {storyImages.map((src, idx) => (
              <div
                key={idx}
                className={`story-frame-layer ${
                  idx === activeIndex ? 'active' : ''
                }`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
          <div className="story-dots">
            {storyImages.map((_, idx) => (
              <button
                key={idx}
                className={idx === activeIndex ? 'dot active' : 'dot'}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show image ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default StorySplit;

