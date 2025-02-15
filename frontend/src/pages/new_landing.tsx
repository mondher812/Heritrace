import type React from "react";
import "./new_landing.css";
import treeIcon from "../images/tree.png";
import { useState, useEffect } from 'react';
import Landing from './landing';

const NewLanding: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transition after scrolling 100px
      if (window.scrollY > 100) {
        setIsTransitioning(true);
      } else {
        setIsTransitioning(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="full-page-container">
      <main className={`landing-container ${isTransitioning ? 'fade-out' : ''}`}>
        <div className="content-wrapper">
          <div className={`brand ${isTransitioning ? 'fade-out' : ''}`}>
            <div className="brand-text">
              <h1 className="logo">HERITRACE</h1>
              <h2 className="tagline">Unlock the Past, Start Your Journey Now</h2>
            </div>
            <div className="icon-wrapper">
              <div className="tree-icon">
                <img 
                  src={treeIcon}
                  alt="Tree"
                  width="175"
                  height="175"
                  style={{ marginLeft: '0.5rem' }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className={`second-section ${isTransitioning ? 'fade-in' : 'fade-out'}`}>
        <Landing />
      </div>
    </div>
  );
};

export default NewLanding;