import React, { useMemo } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import "./PremiumHero.css";

const ease = [0.2, 0.8, 0.2, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.12 * i, duration: 0.8, ease },
  }),
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function PremiumHero() {
  // Floating particles for depth (lightweight, no canvas needed)
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.round(randomBetween(6, 16)),
      left: `${randomBetween(6, 94)}%`,
      top: `${randomBetween(8, 88)}%`,
      dur: randomBetween(6, 11),
      delay: randomBetween(0, 1.8),
      driftX: randomBetween(-18, 18),
      driftY: randomBetween(-22, 22),
      opacity: randomBetween(0.12, 0.35),
    }));
  }, []);

  return (
    <section className="premium-hero" id="top">
      <div className="premium-hero__grid" />
      <div className="premium-hero__orb premium-hero__orb--a" />
      <div className="premium-hero__orb premium-hero__orb--b" />
      <div className="premium-hero__orb premium-hero__orb--c" />

      {/* floating particles */}
      <div className="premium-hero__particles" aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="premium-hero__particle"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              opacity: p.opacity,
            }}
            initial={{ x: 0, y: 0 }}
            animate={{ x: p.driftX, y: p.driftY }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="premium-hero__inner">
        <motion.div
          className="premium-hero__badge"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={0}
        >
          <span className="premium-hero__badgeDot" />
          <span className="premium-hero__badgeText">
            Computer Science • React • UI Engineering
          </span>
        </motion.div>

        <motion.h1
          className="premium-hero__title"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={1}
        >
          Designing{" "}
          <span className="premium-hero__gradientText">premium</span>
          <br />
          interactive web experiences.
        </motion.h1>

        <motion.p
          className="premium-hero__subtitle"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={2}
        >
          Motion-first UI, clean architecture, and polished details — built with
          modern React.
        </motion.p>

        <motion.div
          className="premium-hero__ctaRow"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={3}
        >
          <motion.a
            className="premium-btn premium-btn--primary"
            href="#portfolio"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            View Work <span className="premium-btn__icon">→</span>
          </motion.a>

          <motion.a
            className="premium-btn premium-btn--ghost"
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact
          </motion.a>
        </motion.div>

        <motion.div
          className="premium-hero__cards"
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={4}
        >
          <Tilt
            className="premium-card"
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable
            glareMaxOpacity={0.18}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.01}
          >
            <div className="premium-card__k">Focus</div>
            <div className="premium-card__v">Front-end + UX</div>
            <div className="premium-card__p">
              Clean systems, strong typography, great interaction design.
            </div>
          </Tilt>

          <Tilt
            className="premium-card"
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable
            glareMaxOpacity={0.18}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.01}
          >
            <div className="premium-card__k">Style</div>
            <div className="premium-card__v">Motion-first UI</div>
            <div className="premium-card__p">
              Scroll reveals, micro-interactions, smooth transitions.
            </div>
          </Tilt>

          <Tilt
            className="premium-card"
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            glareEnable
            glareMaxOpacity={0.18}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.01}
          >
            <div className="premium-card__k">Build</div>
            <div className="premium-card__v">React architecture</div>
            <div className="premium-card__p">
              Reusable components, predictable state, scalable structure.
            </div>
          </Tilt>
        </motion.div>
      </div>

      <a className="premium-hero__scrollHint" href="#portfolio" aria-label="Scroll to portfolio">
        <span className="premium-hero__scrollLine" />
        <span className="premium-hero__scrollChevron" />
      </a>
    </section>
  );
}
