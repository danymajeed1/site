// src/components/CinematicGallery.js

import React from 'react';
// The styling will be added directly into your App.css

/**
 * Cinematic Gallery Component
 * Displays images in a responsive grid with a caption reveal effect on hover.
 * * @param {Array<string>} images - Array of image paths (e.g., ['/photo1.jpg', '/photo2.jpg'])
 * @param {string} title - Main title for the gallery section.
 */
const CinematicGallery = ({ images, title }) => {
    // Helper function to create a meaningful title/category for the image
    // You'll want to replace this logic with actual data from a prop later.
    const getCaption = (imagePath) => {
        if (imagePath.includes('wedding')) return 'Luxury Wedding Photography';
        if (imagePath.includes('realestate')) return 'High-End Real Estate';
        if (imagePath.includes('portrait')) return 'Creative Portrait Session';
        if (imagePath.includes('event')) return 'Corporate Event Coverage';
        // Basic fallback
        const name = imagePath.split('/').pop().split('.')[0];
        return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
        <section className="cinematic-gallery-section" id="portfolio">
            <div className="gallery-header-wrapper">
                <h2 className="cinematic-gallery-title">{title || "The Portfolio."}</h2>
                <p className="cinematic-gallery-subtitle">A collection of moments, framed with purpose.</p>
            </div>

            <div className="cinematic-grid">
                {images.map((imagePath, index) => (
                    // We'll use a data attribute to assign a unique style/layout class to the tile
                    <a 
                        href={`#image-detail-${index}`} // Placeholder link to an image detail page/modal
                        className="cinematic-tile" 
                        key={index}
                        data-layout={index % 6 === 0 ? 'wide' : (index % 6 === 1 ? 'tall' : 'standard')}
                    >
                        <img 
                            src={imagePath} 
                            alt={getCaption(imagePath)} 
                            className="cinematic-image" 
                            loading="lazy" 
                        />
                        <div className="caption-overlay">
                            <span className="caption-text">{getCaption(imagePath)}</span>
                            <span className="caption-tag">View Project &rarr;</span>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default CinematicGallery;