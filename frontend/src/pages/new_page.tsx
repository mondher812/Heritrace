import React, { useEffect, useState } from 'react';
import './new_page.css'; // New CSS file for the new page
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';
import WorldMap from '../components/WorldMap'; // Import the WorldMap component

const NewPage: React.FC = () => {
  const [isFadingIn, setIsFadingIn] = useState(false);

  useEffect(() => {
    setIsFadingIn(true);
  }, []);

  return (
    <div className={`landing-page ${isFadingIn ? 'fade-in' : ''}`}>
      <header className="landing-header">
        <h1 className="new-page-title">GOT IT WRONG? HELP US OUT</h1>
        <div className="textbox-container">
          <TextBox />
        </div>
        <WorldMap />
        <div className="submit-button-container">
          <SubmitButton />
        </div>
      </header>
    </div>
  );
};

export default NewPage; 