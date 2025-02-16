import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./loading_page.css";

const flags = [
  "🇳🇬", // Nigeria
  "🇺🇸", // United States
  "🇰🇵", // North Korea
  "🇨🇦", // Canada
  "🇰🇬", // Kyrgyzstan
  "🇺🇬"  // Uganda
];

const RotatingFlagsLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Store the initial state in a ref so it doesn't change on every render.
  const stateRef = useRef(location.state);

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.children;
      Array.from(elements).forEach((el, index) => {
        (el as HTMLElement).style.transform = `rotate(${(index * 360) / flags.length}deg) translate(80px) rotate(${-(index * 360) / flags.length}deg)`;
      });
    }

    // Set a timer to navigate after 3 seconds
    const timer = setTimeout(() => {
      navigate("/result", { state: stateRef.current });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="page-container">
      <div className="loading-container" ref={containerRef}>
        {flags.map((flag, index) => (
          <span key={index} className="flag">{flag}</span>
        ))}
      </div>
    </div>
  );
};

export default RotatingFlagsLoader;
