document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Find the section we want to animate
    const section = document.getElementById('revealSection');

    // 2. Set up the options for the Observer
    const options = {
        root: null, // Use the browser viewport
        
        // TIMING EXPLANATION:
        // "-25%" means we shrink the detection window.
        // The animation will NOT trigger at the very top or bottom edge.
        // It waits until the element is closer to the center.
        // This fixes the issue of it opening too early or too late.
        rootMargin: "-25% 0px -25% 0px", 
        
        threshold: 0 // Trigger as soon as it touches the "safe zone" defined above
    };

    // 3. Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If in the middle of screen: Slide panels IN
                section.classList.add('active');
            } else {
                // If scrolled away: Slide panels OUT
                section.classList.remove('active');
            }
        });
    }, options);

    // 4. Start watching the section
    observer.observe(section);
});