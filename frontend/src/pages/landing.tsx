import React, { useEffect, useState } from 'react';
import './landing.css';
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';

const Landing: React.FC = () => {
  const [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    setIsFadingIn(true);
  }, []);

  return (
    <div className={`landing-page ${isFadingIn ? 'fade-in' : ''}`}>
      <header className="landing-header">
        <TextBox />
        <SubmitButton />
      </header>
    </div>
  );
};

export default Landing;