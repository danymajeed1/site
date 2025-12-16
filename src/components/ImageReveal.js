import React, { useEffect, useRef } from 'react';
// We will put the specific styles for this in App.css for now
// or if you have ImageReveal.css, you can import it here.

const ImageReveal = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // --- THE TIMING FIX ---
    // rootMargin: "-20%..." creates a "hot zone" in the middle of the screen.
    // The animation happens earlier than the exact center, making it feel smoother.
    const options = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", 
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('active'); // Slide IN
        } else {
          section.classList.remove('active'); // Slide OUT (closes back up)
        }
      });
    }, options);

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <div className="dual-panel-section" ref={sectionRef}>
        
        {/* Background Image */}
        <div className="background-image">
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
              alt="Background" 
            />
        </div>

        {/* Content Container */}
        <div className="content-container">
            
            {/* LEFT PANEL: Buttons */}
            <div className="panel panel-left">
                <div className="panel-inner">
                  <button className="action-btn">Real Estate</button>
                  <button className="action-btn">Weddings</button>
                  <button className="action-btn">Restoration</button>
                </div>
            </div>

            {/* RIGHT PANEL: Text */}
            <div className="panel panel-right">
                <div className="panel-inner">
                  <h2>Our Services</h2>
                  <p>
                    Experience the highest quality in visual storytelling. 
                    From capturing the perfect wedding moments to showcasing 
                    luxury real estate properties.
                  </p>
                </div>
            </div>

        </div>
    </div>
  );
};

export default ImageReveal;