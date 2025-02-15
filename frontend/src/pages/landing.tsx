import React from 'react';
import './landing.css';
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Enter your name:</h1>
        <TextBox />
        <SubmitButton />
      </header>
    </div>
  );
};

export default Landing;