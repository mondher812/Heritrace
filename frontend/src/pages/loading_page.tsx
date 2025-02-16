import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import globeImage from '../assets/globe.gif'; // Add the image to your assets folder
import "./loading_page.css";

const RotatingFlagsLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Store the initial state in a ref so it doesn't change on every render.
  const stateRef = useRef(location.state);

  useEffect(() => {
    // Set a timer to navigate after 3 seconds
    const timer = setTimeout(() => {
      navigate("/result", { state: stateRef.current });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="loading-container" ref={containerRef}>
        <h1 className="loading-text">Please wait while we dig up your roots...</h1>
        <img src={globeImage} alt="Globe" className="center-globe" />
      </div>
    </div>
  );
};

export default RotatingFlagsLoader;
