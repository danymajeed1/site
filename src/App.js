import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* =======================
   Smooth scrolling helpers
   ======================= */

// easing
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// which keys count as scroll
const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
]);

const preventWheelTouch = (e) => {
  e.preventDefault();
};
const preventKey = (e) => {
  if (SCROLL_KEYS.has(e.key)) e.preventDefault();
};

const lockUserScroll = () => {
  document.addEventListener('wheel', preventWheelTouch, { passive: false });
  document.addEventListener('touchmove', preventWheelTouch, { passive: false });
  document.addEventListener('keydown', preventKey, { passive: false });
};

const unlockUserScroll = () => {
  document.removeEventListener('wheel', preventWheelTouch, { passive: false });
  document.removeEventListener('touchmove', preventWheelTouch, { passive: false });
  document.removeEventListener('keydown', preventKey, { passive: false });
};

// animate to exact Y, returns a Promise when done
const animateScrollTo = (targetTop, duration = 900, easing = easeInOutCubic) =>
  new Promise((resolve) => {
    const start = window.pageYOffset;
    const dist = targetTop - start;
    if (duration <= 0 || Math.abs(dist) < 1) {
      window.scrollTo(0, targetTop);
      resolve();
      return;
    }
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = easing(t);
      window.scrollTo(0, start + dist * eased);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });

// precise scroll to an element (accounts for fixed header)
const scrollToId = (id, { duration = 900 } = {}) => {
  const el = document.getElementById(id);
  if (!el) return Promise.resolve();
  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const elTop = el.getBoundingClientRect().top + window.pageYOffset;
  const targetTop = Math.max(0, elTop - headerHeight);
  return animateScrollTo(targetTop, duration);
};

/* =======================
   App Component
   ======================= */

