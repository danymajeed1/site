// src/components/FlowHero.js
import React from 'react';
import { HashLink } from 'react-router-hash-link';

const FlowHero = () => {
  return (
    <section className="flow-hero">
      <div className="flow-background">
        <div className="flow-blob blob-1"></div>
        <div className="flow-blob blob-2"></div>
        <div className="flow-blob blob-3"></div>
      </div>

      <div className="flow-content">
        <h1 className="flow-title">
          <span className="line-1">Capture</span>
          <span className="line-2">The Unseen.</span>
        </h1>
        <p className="flow-subtitle">
          Dany Majeed Productions. <br />
          Defining moments through lens and code.
        </p>
        
        <div className="flow-actions">
           <HashLink smooth to="#portfolio" className="flow-btn">
              View Work
           </HashLink>
        </div>
      </div>
    </section>
  );
};

export default FlowHero;