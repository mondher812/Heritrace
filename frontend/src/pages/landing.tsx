import React from 'react';
import './landing.css';
import TextBox from '../components/textbox';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Enter your name:</h1>
        <TextBox />
      </header>
    </div>
  );
};

export default Landing;