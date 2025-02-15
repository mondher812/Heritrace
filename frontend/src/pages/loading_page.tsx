import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (containerRef.current) {
      const elements = containerRef.current.children;
      Array.from(elements).forEach((el, index) => {
        (el as HTMLElement).style.transform = `rotate(${(index * 360) / flags.length}deg) translate(80px) rotate(${-(index * 360) / flags.length}deg)`;
      });
    }
  }, []);

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
