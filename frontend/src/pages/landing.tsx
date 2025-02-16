import React, { useState } from 'react';
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';
import './landing.css'; // or your styling
import logo from '../images/tree.png';

function Landing() {
  // State for the name
  const [name, setName] = useState('');

  return (
    <div className="landing-page">
      <header className="landing-header">
        <img src={logo} alt="logo" className="landing-image"/>
        {/* Pass the state and a setter to TextBox */}

        <div className="landing-text">
          <TextBox text={name} onChange={setName} />
        </div>
        
        {/* Pass the lastName to SubmitButton */}
        <div className="submit-button">
          <SubmitButton name={name} />
        </div>    
      </header>
    </div>
  );
}

export default Landing;

