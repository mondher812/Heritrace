import React, { useState, useEffect } from "react";
import "./new_landing.css";
import treeIcon from "../images/tree.png";
import Landing from "./landing";

const NewLanding: React.FC = () => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);

  useEffect(() => {
    // Start fading out HERITRACE (and the rest) after 3 seconds.
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const secondTimer = setTimeout(() => {
        setShowSecondSection(true);
      }, 3000); // Adjust delay if needed
      return () => clearTimeout(secondTimer);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="full-page-container">
      <main className={`landing-container ${isFadingOut ? "fade-out" : ""}`}>
        <div className="content-wrapper">
          <div className="brand">
            <div className="brand-text">
              <h1 className={`logo ${isFadingOut ? "fade-out" : ""}`}>HERITRACE</h1>
              <h2 className={`tagline ${isFadingOut ? "fade-out" : ""}`}>
                Unlock the Past, Start Your Journey Now
              </h2>
            </div>
            <div className="icon-wrapper">
              <div className="tree-icon">
                <img
                  src={treeIcon}
                  alt="Tree"
                  width="175"
                  height="175"
                  style={{ marginLeft: "0.5rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      {showSecondSection && (
        <div className="second-section fade-in">
          <Landing />
        </div>
      )}
    </div>
  );
};

export default NewLanding;