function App() {
  // typing effect
  const [showArrow, setShowArrow] = useState(false);

useEffect(() => {
  const timeout = setTimeout(() => setShowArrow(true), 500);
  return () => clearTimeout(timeout);
}, []);


  // header + hero slide
  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(false);

  // snap state/refs
  const isAutoScrollingRef = useRef(false);
  const phaseRef = useRef('hero'); // 'hero' | 'animatingDown' | 'intro' | 'animatingUp'
  const touchStartYRef = useRef(0);

  // gallery images (placeholders)
  const galleryImages = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
    '/photo4.jpg',
    '/photo5.jpg',
    '/photo6.jpg',
  ];

  // framer variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
    }),
  };

  /* =======================
     Scroll snap: Hero <-> Intro
     ======================= */
  useEffect(() => {
    const downDuration = 900; // cinematic down
    const upDuration = 500; // snappier up
    const wheelTrigger = 8; // wheel delta threshold
    const swipeTrigger = 12; // touch swipe px
    const heroSlideStart = 0.2; // when hero starts sliding

    const getHeaderHeight = () =>
      document.querySelector('header')?.getBoundingClientRect().height ?? 0;

    const getIntroBounds = () => {
      const el = document.getElementById('intro');
      if (!el) return null;
      const headerH = getHeaderHeight();
      const top = el.offsetTop - headerH; // aligned top target
      const height = el.offsetHeight;
      const bottom = top + height;
      return { top, height, bottom, headerH };
    };

    const updateHeaderAndHero = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > 50);
      setHeroSlide(y > vh * heroSlideStart);
    };

    const goToIntro = async () => {
      if (isAutoScrollingRef.current) return;
      const b = getIntroBounds();
      if (!b) return;

      isAutoScrollingRef.current = true;
      phaseRef.current = 'animatingDown';

      lockUserScroll();
      await animateScrollTo(b.top, downDuration);
      unlockUserScroll();

      isAutoScrollingRef.current = false;
      phaseRef.current = 'intro';
    };

    const goToHero = async () => {
      if (isAutoScrollingRef.current) return;

      isAutoScrollingRef.current = true;
      phaseRef.current = 'animatingUp';

      // speed up hero return visually
      document.documentElement.setAttribute('data-snap', 'up');
      setHeroSlide(false);
      setScrolled(false);

      lockUserScroll();
      await animateScrollTo(0, upDuration);
      unlockUserScroll();

      document.documentElement.removeAttribute('data-snap');
      isAutoScrollingRef.current = false;
      phaseRef.current = 'hero';
    };

    // WHEEL: only intercept in the hero/intro neighborhood
    const onWheel = (e) => {
      if (isAutoScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const y = window.scrollY;
      const vh = window.innerHeight;
      const b = getIntroBounds();
      if (!b) return;

      const beforeIntroTop = y < b.top - 0.1 * vh; // clearly above intro
      const nearIntroTopUp = y >= b.top && y <= b.top + b.height * 0.35; // top slice of intro

      // DOWN: from hero → to intro
      if (e.deltaY > wheelTrigger && beforeIntroTop) {
        e.preventDefault();
        goToIntro();
        return;
      }

      // UP: near top of intro → back to hero
      if (e.deltaY < -wheelTrigger && nearIntroTopUp) {
        e.preventDefault();
        goToHero();
        return;
      }

      // Else: let native scroll happen
    };

    // TOUCH: same idea for swipes
    const onTouchStart = (e) => {
      if (e.touches && e.touches.length)
        touchStartYRef.current = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (isAutoScrollingRef.current) {
        e.preventDefault();
        return;
      }

      const curY = e.touches[0].clientY;
      const dy = curY - touchStartYRef.current; // positive = swipe down

      const y = window.scrollY;
      const vh = window.innerHeight;
      const b = getIntroBounds();
      if (!b) return;

      const beforeIntroTop = y < b.top - 0.1 * vh;
      const nearIntroTopUp = y >= b.top && y <= b.top + b.height * 0.35;

      if (-dy > swipeTrigger && beforeIntroTop) {
        e.preventDefault();
        goToIntro();
        return;
      }
      if (dy > swipeTrigger && nearIntroTopUp) {
        e.preventDefault();
        goToHero();
        return;
      }
    };

    const onScroll = () => {
      if (!isAutoScrollingRef.current) updateHeaderAndHero();
    };

    // init + listeners
    updateHeaderAndHero();
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel, { passive: false });
      window.removeEventListener('touchstart', onTouchStart, { passive: true });
      window.removeEventListener('touchmove', onTouchMove, { passive: false });
      window.removeEventListener('scroll', onScroll, { passive: true });
    };
  }, []);

  /* =======================
     Render
     ======================= */
  return (
    <div className="App">
      {/* HEADER */}
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="logo-wrapper">
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Logo"
            className="logo"
          />
          <nav>
            <a href="#portfolio">Portfolio</a>
            <a href="#about">About</a>
            <a href="#home" className="home-link">
              Home
            </a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

{/* HERO */}
<section
  id="home"
  className={`hero ${heroSlide ? 'slide-up' : ''}`}
  style={{
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.10) 100%), url(${process.env.PUBLIC_URL}/bg.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="hero-inner">
    <div className="hero-badge hero-stack">
      <div className="hero-line vision">Your Vision.</div>

      <div className="hero-line timeless">
        <span className="typewriter" style={{ '--n': 10, '--type-dur': '2.1s' }}>
          Timelessly
        </span>
      </div>

      <div className="hero-line framed">Framed.</div>
    </div>
  </div>

  {showArrow && (
    <div
      className="scroll-arrow"
      onClick={() => {
        lockUserScroll();
        scrollToId('intro', { duration: 900 }).finally(() => {
          unlockUserScroll();
          if (phaseRef.current !== 'intro') phaseRef.current = 'intro';
        });
      }}
    >
      <div className="arrow-track">
        <div className="arrow-line-mask">
          <div className="arrow-line"></div>
        </div>
      </div>
      <div className="arrow-head-animate"></div>
    </div>
  )}
</section>




      {/* BRIDGE / INTRO */}
      <section id="intro" className="intro-bridge">
        <div className="intro-inner">
          {/* Left column: headline + text + CTAs */}
          <div className="intro-text">
            <h2>Story‑Driven Photography</h2>
            <p>
              Weddings and real estate are my specialty—crafted lighting, editorial
              composition, and post‑production you can feel. Explore services below
              or jump straight to the work.
            </p>

            <div className="intro-cta">
              <a className="btn" href="#services">
                Explore Services
              </a>
              <a className="btn btn-ghost" href="#gallery">
                View Gallery
              </a>
            </div>
          </div>

          {/* Right column: your photo + stats */}
          <div className="intro-side">
            <div className="intro-photo">
              <img src="/me.jpg" alt="Photographer Portrait" />
            </div>

            <div className="intro-stats">
              <div className="stat">
                <span className="num">100+</span>
                <span className="label">Events Captured</span>
              </div>
              <div className="stat">
                <span className="num">5</span>
                <span className="label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="num">5★</span>
                <span className="label">Client Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* subtle divider to services */}
        <svg
          className="intro-curve"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0,50 C300,90 1140,10 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </section>

{/* SERVICES — flagship wide + two rows of vertical tiles */}
<section id="services" className="services">
  <div className="services-grid">

    {/* 1) WEDDINGS — WIDE */}
    <motion.article
      className="service-tile wide weddings"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="tile-bg" aria-hidden="true" />
      <div className="tile-content">
        <h3>Weddings</h3>
        <p>Elegant, emotional storytelling for your most unforgettable day.</p>
        <div className="btn-row">
          <a className="btn" href="#contact">Book Wedding</a>
          <a className="btn btn-ghost" href="#portfolio">View Portfolio</a>
        </div>
      </div>
    </motion.article>

    {/* 2) REAL ESTATE — WIDE */}
    <motion.article
      className="service-tile wide realestate"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="tile-bg" aria-hidden="true" />
      <div className="tile-content">
        <h3>Real Estate</h3>
        <p>Vibrant, sharp imagery that showcases spaces and drives sales.</p>
        <div className="btn-row">
          <a className="btn" href="#contact">Book Real Estate</a>
          <a className="btn btn-ghost" href="#portfolio">View Portfolio</a>
        </div>
      </div>
    </motion.article>

    {/* ROW 3 — PORTRAITS | MATERNITY */}
    <motion.article
      className="service-tile portraits"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="tile-bg" aria-hidden="true" />
      <div className="tile-content">
        <h3>Portraits</h3>
        <p>Tasteful, personality‑forward portraits for brands and individuals.</p>
        <div className="btn-row">
          <a className="btn" href="#contact">Book Portraits</a>
          <a className="btn btn-ghost" href="#portfolio">View Portfolio</a>
        </div>
      </div>
    </motion.article>

    <motion.article
      className="service-tile maternity"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="tile-bg" aria-hidden="true" />
      <div className="tile-content">
        <h3>Maternity</h3>
        <p>Beautiful, emotive captures of your growing journey.</p>
        <div className="btn-row">
          <a className="btn" href="#contact">Book Maternity</a>
          <a className="btn btn-ghost" href="#portfolio">View Portfolio</a>
        </div>
      </div>
    </motion.article>

    {/* ROW 4 — EVENTS | COMMERCIAL */}
    <motion.article
      className="service-tile events"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="tile-bg" aria-hidden="true" />
      <div className="tile-content">
        <h3>Events</h3>
        <p>From corporate to private — coverage that feels alive.</p>
        <div className="btn-row">
          <a className="btn" href="#contact">Book Events</a>
          <a className="btn btn-ghost" href="#portfolio">View Portfolio</a>
        </div>
      </div>
    </motion.article>

    <motion.article
      className="service-tile commercial"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="tile-bg" aria-hidden="true" />
      <div className="tile-content">
        <h3>Commercial</h3>
        <p>Polished, professional imagery for brands and businesses.</p>
        <div className="btn-row">
          <a className="btn" href="#contact">Book Commercial</a>
          <a className="btn btn-ghost" href="#portfolio">View Portfolio</a>
        </div>
      </div>
    </motion.article>

  </div>
</section>


      {/* GALLERY */}
      <section id="gallery" className="gallery-section">
        <h2 className="gallery-title">Featured Work</h2>
        <div className="gallery-grid">
          {galleryImages.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Gallery ${i + 1}`}
              className="gallery-image"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <h3>About Me</h3>
        <p>
          This is where you write a little about who you are and your photography
          journey.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <h3>Contact</h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 Dany Majeed Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
