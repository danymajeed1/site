// src/components/ShowreelMontage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./ShowreelMontage.css";

export default function ShowreelMontage() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // “chapters” (adjust times to match your montage)
  const chapters = useMemo(
    () => [
      { label: "Weddings", t: 0 },
      { label: "Real Estate", t: 6 },
      { label: "Food", t: 12 },
      { label: "Automotive", t: 18 },
      { label: "Commercial", t: 24 },
    ],
    []
  );

  // Pause video when offscreen (big performance win on mobile)
  useEffect(() => {
    const el = wrapRef.current;
    const v = videoRef.current;
    if (!el || !v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!v) return;
        if (entry.isIntersecting) {
          // don’t force play if user paused
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Premium “bio-card style” hover hotspot WITHOUT blocking video
  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${px.toFixed(2)}%`);
    el.style.setProperty("--my", `${py.toFixed(2)}%`);
  };

  const onLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `50%`);
  };

  const jumpTo = (t) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = t;
    v.play().catch(() => {});
  };

  return (
    <section className="showreel" id="showreel">
      <div className="showreel__inner">
        <div className="showreel__copy">
          <p className="showreel__kicker">Video</p>
          <h2 className="showreel__title">
            A montage that <span className="showreel__hollow">moves.</span>
          </h2>
          <p className="showreel__sub">
            Short-form storytelling designed for Instagram, brands, and real moments.
            Tap a chapter to jump through the reel.
          </p>

          <div className="showreel__chips" role="tablist" aria-label="Showreel chapters">
            {chapters.map((c) => (
              <button
                key={c.label}
                type="button"
                className="showreel__chip"
                onClick={() => jumpTo(c.t)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="showreel__actions">
            <a className="showreel__btn showreel__btnGhost" href="#contact">
              Book / Inquire <span className="showreel__btnIcon">→</span>
            </a>
          </div>
        </div>

        {/* PORTAL */}
        <motion.div
          className={`showreel__portal ${isReady ? "is-ready" : ""}`}
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          initial={{ opacity: 0, y: 16, rotate: -0.6 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="showreel__frame" aria-hidden="true" />
          <div className="showreel__vignette" aria-hidden="true" />
          <div className="showreel__glow" aria-hidden="true" />

          <video
            ref={videoRef}
            className="showreel__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/chef-reel-poster.jpg"
            onCanPlay={() => setIsReady(true)}
          >
            {/* ✅ same file you used in CreativePartners */}
            <source src="/chef-reel-optimized.mp4" type="video/mp4" />
          </video>

          <div className="showreel__badge">
            <span className="showreel__dot" />
            SHOWREEL
          </div>

          {!isReady && <div className="showreel__loading">Loading…</div>}
        </motion.div>
      </div>
    </section>
  );
}
