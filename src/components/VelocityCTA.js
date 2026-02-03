// src/components/VelocityCTA.js
import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { PopupModal } from "react-calendly";

function wrap(min, max, v) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

function ParallaxText({ children, baseVelocity, velocityFactor }) {
  const baseX = useMotionValue(0);

  // Wrap % to create endless loop
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    // base movement per frame
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Scroll direction influences direction
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;

    // Scroll speed influences move amount
    moveBy += directionFactor.current * moveBy * vf;

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax-text">
      <motion.div className="scroller" style={{ x }}>
        {/* fewer repeats = less DOM, still seamless */}
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

const VelocityCTA = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ ONE scroll signal shared across all rows (this is the optimization)
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Map scroll velocity -> factor
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  return (
    <section className="velocity-cta-section">
      {/* BACKGROUND TEXT (scroll-reactive again) */}
      <div className="velocity-angled-wrapper" aria-hidden="true">
        {/* ✅ Only 4 rows (huge perf win vs your old 10+) */}
   <ParallaxText baseVelocity={-1.25} velocityFactor={velocityFactor}>
  CREATE LEGACY — BUILD VALUE —
</ParallaxText>

<ParallaxText baseVelocity={1.05} velocityFactor={velocityFactor}>
  CAPTURE MOMENTS — DEFINE STYLE —
</ParallaxText>

<ParallaxText baseVelocity={-1.55} velocityFactor={velocityFactor}>
  VISUAL EXCELLENCE — TIMELESS —
</ParallaxText>

<ParallaxText baseVelocity={1.30} velocityFactor={velocityFactor}>
  STORY DRIVEN — DETAIL OBSESSED —
</ParallaxText>

<ParallaxText baseVelocity={-1.10} velocityFactor={velocityFactor}>
  LUXURY VISUALS — MODERN EDGE —
</ParallaxText>

<ParallaxText baseVelocity={1.20} velocityFactor={velocityFactor}>
  WEDDINGS — REAL ESTATE — PORTRAITS —
</ParallaxText>

      </div>

      {/* FOREGROUND BOX */}
      <div className="cta-interaction-box">
        <div className="cta-content">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            Ready to <br />
            <span className="hollow-text-white">Stand Out?</span>
          </motion.h2>

          <p>Secure your date. Elevate your brand.</p>

          <motion.button
            className="velocity-book-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
          >
            Book Now
          </motion.button>
        </div>
        <div className="box-gloss"></div>
      </div>

      <PopupModal
        url="https://calendly.com/danymajeed/essential-re"
        onModalClose={() => setIsOpen(false)}
        open={isOpen}
        rootElement={document.getElementById("root")}
      />
    </section>
  );
};

export default VelocityCTA;
