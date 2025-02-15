import type React from "react"
import "./new_landing.css"

const NewLanding: React.FC = () => {
  return (
    <main className="landing-container">
      <div className="content-wrapper">
        <div className="brand">
          <h1 className="logo">HERITRACE</h1>
          <h2 className="tagline">Unlock the Past, Start Your Journey Now</h2>
        </div>

        <div className="icon-wrapper">
          <div className="circle"></div>
          <div className="tree-icon"></div>
        </div>

        <button className="cta-button">
          <span className="button-icon"></span>
          Uncover My Story
        </button>
      </div>
    </main>
  )
}

export default NewLanding

