// src/components/ShowreelPortal.jsx
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ShowreelPortal.css";

export default function ShowreelPortal() {
  const [open, setOpen] = useState(false);
  const [shutter, setShutter] = useState(false);
  const videoRef = useRef(null);

  const openReel = () => {
    setShutter(true);
    window.setTimeout(() => setOpen(true), 260);
    window.setTimeout(() => setShutter(false), 720);
  };

  const closeReel = () => {
    setOpen(false);
    // pause to save CPU on mobile
    window.setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, 60);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeReel();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="reel" id="reel">
      <div className="reel__inner">
        {/* LEFT COPY */}
        <div className="reel__copy">
          <motion.p
            className="reel__kicker"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            Videography
          </motion.p>

          <motion.h2
            className="reel__title"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
          >
            A portal into motion.
          </motion.h2>

          <motion.p
            className="reel__sub"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Photo is your first impression — video is the feeling. Tap to open the reel with a clean shutter transition.
          </motion.p>

          <div className="reel__actions">
            <button className="reel__btn reel__btnPrimary" onClick={openReel} type="button">
              Watch Showreel <span className="reel__icon">▶</span>
            </button>
            <a className="reel__btn reel__btnGhost" href="#contact">
              Book / Inquire <span className="reel__icon">→</span>
            </a>
          </div>
        </div>

        {/* RIGHT TILE */}
        <motion.button
          type="button"
          className="reel__tile"
          onClick={openReel}
          initial={{ opacity: 0, y: 18, rotate: -0.8 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* poster image (use your existing file) */}
          <img className="reel__poster" src="/chef-reel-poster.jpg" alt="Showreel poster" loading="lazy" />

          {/* overlays */}
          <div className="reel__grid" aria-hidden="true" />
          <div className="reel__vignette" aria-hidden="true" />
          <div className="reel__ring" aria-hidden="true" />

          <div className="reel__tileLabel">
            <span className="reel__dot" />
            SHOWREEL
            <span className="reel__tileHint">Click to open</span>
          </div>
        </motion.button>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="reelModal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={closeReel}
          >
            <motion.div
              className="reelModal__panel"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <button className="reelModal__close" onClick={closeReel} aria-label="Close showreel" type="button">
                ×
              </button>

              <div className="reelModal__videoWrap">
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  poster="/chef-reel-poster.jpg"
                >
                  {/* Use the file you already have */}
                  <source src="/chef-reel-optimized.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHUTTER overlay */}
      <AnimatePresence>
        {shutter && (
          <motion.div className="reelShutter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              className="reelShutter__top"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="reelShutter__bot"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="reelShutter__flash"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.28, 0] }}
              transition={{ duration: 0.42 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
