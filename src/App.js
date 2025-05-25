import './App.css';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Your Vision, Perfectly Captured";
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.substring(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 40);
    setTimeout(() => setShowArrow(true), 500);
    return () => clearInterval(typing);
  }, []);

  const [scrolled, setScrolled] = useState(false);
  const [heroSlide, setHeroSlide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setHeroSlide(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryImages = [
    '/photo1.jpg',
    '/photo2.jpg',
    '/photo3.jpg',
    '/photo4.jpg',
    '/photo5.jpg',
    '/photo6.jpg'
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  return (
    <div className="App">
      <header className={scrolled ? "scrolled" : ""}>
        <div className="logo-wrapper">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className="logo" />
          <nav>
            <a href="#portfolio">Portfolio</a>
            <a href="#about">About</a>
            <a href="#home" className="home-link">Home</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <section
        className={`hero ${heroSlide ? 'slide-up' : ''}`}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.75), transparent 100%), url(${process.env.PUBLIC_URL}/bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className="typed-text-wrapper">
          <span className={`typed-text ${typedText.length === fullText.length ? 'done' : ''}`}>
            {typedText}
          </span>
        </h2>

        {showArrow && (
          <div className="scroll-arrow" onClick={() =>
            document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' })
          }>
            <div className="arrow-track">
              <div className="arrow-line-mask">
                <div className="arrow-line"></div>
              </div>
            </div>
            <div className="arrow-head-animate"></div>
          </div>
        )}
      </section>

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

      <section id="about">
        <h3>About Me</h3>
        <p>This is where you write a little about who you are and your photography journey.</p>
      </section>

      <section id="contact">
        <h3>Contact</h3>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Message" required></textarea>
          <button type="submit">Send</button>
        </form>
      </section>

      <footer>
        <p>© 2025 Dany Majeed Productions. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
