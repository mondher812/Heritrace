import React from 'react';
import './landing.css';
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';

const Landing: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <TextBox />
        <SubmitButton />
      </header>
    </div>
  );
};

export default Landing;