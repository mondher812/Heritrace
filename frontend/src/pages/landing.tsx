// landing.tsx
import React, { useState } from 'react';
import TextBox from '../components/textbox';
import SubmitButton from '../components/submit-button';
import './landing.css'; // or your styling

function Landing() {
  // State for the last name
  const [lastName, setLastName] = useState('');

  return (
    <div className="landing-page">
      <header className="landing-header">
        {/* Pass the state and a setter to TextBox */}
        <TextBox text={lastName} onChange={setLastName} />
        
        {/* Pass the lastName to SubmitButton */}
        <SubmitButton lastName={lastName} />
      </header>
    </div>
  );
}

export default Landing;