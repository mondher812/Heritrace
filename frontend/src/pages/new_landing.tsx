import { useState, useEffect } from "react";
import "./new_landing.css";
import treeIcon from "../images/tree.png";
import Landing from "./landing";

export default function NewLanding() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let secondTimer: ReturnType<typeof setTimeout>;

    timer = setTimeout(() => {
      setIsFadingOut(true);
      secondTimer = setTimeout(() => {
        setShowSecondSection(true);
      }, 3000); // Delay before showing the second section
    }, 3000); // Delay before starting the fade-out

    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
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
                  width={175}
                  height={175}
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
}