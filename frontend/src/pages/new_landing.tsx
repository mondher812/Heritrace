import type React from "react";
import "./new_landing.css";
import treeIcon from "../images/tree.png";
import { useState, useEffect } from 'react';
import Landing from './landing';

const NewLanding: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true); // Start the fade-out transition
      const secondSectionTimer = setTimeout(() => {
        setShowSecondSection(true); // Show the second section after fade-out
      }, 2500); // Wait for the fade-out duration (increased to 2500ms)

      return () => clearTimeout(secondSectionTimer); // Cleanup for the second section timer
    }, 3000); // Start transition after 3 seconds

    return () => clearTimeout(timer); // Cleanup for the initial timer
  }, []);

  useEffect(() => {
    console.log("isTransitioning state:", isTransitioning);
    console.log("showSecondSection state:", showSecondSection);
  }, [isTransitioning, showSecondSection]);

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
      {showSecondSection && (
        <div className={`second-section fade-in`}>
          <Landing />
        </div>
      )}
    </div>
  );
};

export default NewLanding;